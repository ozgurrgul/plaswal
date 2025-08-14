import { useEffect, useState } from "react";
import { CoinRegistry, setupCoins, areCoinsSetup } from "../index";
import type {
  BaseCoinPlugin,
  BaseTokenPlugin,
  SupportedCoinSymbol,
} from "../types";

/**
 * Hook to access the coin registry and ensure coins are set up
 */
export function useCoins() {
  const [isSetup, setIsSetup] = useState(areCoinsSetup());

  useEffect(() => {
    if (!isSetup) {
      setupCoins();
      setIsSetup(true);
    }
  }, [isSetup]);

  return {
    getAllCoins: (): BaseCoinPlugin[] => CoinRegistry.getAllCoins(),
    getCoin: (symbol: SupportedCoinSymbol): BaseCoinPlugin | undefined =>
      CoinRegistry.getCoin(symbol),
    getAllTokens: (): BaseTokenPlugin[] => CoinRegistry.getAllTokens(),
    getToken: (symbol: string): BaseTokenPlugin | undefined =>
      CoinRegistry.getToken(symbol),
    isSetup,
  };
}
