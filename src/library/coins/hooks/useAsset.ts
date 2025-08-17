import {
  SupportedCoinSymbol,
  SupportedTokenSymbol,
  AssetSymbol,
  AssetPlugin,
} from "../types";
import { useCoin } from "./useCoin";
import { useToken } from "./useToken";

export const useAsset = (symbol: AssetSymbol): AssetPlugin | undefined => {
  const coin = useCoin(symbol as SupportedCoinSymbol);
  const token = useToken(symbol as SupportedTokenSymbol);
  return coin || token;
};
