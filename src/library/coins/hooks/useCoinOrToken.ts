import { SupportedCoinOrTokenSymbol } from "../types";
import { SupportedCoinSymbol } from "../types";
import { SupportedTokenSymbol } from "../types";
import { useCoin } from "./useCoin";
import { useToken } from "./useToken";

export const useCoinOrToken = (symbol: SupportedCoinOrTokenSymbol) => {
  const coin = useCoin(symbol as SupportedCoinSymbol);
  const token = useToken(symbol as SupportedTokenSymbol);
  return coin || token;
};
