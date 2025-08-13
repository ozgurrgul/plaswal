import { CoinRegistry } from "./CoinRegistry";
import { BitcoinPlugin } from "./plugins/BitcoinPlugin";
import { EthereumPlugin } from "./plugins/EthereumPlugin";
import { SolanaPlugin } from "./plugins/SolanaPlugin";

export function setupCoins(): void {
  CoinRegistry.register(new BitcoinPlugin());
  CoinRegistry.register(new EthereumPlugin());
  CoinRegistry.register(new SolanaPlugin());
}

export function areCoinsSetup(): boolean {
  return CoinRegistry.count() > 0;
}
