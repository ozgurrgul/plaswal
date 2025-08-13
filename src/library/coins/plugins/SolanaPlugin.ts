import type { WalletCore } from "@trustwallet/wallet-core";
import type { BaseCoinPlugin, CoinMetadata } from "../types";
import { HDWallet } from "@trustwallet/wallet-core/dist/src/wallet-core";

export class SolanaPlugin implements BaseCoinPlugin {
  readonly metadata: CoinMetadata = {
    symbol: "SOL",
    name: "Solana",
    decimals: 9,
    iconUrl:
      "https://assets.coingecko.com/coins/images/4128/standard/solana.png",
    explorerUrl: "https://explorer.solana.com",
  };

  getAddress(walletCore: WalletCore, hdWallet: HDWallet): string {
    return hdWallet.getAddressForCoin(walletCore.CoinType.solana);
  }

  isValidAddress(walletCore: WalletCore, address: string): boolean {
    return walletCore.AnyAddress.isValid(address, walletCore.CoinType.solana);
  }

  async getBalance(address: string): Promise<string> {
    throw new Error("Solana balance fetching not implemented yet");
  }

  async sendTransaction(
    walletCore: WalletCore,
    from: string,
    to: string,
    amount: string,
    privateKey: string
  ): Promise<string> {
    throw new Error("Solana transaction sending not implemented yet");
  }
}
