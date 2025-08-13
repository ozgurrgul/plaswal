import { useQuery } from "@tanstack/react-query";
import { useWalletCore } from "@/src/library/walletCore/WalletCoreProvider";
import { usePersistenceValue } from "@/src/hooks/usePersistenceValue";
import { PERSISTENCE_KEYS } from "@/src/constants/PersistenceKeys";
import { useCoins } from "./useCoins";
import type { WalletData } from "../types";

export const useWalletData = () => {
  const walletCore = useWalletCore();
  const { getAllCoins, isSetup } = useCoins();
  const mnemonic = usePersistenceValue<string>(
    PERSISTENCE_KEYS.WALLET_MNEMONIC,
    undefined
  );

  return useQuery({
    queryKey: ["wallet-addresses"],
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

      const addresses: WalletData = {} as WalletData;

      for (const coin of allCoins) {
        try {
          const address = coin.getAddress(walletCore, hdWallet);
          addresses[coin.metadata.symbol] = {
            address,
            balance: coin.getBalance ? await coin.getBalance(address) : "0",
          };
        } catch (error) {
          console.error(
            `Failed to get address for ${coin.metadata.symbol}:`,
            error
          );
        }
      }

      return {
        addresses,
      };
    },
    enabled: !!walletCore && !!mnemonic && isSetup,
  });
};
