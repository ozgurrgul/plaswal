import type { WalletCore } from "@trustwallet/wallet-core";
import type { BaseCoinPlugin, CoinMetadata, TokenMetadata } from "../types";
import { HDWallet } from "@trustwallet/wallet-core/dist/src/wallet-core";

export class SolanaPlugin implements BaseCoinPlugin {
  readonly metadata: CoinMetadata = {
    symbol: "SOL",
    name: "Solana",
    decimals: 9,
    iconUrl:
      "https://assets.coingecko.com/coins/images/4128/standard/solana.png",
    explorerUrl: "https://explorer.solana.com",
    isNative: true,
  };

  getAddress(walletCore: WalletCore, hdWallet: HDWallet): string {
    return hdWallet.getAddressForCoin(walletCore.CoinType.solana);
  }

  isValidAddress(walletCore: WalletCore, address: string): boolean {
    return walletCore.AnyAddress.isValid(address, walletCore.CoinType.solana);
  }

  async getBalance(address: string): Promise<string> {
    return "0.0";
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

  getKnownTokenMetadata(): TokenMetadata[] {
    return [
      {
        symbol: "USDC",
        name: "USD Coin (SPL)",
        decimals: 6,
        contractAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        iconUrl:
          "https://assets.coingecko.com/coins/images/6319/standard/USD_Coin_icon.png",
        isNative: false,
      },
      {
        symbol: "USDT",
        name: "Tether USD (SPL)",
        decimals: 6,
        contractAddress: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        iconUrl:
          "https://assets.coingecko.com/coins/images/325/standard/Tether.png",
        isNative: false,
      },
      {
        symbol: "RAY",
        name: "Raydium",
        decimals: 6,
        contractAddress: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R",
        iconUrl:
          "https://assets.coingecko.com/coins/images/13928/standard/PSigc4Zl_400x400.jpg",
        isNative: false,
      },
    ];
  }
}
