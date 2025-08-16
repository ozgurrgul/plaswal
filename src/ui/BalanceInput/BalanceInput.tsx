import { SupportedCoinOrTokenSymbol } from "@/src/library/coins/types";
import "./BalanceInput.css";
import { useWalletDataByCoin } from "@/src/library/coins/hooks/useWalletDataByCoin";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  coinSymbol: SupportedCoinOrTokenSymbol;
}

export const BalanceInput: React.FC<Props> = ({ coinSymbol, ...props }) => {
  const walletData = useWalletDataByCoin(coinSymbol);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    // Only allow numbers and one decimal point
    input.value = input.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
  };

  if (!walletData) {
    return null;
  }

  return (
    <div>
      <div className="balance-input-container">
        <input
          placeholder={`0.00 ${coinSymbol}`}
          style={{
            width: "100%",
          }}
          onInput={handleInput}
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
