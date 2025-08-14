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

export { BitcoinPlugin } from "./plugins/BitcoinPlugin";
export { EthereumPlugin } from "./plugins/evm/ethereum/EthereumPlugin";
export { Erc20Plugin } from "./plugins/evm/ethereum/Erc20Plugin";
export { SolanaPlugin } from "./plugins/solana/SolanaPlugin";
export { SplTokenPlugin } from "./plugins/solana/SplTokenPlugin";
