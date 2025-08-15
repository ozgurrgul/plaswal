import type { WalletCore } from "@trustwallet/wallet-core";
import type {
  BaseCoinPlugin,
  BaseTokenPlugin,
  SupportedCoinSymbol,
  TokenMetadata,
} from "../../../types";
import { HDWallet } from "@trustwallet/wallet-core/dist/src/wallet-core";
import { getEthereumRpc, getEthereumChain } from "./EthereumHelpers";
import {
  erc20Abi,
  createWalletClient,
  http,
  parseUnits,
  formatUnits,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { PERSISTENCE_KEYS } from "@/src/constants/PersistenceKeys";
import { getValue } from "@/src/utils/persistence";
import { Buffer } from "buffer";

export class Erc20Plugin implements BaseTokenPlugin {
  readonly metadata: TokenMetadata;
  readonly parentCoin: SupportedCoinSymbol = "ETH";
  private ethereumPlugin: BaseCoinPlugin;

  constructor(metadata: TokenMetadata, nativeTokenPlugin: BaseCoinPlugin) {
    this.metadata = metadata;
    this.ethereumPlugin = nativeTokenPlugin;
  }

  getAddress = (walletCore: WalletCore, hdWallet: HDWallet): string => {
    return this.ethereumPlugin.getAddress(walletCore, hdWallet);
  };

  isValidAddress = (walletCore: WalletCore, address: string): boolean => {
    return this.ethereumPlugin.isValidAddress(walletCore, address);
  };

  async getBalance(address: string): Promise<bigint> {
    try {
      const balance = (await getEthereumRpc().readContract({
        address: this.metadata.contractAddress as `0x${string}`,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      })) as bigint;

      return balance;
    } catch (error) {
      throw new Error(`Failed to fetch ERC-20 token balance: ${error}`);
    }
  }

  async sendTransaction(
    walletCore: WalletCore,
    from: string,
    to: string,
    amount: string
  ): Promise<string> {
    try {
      // Validate recipient address
      if (!this.isValidAddress(walletCore, to)) {
        throw new Error(`Invalid recipient address: ${to}`);
      }

      // Get wallet mnemonic from storage
      const mnemonic = await getValue<string>(PERSISTENCE_KEYS.WALLET_MNEMONIC);
      if (!mnemonic) {
        throw new Error("Wallet mnemonic not found");
      }

      // Create HD wallet and get private key
      const hdWallet = walletCore.HDWallet.createWithMnemonic(mnemonic, "");
      const privateKeyData = hdWallet.getKeyForCoin(
        walletCore.CoinType.ethereum
      );
      const privateKeyBytes = privateKeyData.data();

      // Convert to hex private key for viem
      const privateKeyHex = `0x${Buffer.from(privateKeyBytes).toString(
        "hex"
      )}` as `0x${string}`;
      const account = privateKeyToAccount(privateKeyHex);

      const tokenBalance = await this.getBalance(from);
      const amountInTokenUnits = parseUnits(amount, this.metadata.decimals);
      const balanceInTokens = parseFloat(
        formatUnits(tokenBalance, this.metadata.decimals)
      );
      const amountInTokens = parseFloat(amount);

      if (balanceInTokens < amountInTokens) {
        throw new Error(
          `Insufficient ${this.metadata.symbol} balance. Have: ${balanceInTokens} ${this.metadata.symbol}, Need: ${amountInTokens} ${this.metadata.symbol}`
        );
      }

      // ETH balance for gas fees
      const ethBalance = await this.ethereumPlugin.getBalance(from);
      const ethBalanceInEth = parseFloat(formatUnits(ethBalance, 18));

      // Estimate gas for the transaction
      const rpc = getEthereumRpc();
      let gasEstimate: bigint;
      try {
        gasEstimate = await rpc.estimateContractGas({
          address: this.metadata.contractAddress as `0x${string}`,
          abi: erc20Abi,
          functionName: "transfer",
          args: [to as `0x${string}`, amountInTokenUnits],
          account: account.address,
        });
      } catch (gasError: any) {
        console.error("Gas estimation failed:", gasError);
        throw new Error(
          `Gas estimation failed: ${gasError.message || gasError}`
        );
      }

      // Gas price
      const gasPrice = await rpc.getGasPrice();
      const estimatedGasCost = gasEstimate * gasPrice;
      const estimatedGasCostInEth = parseFloat(
        formatUnits(estimatedGasCost, 18)
      );

      // Check if we there is sufficient ETH for gas
      if (ethBalanceInEth < estimatedGasCostInEth) {
        throw new Error(
          `Insufficient ETH balance for gas fees. Have: ${ethBalanceInEth} ETH, Need: ${estimatedGasCostInEth} ETH`
        );
      }

      // Create wallet client for signing
      const walletClient = createWalletClient({
        account,
        chain: getEthereumChain(),
        transport: http(),
      });

      // Send the transaction
      try {
        return await walletClient.writeContract({
          address: this.metadata.contractAddress as `0x${string}`,
          abi: erc20Abi,
          functionName: "transfer",
          args: [to as `0x${string}`, amountInTokenUnits],
          gas: gasEstimate,
          gasPrice,
        });
      } catch (writeError: any) {
        console.error("Transaction failed:", writeError);
        throw new Error(
          `Transaction failed: ${writeError.message || writeError}`
        );
      }
    } catch (error) {
      console.error(
        `Error sending ${this.metadata.symbol} transaction:`,
        error
      );
      throw error;
    }
  }
}
