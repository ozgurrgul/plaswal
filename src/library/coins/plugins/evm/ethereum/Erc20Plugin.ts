import type { WalletCore } from "@trustwallet/wallet-core";
import type {
  BaseTokenPlugin,
  SupportedCoinSymbol,
  TokenMetadata,
} from "../../../types";
import { HDWallet } from "@trustwallet/wallet-core/dist/src/wallet-core";
import { EthereumPlugin } from "./EthereumPlugin";
import { getEthereumRpc } from "./EthereumHelpers";

export class Erc20Plugin implements BaseTokenPlugin {
  readonly metadata: TokenMetadata;
  readonly parentCoin: SupportedCoinSymbol = "ETH";
  private ethereumPlugin: EthereumPlugin;

  constructor(metadata: TokenMetadata) {
    this.metadata = metadata;
    this.ethereumPlugin = new EthereumPlugin();
  }

  getAddress(walletCore: WalletCore, hdWallet: HDWallet): string {
    return this.ethereumPlugin.getAddress(walletCore, hdWallet);
  }

  isValidAddress(walletCore: WalletCore, address: string): boolean {
    return this.ethereumPlugin.isValidAddress(walletCore, address);
  }

  async getBalance(address: string): Promise<string> {
    try {
      const balance = (await getEthereumRpc().readContract({
        address: this.metadata.contractAddress as `0x${string}`,
        abi: [
          {
            constant: true,
            inputs: [{ name: "_owner", type: "address" }],
            name: "balanceOf",
            outputs: [{ name: "balance", type: "uint256" }],
            type: "function",
          },
        ],
        functionName: "balanceOf",
        args: [address as `0x${string}`],
      })) as bigint;

      return balance.toString();
    } catch (error) {
      throw new Error(`Failed to fetch ERC-20 token balance: ${error}`);
    }
  }

  async sendTransaction(
    walletCore: WalletCore,
    from: string,
    to: string,
    amount: string,
    contractAddress: string,
    privateKey: string
  ): Promise<string> {
    throw new Error("ERC-20 token transaction sending not implemented yet");
  }

  static createKnownTokens(): Erc20Plugin[] {
    const knownTokens = new EthereumPlugin().getKnownTokenMetadata();
    return knownTokens.map((tokenMetadata) => new Erc20Plugin(tokenMetadata));
  }
}
