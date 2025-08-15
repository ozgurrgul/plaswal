import { SendFormData } from "@/src/flows/wallet/walletDetail/send/WalletDetailSendFlowHelper";
import { useMutation } from "@tanstack/react-query";
import { useCoinOrToken } from "./useCoinOrToken";
import { SupportedCoinOrTokenSymbol } from "../types";
import { useWalletCore } from "../../walletCore/WalletCoreProvider";
import { useWalletDataByCoin } from "./useWalletDataByCoin";

type Input = {
  coinSymbol: SupportedCoinOrTokenSymbol;
  onSuccess: (txHash: string) => void;
};

export const useSendMutation = ({ onSuccess, coinSymbol }: Input) => {
  const coinOrToken = useCoinOrToken(coinSymbol);
  const walletCore = useWalletCore();
  const walletData = useWalletDataByCoin(coinSymbol);

  return useMutation({
    mutationFn: async (data: SendFormData) => {
      if (!walletCore) {
        throw new Error("WalletCore not initialized");
      }

      if (!coinOrToken) {
        throw new Error("Coin or token not found");
      }

      if (!walletData) {
        throw new Error("Wallet data not found");
      }

      return coinOrToken.sendTransaction(
        walletCore,
        walletData.address,
        data.recipientAddress,
        data.amount
      );
    },
    onSuccess: (txHash) => {
      onSuccess(txHash);
    },
  });
};
