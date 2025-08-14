import { BaseCoinPlugin } from "@/src/library/coins";
import { getWalletCore } from "@/src/library/walletCore/walletCore";
import z from "zod";

export const createSendFormSchema = (
  balance: string,
  isValidAddressFn: BaseCoinPlugin["isValidAddress"]
) => {
  const availableBalance = parseFloat(balance);

  return z.object({
    recipientAddress: z
      .string()
      .min(1, "Recipient address is required")
      .refine(
        async (address) => {
          return isValidAddressFn(await getWalletCore(), address);
        },
        {
          message: "Invalid address format",
        }
      ),
    amount: z
      .string()
      .refine(
        (val) => {
          const numAmount = Number(val);
          return numAmount <= availableBalance;
        },
        {
          message: `Amount cannot exceed available balance of ${balance}`,
        }
      )
      .refine(
        (val) => {
          const numAmount = Number(val);
          // TODO temporarily allow 0 amount
          return numAmount >= 0.0;
        },
        {
          message: "Amount must be greater than 0",
        }
      ),
  });
};

export type SendFormData = z.infer<ReturnType<typeof createSendFormSchema>>;
