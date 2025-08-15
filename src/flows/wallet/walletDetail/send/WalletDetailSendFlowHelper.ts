import { BaseCoinPlugin } from "@/src/library/coins";
import { getWalletCore } from "@/src/library/walletCore/walletCore";
import z from "zod";

export const createSendFormSchema = (
  isValidAddressFn: BaseCoinPlugin["isValidAddress"]
) => {
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
    amount: z.string(),
  });
};

export type SendFormData = z.infer<ReturnType<typeof createSendFormSchema>>;
