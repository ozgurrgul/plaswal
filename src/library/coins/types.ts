import type { WalletCore } from "@trustwallet/wallet-core";
import { HDWallet } from "@trustwallet/wallet-core/dist/src/wallet-core";

export type SupportedCoinSymbol = "BTC" | "ETH" | "SOL";
export type SupportedTokenSymbol = string;

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
  getBalance?(address: string): Promise<string>;
  sendTransaction?(
    walletCore: WalletCore,
    from: string,
    to: string,
    amount: string,
    privateKey: string
  ): Promise<string>;
  getKnownTokenMetadata(): TokenMetadata[];
}

export interface BaseTokenPlugin {
  readonly metadata: TokenMetadata;
  readonly parentCoin: SupportedCoinSymbol;

  getAddress: BaseCoinPlugin["getAddress"];
  isValidAddress: BaseCoinPlugin["isValidAddress"];
  getBalance(address: string, contractAddress: string): Promise<string>;
  sendTransaction?(
    walletCore: WalletCore,
    from: string,
    to: string,
    amount: string,
    contractAddress: string,
    privateKey: string
  ): Promise<string>;
}

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
  SupportedCoinSymbol,
  {
    address: string;
    balance: string;
  }
>;
