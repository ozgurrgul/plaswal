import { useWalletCore } from "@/src/library/walletCore/WalletCoreProvider";
import { useMutation } from "@tanstack/react-query";
import { setValue } from "@/src/utils/persistence";
import { PERSISTENCE_KEYS } from "@/src/constants/PersistenceKeys";

type OnSuccessFn = () => void;
type Input = {
  onSuccess: OnSuccessFn;
};

/**
 * Validates a wallet mnemonic.
 * @param onSuccess - The function to call when the mutation is successful.
 * @returns The mutation object.
 */
export const useIsValidWalletMutation = ({ onSuccess }: Input) => {
  const walletCore = useWalletCore();

  return useMutation({
    mutationFn: async (mnemonic: string) => {
      if (!walletCore) {
        throw new Error("WalletCore not initialized");
      }

      const isValid = walletCore.Mnemonic.isValid(mnemonic);

      if (!isValid) {
        throw new Error(
          "Invalid mnemonic phrase. Please check your words and try again."
        );
      }

      setValue(PERSISTENCE_KEYS.WALLET_MNEMONIC, mnemonic);
    },
    onSuccess,
  });
};
