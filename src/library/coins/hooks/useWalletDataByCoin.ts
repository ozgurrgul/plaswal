import { AssetSymbol } from "../types";
import { useWalletData } from "./useWalletData";

export const useWalletDataByCoin = (assetSymbol: AssetSymbol) => {
  const { data: walletData } = useWalletData();

  return walletData?.[assetSymbol];
};
