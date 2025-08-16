import { SupportedCoinOrTokenSymbol } from "@/src/library/coins/types";
import "./BalanceInput.css";
import { useWalletDataByCoin } from "@/src/library/coins/hooks/useWalletDataByCoin";
import Input from "@mui/joy/Input";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  coinSymbol: SupportedCoinOrTokenSymbol;
}

export const BalanceInput: React.FC<Props> = ({ coinSymbol, ...props }) => {
  const walletData = useWalletDataByCoin(coinSymbol);

  if (!walletData) {
    return null;
  }

  return (
    <div>
      <div className="balance-input-container">
        {/* @ts-expect-error */}
        <Input
          placeholder={`0.00 ${coinSymbol}`}
          style={{
            width: "100%",
          }}
          endDecorator={coinSymbol}
          {...props}
        />
      </div>
      <div className="balance-input-balance">
        Available: {walletData.balance} {coinSymbol}
      </div>
    </div>
  );
};
