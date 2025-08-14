import { SupportedCoinOrTokenSymbol } from "../types";
import { useWalletData } from "./useWalletData";

export const useWalletDataByCoin = (coinSymbol: SupportedCoinOrTokenSymbol) => {
  const { data: walletData } = useWalletData();

  return walletData?.[coinSymbol];
};
