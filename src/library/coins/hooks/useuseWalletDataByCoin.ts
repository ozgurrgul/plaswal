import { SupportedCoinSymbol, SupportedTokenSymbol } from "../types";
import { useWalletData } from "./useWalletData";

export const useWalletDataByCoin = (
  coinSymbol: SupportedCoinSymbol | SupportedTokenSymbol
) => {
  const { data: walletData } = useWalletData();

  return walletData?.[coinSymbol];
};
