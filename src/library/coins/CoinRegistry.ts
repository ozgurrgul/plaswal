import type {
  BaseCoinPlugin,
  CoinRegistry as ICoinRegistry,
  SupportedCoinSymbol,
} from "./types";

class CoinRegistryImpl implements ICoinRegistry {
  private plugins = new Map<SupportedCoinSymbol, BaseCoinPlugin>();

  register(plugin: BaseCoinPlugin): void {
    this.plugins.set(plugin.metadata.symbol, plugin);
  }

  getCoin(symbol: SupportedCoinSymbol): BaseCoinPlugin | undefined {
    return this.plugins.get(symbol);
  }

  getAllCoins(): BaseCoinPlugin[] {
    return Array.from(this.plugins.values());
  }

  getSupportedSymbols(): SupportedCoinSymbol[] {
    return Array.from(this.plugins.keys());
  }

  isSupported(symbol: SupportedCoinSymbol): boolean {
    return this.plugins.has(symbol);
  }

  count(): number {
    return this.plugins.size;
  }

  clear(): void {
    this.plugins.clear();
  }
}

export const CoinRegistry = new CoinRegistryImpl();
