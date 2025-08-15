import { CoinRegistry } from "./CoinRegistry";
import { EthereumPlugin } from "./plugins/evm/ethereum/EthereumPlugin";
import { Erc20Plugin } from "./plugins/evm/ethereum/Erc20Plugin";
import { SplTokenPlugin } from "./plugins/solana/SplTokenPlugin";
import { SolanaPlugin } from "./plugins/solana/SolanaPlugin";

export function setupCoins(): void {
  // Register native coins
  const ethereumPlugin = new EthereumPlugin();
  const solanaPlugin = new SolanaPlugin();

  CoinRegistry.register(ethereumPlugin);
  CoinRegistry.register(solanaPlugin);

  // Register known tokens
  ethereumPlugin
    .getKnownTokenMetadata()
    .map((tokenMetadata) => new Erc20Plugin(tokenMetadata, ethereumPlugin))
    .forEach((token) => CoinRegistry.registerToken(token));

  solanaPlugin
    .getKnownTokenMetadata()
    .map((tokenMetadata) => new SplTokenPlugin(tokenMetadata, solanaPlugin))
    .forEach((token) => CoinRegistry.registerToken(token));
}

export function areCoinsSetup(): boolean {
  return CoinRegistry.count() > 0 || CoinRegistry.tokenCount() > 0;
}
