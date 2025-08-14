import { useAppNavigate } from "@/src/hooks/useAppNavigate";
import type { TokenMetadata, WalletItemType } from "@/src/library/coins/types";
import type { CoinMetadata } from "@/src/library/coins/types";
import "./WalletItem.css";

interface Props {
  coin: CoinMetadata | TokenMetadata;
  wallet: WalletItemType;
}

export const WalletItem: React.FC<Props> = ({ coin, wallet }) => {
  const { goToWalletDetail } = useAppNavigate();

  return (
    <div
      className="wallet-item"
      key={coin.symbol}
      onClick={() => goToWalletDetail(coin.symbol)}
    >
      {coin.iconUrl && <img src={coin.iconUrl} alt={coin.name} />}

      <div className="wallet-item-content">
        <div>
          <div className="wallet-item-name">
            {coin.name} ({coin.symbol})
          </div>
          <div className="wallet-item-address">{wallet.address}</div>
        </div>

        <div className="wallet-item-balance">
          {wallet.balance} {coin.symbol}
        </div>
      </div>
    </div>
  );
};
