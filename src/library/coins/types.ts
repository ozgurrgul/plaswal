import type { WalletCore } from "@trustwallet/wallet-core";
import { HDWallet } from "@trustwallet/wallet-core/dist/src/wallet-core";

export type SupportedCoinSymbol = "ETH" | "SOL";
export type SupportedTokenSymbol = string;
export type AssetSymbol = SupportedCoinSymbol | SupportedTokenSymbol;

export interface CoinMetadata {
  symbol: SupportedCoinSymbol;
  name: string;
  decimals: number;
  iconUrl?: string;
  explorerUrl: string;
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
  getBalance(address: string): Promise<bigint>;
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

  getAddress: BaseCoinPlugin["getAddress"];
  isValidAddress: BaseCoinPlugin["isValidAddress"];
  getBalance: BaseCoinPlugin["getBalance"];
  sendTransaction: BaseCoinPlugin["sendTransaction"];
}

export type AssetPlugin = BaseCoinPlugin | BaseTokenPlugin;

export interface CoinRegistry {
  register(plugin: BaseCoinPlugin): void;
  registerToken(plugin: BaseTokenPlugin): void;
  getCoin(symbol: SupportedCoinSymbol): BaseCoinPlugin | undefined;
  getToken(symbol: string): BaseTokenPlugin | undefined;
  getAllCoins(): BaseCoinPlugin[];
  getAllTokens(): BaseTokenPlugin[];
  getSupportedTokenSymbols(): string[];
}

export type WalletItemType = {
  address: string;
  balance: string;
};

export type WalletData = Record<
  AssetSymbol,
  {
    isNative: boolean;
    address: string;
    balance: string;
  }
>;

export type CoinEnvironment = "production" | "development";
