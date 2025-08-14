import { useQuery } from "@tanstack/react-query";
import { SupportedTokenSymbol } from "../types";
import { useToken } from "./useToken";

export const useTokenBalance = (
  symbol: SupportedTokenSymbol,
  address: string
) => {
  const token = useToken(symbol);

  return useQuery({
    queryKey: ["tokenBalance", symbol, address],
    queryFn: async () => {
      if (!token) {
        throw new Error(`Token ${symbol} not found`);
      }

      const balance = await token.getBalance(address);

      return {
        balance,
      };
    },
  });
};
