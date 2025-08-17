import { SupportedCoinSymbol, SupportedTokenSymbol } from "@/src/library/coins";
import { useWalletData } from "@/src/library/coins/hooks/useWalletData";
import { WalletSortConfig } from "../types";
import { useCoins } from "@/src/library/coins/hooks/useCoins";

export const useWalletScreenSortedData = (sortConfig: WalletSortConfig) => {
  const { getCoin, getToken } = useCoins();
  const { data: walletData } = useWalletData();

  const sortedWalletEntries = useMemo(() => {
    if (!walletData || !sortConfig) return [];

    const entries = Object.entries(walletData)
      .map(([assetSymbol, wallet]) => {
        const coin = wallet.isNative
          ? getCoin(assetSymbol as SupportedCoinSymbol)
          : getToken(assetSymbol as SupportedTokenSymbol);

        if (!coin) return null;

        return {
          assetSymbol,
          wallet,
          coin,
        };
      })
      .filter(Boolean);

    return entries.sort((a, b) => {
      if (sortConfig.sortBy === "alphabetical") {
        return a!.coin.metadata.name.localeCompare(b!.coin.metadata.name);
      } else if (sortConfig.sortBy === "balance") {
        const balanceA = parseFloat(a!.wallet.balance) || 0;
        const balanceB = parseFloat(b!.wallet.balance) || 0;
        return balanceB - balanceA; // Higher balances first
      }
      return 0;
    });
  }, [walletData, sortConfig, getCoin, getToken]);

  return sortedWalletEntries;
};
