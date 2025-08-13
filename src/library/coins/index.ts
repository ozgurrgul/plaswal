export type {
  SupportedCoinSymbol,
  CoinMetadata,
  TokenMetadata,
  BaseCoinPlugin,
  BaseTokenPlugin,
  CoinRegistry as ICoinRegistry,
  WalletData,
} from "./types";

export { CoinRegistry } from "./CoinRegistry";
export { setupCoins, areCoinsSetup } from "./setup";

export { EthereumPlugin } from "./plugins/EthereumPlugin";
export { SolanaPlugin } from "./plugins/SolanaPlugin";
export { BitcoinPlugin } from "./plugins/BitcoinPlugin";
export { Erc20Plugin } from "./plugins/Erc20Plugin";
export { SplTokenPlugin } from "./plugins/SplTokenPlugin";
