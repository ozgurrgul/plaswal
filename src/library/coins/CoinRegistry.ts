import type {
  BaseCoinPlugin,
  BaseTokenPlugin,
  CoinRegistry as ICoinRegistry,
  SupportedCoinSymbol,
} from "./types";

class CoinRegistryImpl implements ICoinRegistry {
  private coinPlugins = new Map<SupportedCoinSymbol, BaseCoinPlugin>();
  private tokenPlugins = new Map<string, BaseTokenPlugin>();

  register(plugin: BaseCoinPlugin): void {
    this.coinPlugins.set(plugin.metadata.symbol, plugin);
  }

  registerToken(plugin: BaseTokenPlugin): void {
    this.tokenPlugins.set(plugin.metadata.symbol, plugin);
  }

  getCoin(symbol: SupportedCoinSymbol): BaseCoinPlugin | undefined {
    return this.coinPlugins.get(symbol);
  }

  getToken(symbol: string): BaseTokenPlugin | undefined {
    return this.tokenPlugins.get(symbol);
  }

  getAllCoins(): BaseCoinPlugin[] {
    return Array.from(this.coinPlugins.values());
  }

  getAllTokens(): BaseTokenPlugin[] {
    return Array.from(this.tokenPlugins.values());
  }

  getTokensByParentCoin(parentCoin: SupportedCoinSymbol): BaseTokenPlugin[] {
    return Array.from(this.tokenPlugins.values()).filter(
      (token) => token.parentCoin === parentCoin
    );
  }

  getSupportedTokenSymbols(): string[] {
    return Array.from(this.tokenPlugins.keys());
  }

  isTokenSupported(symbol: string): boolean {
    return this.tokenPlugins.has(symbol);
  }

  count(): number {
    return this.coinPlugins.size;
  }

  tokenCount(): number {
    return this.tokenPlugins.size;
  }

  clear(): void {
    this.coinPlugins.clear();
    this.tokenPlugins.clear();
  }
}

export const CoinRegistry = new CoinRegistryImpl();
