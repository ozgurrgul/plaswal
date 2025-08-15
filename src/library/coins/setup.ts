import { CoinRegistry } from "./CoinRegistry";
import { EthereumPlugin } from "./plugins/evm/ethereum/EthereumPlugin";
import { Erc20Plugin } from "./plugins/evm/ethereum/Erc20Plugin";
import { SplTokenPlugin } from "./plugins/solana/SplTokenPlugin";
import { SolanaPlugin } from "./plugins/solana/SolanaPlugin";

export function setupCoins(): void {
  // Register native coins
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
