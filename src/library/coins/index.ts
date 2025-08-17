export type {
  SupportedCoinSymbol,
  SupportedTokenSymbol,
  CoinMetadata,
  TokenMetadata,
  BaseCoinPlugin,
  BaseTokenPlugin,
  CoinRegistry as ICoinRegistry,
  WalletData,
} from "./types";

export { CoinRegistry } from "./CoinRegistry";
export { setupCoins, areCoinsSetup } from "./setup";
