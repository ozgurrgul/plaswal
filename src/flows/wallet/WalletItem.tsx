import type { TokenMetadata, WalletItemType } from "@/src/library/coins/types";
import type { CoinMetadata } from "@/src/library/coins/types";
import "./WalletItem.css";
import { NestedDrawer } from "@/src/ui/components/Drawer";
import { WalletDetailScreen } from "./walletDetail/WalletDetailScreen";
import { AssetIcon } from "@/src/ui/AssetIcon/AssetIcon";

interface Props {
  coin: CoinMetadata | TokenMetadata;
  wallet: WalletItemType;
}

export const WalletItem: React.FC<Props> = ({ coin, wallet }) => {
  return (
    <NestedDrawer
      title={`${coin.name} (${coin.symbol})`}
      description={`Your ${coin.symbol} wallet`}
      trigger={
        <div className="wallet-item" key={coin.symbol}>
          <AssetIcon assetSymbol={coin.symbol} size={36} />

          <div className="wallet-item-content">
            <div>
              <div className="wallet-item-name">
                {coin.name} ({coin.symbol})
              </div>
            </div>

            <div className="wallet-item-balance">
              {wallet.balance} {coin.symbol}
            </div>
          </div>
        </div>
      }
      children={<WalletDetailScreen assetSymbol={coin.symbol} />}
    ></NestedDrawer>
  );
};
