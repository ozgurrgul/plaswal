import { SupportedCoinSymbol } from "../types";
import { useWalletData } from "./useWalletData";

export const useWalletDataByCoin = (coinSymbol: SupportedCoinSymbol) => {
  const { data: walletData } = useWalletData();

  return walletData?.[coinSymbol];
};
