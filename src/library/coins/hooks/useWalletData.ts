import { QueryOptions, useQueries } from "@tanstack/react-query";
import { useWalletCore } from "@/src/library/walletCore/WalletCoreProvider";
import { usePersistenceValue } from "@/src/hooks/usePersistenceValue";
import { PERSISTENCE_KEYS } from "@/src/constants/PersistenceKeys";
import { useCoins } from "./useCoins";
import type { WalletData, BaseCoinPlugin, BaseTokenPlugin } from "../types";
import { useMemo } from "react";

type WalletItem = {
  symbol: string;
  address: string;
  balance: string;
  isNative: boolean;
};

export const useWalletData = () => {
  const walletCore = useWalletCore();
  const { getAllCoins, getAllTokens, isSetup } = useCoins();
  const mnemonic = usePersistenceValue<string>(
    PERSISTENCE_KEYS.WALLET_MNEMONIC,
    undefined
  );

  const queryConfigs = useMemo(() => {
    if (!walletCore || !mnemonic || !isSetup) {
      return [];
    }

    const hdWallet = walletCore.HDWallet.createWithMnemonic(mnemonic, "");
    const allCoins = getAllCoins();
    const allTokens = getAllTokens();

    const coinQueries = allCoins.map(
      (coin: BaseCoinPlugin) =>
        ({
          queryKey: ["walletData", coin.metadata.symbol, "coin"],
          queryFn: async (): Promise<WalletItem> => {
            const address = coin.getAddress(walletCore, hdWallet);
            const balance = await coin.getBalance(address);
            return {
              symbol: coin.metadata.symbol,
              address,
              balance,
              isNative: true,
            };
          },
        } satisfies QueryOptions)
    );

    const tokenQueries = allTokens.map(
      (token: BaseTokenPlugin) =>
        ({
          queryKey: ["walletData", token.metadata.symbol, "token"],
          queryFn: async (): Promise<WalletItem> => {
            const address = token.getAddress(walletCore, hdWallet);
            const balance = await token.getBalance(address);
            return {
              symbol: token.metadata.symbol,
              address,
              balance,
              isNative: false,
            };
          },
        } satisfies QueryOptions)
    );

    return [...coinQueries, ...tokenQueries];
  }, [walletCore, mnemonic, isSetup, getAllCoins, getAllTokens]);

  const queries = useQueries({
    queries: queryConfigs,
  });

  const result = useMemo(() => {
    const isLoading = queries.some((query) => query.isLoading);
    const isError = queries.some((query) => query.isError);
    const errors = queries
      .filter((query) => query.error)
      .map((query) => query.error);

    if (isLoading) {
      return {
        data: undefined,
        isLoading: true,
        isError: false,
        error: null,
      };
    }

    if (isError) {
      return {
        data: undefined,
        isLoading: false,
        isError: true,
        error: errors[0] || new Error("Unknown error occurred"),
      };
    }

    const walletItems = queries
      .filter((query) => query.data)
      .map((query) => query.data as WalletItem);

    // sort by balance desc
    const sortedItems = walletItems.sort((a, b) => {
      const balanceA = parseFloat(a.balance) || 0;
      const balanceB = parseFloat(b.balance) || 0;
      return balanceB - balanceA;
    });

    const walletData: WalletData = {};
    sortedItems.forEach((item) => {
      walletData[item.symbol] = {
        address: item.address,
        balance: item.balance,
        isNative: item.isNative,
      };
    });

    return {
      data: walletData,
      isLoading: false,
      isError: false,
      error: null,
    };
  }, [queries]);

  return result;
};
