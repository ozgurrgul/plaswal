export type {
  SupportedCoinSymbol,
  CoinMetadata,
  BaseCoinPlugin,
  CoinRegistry as ICoinRegistry,
  WalletData,
} from "./types";

export { CoinRegistry } from "./CoinRegistry";
export { setupCoins, areCoinsSetup } from "./setup";
