import { CoinRegistry } from "./CoinRegistry";
import {
  BitcoinPlugin,
  EthereumPlugin,
  Erc20Plugin,
  SplTokenPlugin,
  SolanaPlugin,
} from ".";

export function setupCoins(): void {
  // Register native coins
  CoinRegistry.register(new BitcoinPlugin());
  CoinRegistry.register(new EthereumPlugin());
  CoinRegistry.register(new SolanaPlugin());

  // Register known tokens
  const erc20Tokens = Erc20Plugin.createKnownTokens();
  const splTokens = SplTokenPlugin.createKnownTokens();

  erc20Tokens.forEach((token) => CoinRegistry.registerToken(token));
  splTokens.forEach((token) => CoinRegistry.registerToken(token));
}

export function areCoinsSetup(): boolean {
  return CoinRegistry.count() > 0 || CoinRegistry.tokenCount() > 0;
}
