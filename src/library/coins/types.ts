import type { WalletCore } from "@trustwallet/wallet-core";
import { HDWallet } from "@trustwallet/wallet-core/dist/src/wallet-core";

export type SupportedCoinSymbol = "BTC" | "ETH" | "SOL";
export type SupportedTokenSymbol = string;
export type SupportedCoinOrTokenSymbol =
  | SupportedCoinSymbol
  | SupportedTokenSymbol;

export interface CoinMetadata {
  symbol: SupportedCoinSymbol;
  name: string;
  decimals: number;
  iconUrl?: string;
  explorerUrl?: string;
  isNative: boolean;
}

export type TokenMetadata = Omit<CoinMetadata, "symbol"> & {
  symbol: SupportedTokenSymbol;
  contractAddress: string;
  isNative: false;
};

export interface BaseCoinPlugin {
  readonly metadata: CoinMetadata;

  getAddress(walletCore: WalletCore, hdWallet: HDWallet): string;
  isValidAddress(walletCore: WalletCore, address: string): boolean;
  getBalance(address: string): Promise<string>;
  sendTransaction(
    walletCore: WalletCore,
    from: string,
    to: string,
    amount: string
  ): Promise<string>;
  getKnownTokenMetadata(): TokenMetadata[];
}

export interface BaseTokenPlugin {
  readonly metadata: TokenMetadata;
  readonly parentCoin: SupportedCoinSymbol;

  getAddress: BaseCoinPlugin["getAddress"];
  isValidAddress: BaseCoinPlugin["isValidAddress"];
  getBalance(address: string): Promise<string>;
  sendTransaction: BaseCoinPlugin["sendTransaction"];
}

export type CoinOrTokenPlugin = BaseCoinPlugin | BaseTokenPlugin;

export interface CoinRegistry {
  register(plugin: BaseCoinPlugin): void;
  registerToken(plugin: BaseTokenPlugin): void;
  getCoin(symbol: SupportedCoinSymbol): BaseCoinPlugin | undefined;
  getToken(symbol: string): BaseTokenPlugin | undefined;
  getAllCoins(): BaseCoinPlugin[];
  getAllTokens(): BaseTokenPlugin[];
  getTokensByParentCoin(parentCoin: SupportedCoinSymbol): BaseTokenPlugin[];
  getSupportedTokenSymbols(): string[];
}

export type WalletItemType = {
  address: string;
  balance: string;
};

export type WalletData = Record<
  SupportedCoinOrTokenSymbol,
  {
    isNative: boolean;
    address: string;
    balance: string;
  }
>;
