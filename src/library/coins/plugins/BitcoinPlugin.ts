import type { WalletCore } from "@trustwallet/wallet-core";
import type { BaseCoinPlugin, CoinMetadata, TokenMetadata } from "../types";
import { HDWallet } from "@trustwallet/wallet-core/dist/src/wallet-core";

export class BitcoinPlugin implements BaseCoinPlugin {
  readonly metadata: CoinMetadata = {
    symbol: "BTC",
    name: "Bitcoin",
    decimals: 8,
    iconUrl: "https://assets.coingecko.com/coins/images/1/standard/bitcoin.png",
    explorerUrl: "https://blockstream.info",
    isNative: true,
  };

  getAddress(walletCore: WalletCore, hdWallet: HDWallet): string {
    return hdWallet.getAddressForCoin(walletCore.CoinType.bitcoin);
  }

  isValidAddress(walletCore: WalletCore, address: string): boolean {
    return walletCore.AnyAddress.isValid(address, walletCore.CoinType.bitcoin);
  }

  async getBalance(address: string): Promise<string> {
    return "0.0";
  }

  async sendTransaction(
    walletCore: WalletCore,
    from: string,
    to: string,
    amount: string
  ): Promise<string> {
    throw new Error("Bitcoin transaction sending not implemented yet");
  }

  getKnownTokenMetadata(): TokenMetadata[] {
    return [];
  }
}
