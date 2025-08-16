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
import { BalanceInput } from "@/src/ui/BalanceInput/BalanceInput";
import { Button } from "@/src/ui/components/Button";
import Input from "@mui/joy/Input";
import FormControl from "@mui/joy/FormControl";
import FormHelperText from "@mui/joy/FormHelperText";

interface Props {
  coinSymbol: SupportedCoinOrTokenSymbol;
  onContinue: (data: SendFormData) => void;
}

export const WalletDetailSendInputStep: React.FC<Props> = ({
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

  const recipientAddressError = errors.recipientAddress;
  const amountError = errors.amount;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: "flex", flexDirection: "column", gap: "16px" }}
    >
      <div>
        <FormControl error={!!recipientAddressError}>
          <Input
            {...register("recipientAddress")}
            type="text"
            placeholder="Recipient address"
            error={!!recipientAddressError}
            style={{
              borderColor: recipientAddressError ? "var(--error)" : undefined,
            }}
          />
          {recipientAddressError && (
            <FormHelperText>{recipientAddressError.message}</FormHelperText>
          )}
        </FormControl>
      </div>

      <div>
        <FormControl error={!!amountError}>
          <BalanceInput coinSymbol={coinSymbol} {...register("amount")} />
          {amountError && (
            <FormHelperText>{amountError.message}</FormHelperText>
          )}
        </FormControl>
      </div>

      <Button
        type="submit"
        disabled={!isValid}
        style={{
          width: "100%",
        }}
      >
        Review Transaction
      </Button>
    </form>
  );
};
