import { SupportedCoinSymbol } from "../types";
import { useCoins } from "./useCoins";

export const useCoin = (symbol: SupportedCoinSymbol) => {
  const { getCoin } = useCoins();
  return getCoin(symbol);
};
