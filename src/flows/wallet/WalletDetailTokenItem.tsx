import { useTokenBalance } from "@/src/library/coins/hooks/useTokenBalance";
import { SupportedTokenSymbol } from "@/src/library/coins/types";

interface Props {
  symbol: SupportedTokenSymbol;
  address: string;
}

export const WalletDetailTokenItem: React.FC<Props> = ({ symbol, address }) => {
  const { data: balance, isLoading } = useTokenBalance(symbol, address);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <div>symbol: {symbol}</div>
        <div>balance: {balance?.balance}</div>
      </div>
    </div>
  );
};
