import {
  SupportedCoinSymbol,
  SupportedTokenSymbol,
  AssetSymbol,
} from "../types";
import { useCoin } from "./useCoin";
import { useToken } from "./useToken";

export const useAsset = (symbol: AssetSymbol) => {
  const coin = useCoin(symbol as SupportedCoinSymbol);
  const token = useToken(symbol as SupportedTokenSymbol);
  return coin || token;
};
