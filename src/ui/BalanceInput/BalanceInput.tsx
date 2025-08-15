import { SupportedCoinOrTokenSymbol } from "@/src/library/coins/types";
import "./BalanceInput.css";
import { useWalletDataByCoin } from "@/src/library/coins/hooks/useWalletDataByCoin";

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
        <input
          type="number"
          placeholder={`0.00 ${coinSymbol}`}
          style={{
            width: "100%",
          }}
          {...props}
        />
        <div className="balance-input-coin-symbol">{coinSymbol}</div>
      </div>
      <div className="balance-input-balance">
        Available: {walletData.balance} {coinSymbol}
      </div>
    </div>
  );
};
