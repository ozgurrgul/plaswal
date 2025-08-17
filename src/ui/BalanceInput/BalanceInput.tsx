import { AssetSymbol } from "@/src/library/coins/types";
import "./BalanceInput.css";
import { useWalletDataByCoin } from "@/src/library/coins/hooks/useWalletDataByCoin";
import Input from "@mui/joy/Input";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  assetSymbol: AssetSymbol;
}

export const BalanceInput: React.FC<Props> = ({ assetSymbol, ...props }) => {
  const walletData = useWalletDataByCoin(assetSymbol);

  if (!walletData) {
    return null;
  }

  return (
    <div>
      <div className="balance-input-container">
        {/* @ts-expect-error */}
        <Input
          placeholder={`0.00 ${assetSymbol}`}
          style={{
            width: "100%",
          }}
          endDecorator={assetSymbol}
          {...props}
        />
      </div>
      <div className="balance-input-balance">
        Available: {walletData.balance} {assetSymbol}
      </div>
    </div>
  );
};
