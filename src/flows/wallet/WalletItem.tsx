import { useAppNavigate } from "@/src/hooks/useAppNavigate";
import type { WalletItemType } from "@/src/library/coins/types";
import type { CoinMetadata } from "@/src/library/coins/types";

interface Props {
  coin: CoinMetadata;
  wallet: WalletItemType;
}

export const WalletItem: React.FC<Props> = ({ coin, wallet }) => {
  const { goToWalletDetail } = useAppNavigate();

  return (
    <div key={coin.symbol} onClick={() => goToWalletDetail(coin.symbol)}>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {coin.iconUrl && (
          <img
            src={coin.iconUrl}
            alt={coin.name}
            style={{ width: "32px", height: "32px" }}
          />
        )}
        <div>
          {coin.name} ({coin.symbol})
        </div>
      </div>

      {wallet && (
        <p>
          <div>Address: {wallet.address}</div>
          <div>Balance: {wallet.balance}</div>
        </p>
      )}
    </div>
  );
};
