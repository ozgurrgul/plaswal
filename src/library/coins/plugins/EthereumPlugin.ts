import type { WalletCore } from "@trustwallet/wallet-core";
import type { BaseCoinPlugin, CoinMetadata } from "../types";
import { HDWallet } from "@trustwallet/wallet-core/dist/src/wallet-core";
import { createPublicClient, http, PublicClient } from "viem";
import {
  arbitrum,
  avalanche,
  base,
  blast,
  bsc,
  cronos,
  mainnet,
  optimism,
  polygon,
  zksync,
} from "viem/chains";

export class EthereumPlugin implements BaseCoinPlugin {
  readonly metadata: CoinMetadata = {
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    iconUrl:
      "https://assets.coingecko.com/coins/images/279/standard/ethereum.png",
    explorerUrl: "https://etherscan.io",
  };

  getAddress(walletCore: WalletCore, hdWallet: HDWallet): string {
    return hdWallet.getAddressForCoin(walletCore.CoinType.ethereum);
  }

  isValidAddress(walletCore: WalletCore, address: string): boolean {
    return walletCore.AnyAddress.isValid(address, walletCore.CoinType.ethereum);
  }

  async getBalance(address: string): Promise<string> {
    const balance = await createPublicClient({
      chain: mainnet,
      transport: http(),
    }).getBalance({
      address: address as `0x${string}`,
    });

    return balance.toString();
  }

  async sendTransaction(
    walletCore: WalletCore,
    from: string,
    to: string,
    amount: string,
    privateKey: string
  ): Promise<string> {
    throw new Error("Ethereum transaction sending not implemented yet");
  }
}
