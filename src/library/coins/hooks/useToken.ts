import { SupportedTokenSymbol } from "../types";
import { useCoins } from "./useCoins";

export const useToken = (symbol: SupportedTokenSymbol) => {
  const { getToken } = useCoins();
  return getToken(symbol);
};
