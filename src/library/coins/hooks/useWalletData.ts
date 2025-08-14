import { useQuery } from "@tanstack/react-query";
import { useWalletCore } from "@/src/library/walletCore/WalletCoreProvider";
import { usePersistenceValue } from "@/src/hooks/usePersistenceValue";
import { PERSISTENCE_KEYS } from "@/src/constants/PersistenceKeys";
import { useCoins } from "./useCoins";
import type { WalletData } from "../types";

export const useWalletData = () => {
  const walletCore = useWalletCore();
  const { getAllCoins, getAllTokens, isSetup } = useCoins();
  const mnemonic = usePersistenceValue<string>(
    PERSISTENCE_KEYS.WALLET_MNEMONIC,
    undefined
  );

  return useQuery({
    queryKey: ["walletData"],
    queryFn: async () => {
      if (!walletCore) {
        throw new Error("WalletCore not initialized");
      }

      if (!mnemonic) {
        throw new Error("Mnemonic not found");
      }

      if (!isSetup) {
        throw new Error("Coin plugins not set up");
      }

      const hdWallet = walletCore.HDWallet.createWithMnemonic(mnemonic, "");
      const allCoins = getAllCoins();
      const allTokens = getAllTokens();

      const walletData: Partial<WalletData> = {};

      for (const coin of allCoins) {
        try {
          const address = coin.getAddress(walletCore, hdWallet);
          walletData[coin.metadata.symbol] = {
            address,
            balance: await coin.getBalance(address),
            isNative: true,
          };
        } catch (error) {
          console.error(
            `Failed to get address for ${coin.metadata.symbol}:`,
            error
          );
        }
      }

      for (const token of allTokens) {
        try {
          const address = token.getAddress(walletCore, hdWallet);
          walletData[token.metadata.symbol] = {
            address,
            balance: await token.getBalance(address),
            isNative: false,
          };
        } catch (error) {
          console.error(
            `Failed to get address for ${token.metadata.symbol}:`,
            error
          );
        }
      }

      return walletData;
    },
    enabled: !!walletCore && !!mnemonic && isSetup,
  });
};
