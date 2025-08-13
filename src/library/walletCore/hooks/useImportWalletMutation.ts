import { useWalletCore } from "@/src/library/walletCore/WalletCoreProvider";
import { useQuery } from "@tanstack/react-query";
import { PERSISTENCE_KEYS } from "@/src/constants/PersistenceKeys";
import { usePersistenceValue } from "@/src/hooks/usePersistenceValue";

export interface WalletAddresses {
  bitcoin: string;
  ethereum: string;
  solana: string;
}

export interface ImportWalletResult {
  addresses: WalletAddresses;
}

/**
 * Imports a wallet using a mnemonic phrase.
 * Validates the mnemonic, derives addresses for common coins
 * @returns The mutation object.
 */
export const useImportWalletMutation = () => {
  const walletCore = useWalletCore();
  const mnemonic = usePersistenceValue<string>(
    PERSISTENCE_KEYS.WALLET_MNEMONIC,
    undefined
  );

  return useQuery({
    queryKey: ["wallet"],
    queryFn: async (): Promise<ImportWalletResult> => {
      if (!walletCore) {
        throw new Error("WalletCore not initialized");
      }

      if (!mnemonic) {
        throw new Error("Mnemonic not found");
      }

      const wallet = walletCore.HDWallet.createWithMnemonic(mnemonic, "");
      const addresses: WalletAddresses = {
        bitcoin: wallet.getAddressForCoin(walletCore.CoinType.bitcoin),
        ethereum: wallet.getAddressForCoin(walletCore.CoinType.ethereum),
        solana: wallet.getAddressForCoin(walletCore.CoinType.solana),
      };

      return {
        addresses,
      };
    },
  });
};
