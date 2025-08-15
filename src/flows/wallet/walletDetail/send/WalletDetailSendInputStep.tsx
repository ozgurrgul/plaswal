import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCoinOrToken } from "@/src/library/coins/hooks/useCoinOrToken";
import {
  CoinOrTokenPlugin,
  SupportedCoinOrTokenSymbol,
} from "@/src/library/coins/types";
import {
  createSendFormSchema,
  SendFormData,
} from "./WalletDetailSendFlowHelper";

interface Props {
  balance: string;
  coinSymbol: SupportedCoinOrTokenSymbol;
  onContinue: (data: SendFormData) => void;
}

export const WalletDetailSendInputStep: React.FC<Props> = ({
  balance,
  coinSymbol,
  onContinue,
}) => {
  const coinOrToken = useCoinOrToken(coinSymbol) as CoinOrTokenPlugin;
  const isValidAddressFn = coinOrToken.isValidAddress;

  const sendFormSchema = useMemo(
    () => createSendFormSchema(isValidAddressFn),
    [isValidAddressFn]
  );

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SendFormData>({
    resolver: zodResolver(sendFormSchema),
    mode: "onChange",
  });

  const onSubmit = (data: SendFormData) => {
    onContinue(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <div>
        <label>Recipient Address</label>
        <input
          {...register("recipientAddress")}
          type="text"
          placeholder="Enter wallet address"
          style={{
            width: "100%",
            borderColor: errors.recipientAddress ? "var(--error)" : undefined,
          }}
        />
        {errors.recipientAddress && (
          <div
            style={{
              color: "var(--error)",
              marginTop: "4px",
            }}
          >
            {errors.recipientAddress.message}
          </div>
        )}
      </div>

      <div>
        <label>Amount ({coinSymbol})</label>
        <input
          {...register("amount")}
          type="number"
          placeholder="0.00"
          step="any"
          style={{
            width: "100%",
            borderColor: errors.amount ? "var(--error)" : undefined,
          }}
        />
        {errors.amount && (
          <div
            style={{
              color: "var(--error)",
              marginTop: "4px",
            }}
          >
            {errors.amount.message}
          </div>
        )}
        <div style={{ color: "var(--text-secondary)", marginTop: "4px" }}>
          Available: {balance} {coinSymbol}
        </div>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        style={{
          width: "100%",
        }}
      >
        Review Transaction
      </button>
    </form>
  );
};
