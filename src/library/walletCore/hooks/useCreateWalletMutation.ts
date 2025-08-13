import { useWalletCore } from "@/src/library/walletCore/WalletCoreProvider";
import { useMutation } from "@tanstack/react-query";

const STRENGTH = 128;

type OnSuccessFn = (mnemonic: string) => void;
type Input = {
  onSuccess: OnSuccessFn;
};

/**
 * Creates a new wallet and returns the mnemonic.
 * @param onSuccess - The function to call when the mutation is successful.
 * @returns The mutation object.
 */
export const useCreateWalletMutation = ({ onSuccess }: Input) => {
  const walletCore = useWalletCore();

  return useMutation({
    mutationFn: async () => {
      if (!walletCore) {
        throw new Error("WalletCore not initialized");
      }

      const hdWallet = walletCore.HDWallet.create(STRENGTH, "");
      return hdWallet.mnemonic();
    },
    onSuccess,
  });
};
