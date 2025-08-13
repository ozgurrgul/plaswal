import type { WalletCore } from "@trustwallet/wallet-core";
import { HDWallet } from "@trustwallet/wallet-core/dist/src/wallet-core";

export type SupportedCoinSymbol = "BTC" | "ETH" | "SOL";

export interface CoinMetadata {
  symbol: SupportedCoinSymbol;
  name: string;
  decimals: number;
  iconUrl?: string;
  explorerUrl?: string;
}

export interface BaseCoinPlugin {
  readonly metadata: CoinMetadata;

  getAddress(walletCore: WalletCore, hdWallet: HDWallet): string;
  isValidAddress(walletCore: WalletCore, address: string): boolean;
  getBalance?(address: string): Promise<string>;
  sendTransaction?(
    walletCore: WalletCore,
    from: string,
    to: string,
    amount: string,
    privateKey: string
  ): Promise<string>;
}

export interface CoinRegistry {
  register(plugin: BaseCoinPlugin): void;
  getCoin(symbol: SupportedCoinSymbol): BaseCoinPlugin | undefined;
  getAllCoins(): BaseCoinPlugin[];
  getSupportedSymbols(): SupportedCoinSymbol[];
}

export type WalletData = Record<
  SupportedCoinSymbol,
  {
    address: string;
    balance: string;
  }
>;
