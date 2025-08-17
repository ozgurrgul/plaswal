import "./WalletDetailScreen.css";
import { CopyIcon } from "@/src/ui/components/CopyIcon";
import { AssetSymbol } from "@/src/library/coins/types";
import { useAsset } from "@/src/library/coins/hooks/useAsset";
import { CustomDrawer } from "@/src/ui/components/Drawer";
import { WalletDetailReceive } from "./WalletDetailReceive";
import { useCopyText } from "@/src/hooks/useCopyText";
import { WalletDetailSendFlow } from "./send/WalletDetailSendFlow";
import { useWalletDataByCoin } from "@/src/library/coins/hooks/useWalletDataByCoin";
import { Button } from "@/src/ui/components/Button";
import { SendIcon, ReceiveIcon, SwapIcon } from "@/src/ui/components/Icons";
import { AssetIcon } from "@/src/ui/AssetIcon/AssetIcon";

interface Props {
  assetSymbol: AssetSymbol;
}

export const WalletDetailScreen: React.FC<Props> = ({ assetSymbol }) => {
  const walletData = useWalletDataByCoin(assetSymbol);
  const coinOrToken = useAsset(assetSymbol);
  const { copySuccess, handleCopyText } = useCopyText();

  if (!walletData || !coinOrToken) {
    return null;
  }

  const { balance, address } = walletData;

  return (
    <>
      <div className="wallet-detail-screen">
        <div className="wallet-detail-main-info">
          <div className="wallet-detail-coin-header">
            <AssetIcon assetSymbol={coinOrToken.metadata.symbol} size={24} />
            <div className="wallet-detail-coin-name">
              {coinOrToken.metadata.name}
            </div>
          </div>

          <div className="wallet-detail-balance-section">
            <div className="wallet-detail-balance">
              {balance} {coinOrToken.metadata.symbol}
            </div>
          </div>

          <div className="wallet-detail-address-section">
            <div className="wallet-detail-address-label">Address</div>
            <div className="wallet-detail-address-container">
              <div className="wallet-detail-address">{address}</div>
              <span className="wallet-detail-copy-button">
                <CopyIcon
                  onClick={() => handleCopyText(address)}
                  isCopied={copySuccess}
                />
              </span>
            </div>
          </div>
        </div>
        <div className="wallet-detail-actions">
          <CustomDrawer
            trigger={<Button startDecorator={<SendIcon />}>Send</Button>}
            title="Send Crypto"
            description={`Send your ${coinOrToken.metadata.symbol} to another address`}
          >
            <WalletDetailSendFlow assetSymbol={coinOrToken.metadata.symbol} />
          </CustomDrawer>

          <CustomDrawer
            trigger={<Button startDecorator={<ReceiveIcon />}>Receive</Button>}
            title="Receive Crypto"
            description={`Share your ${coinOrToken.metadata.symbol} address`}
          >
            <WalletDetailReceive address={address} />
          </CustomDrawer>

          <Button startDecorator={<SwapIcon />}>Swap</Button>
        </div>
      </div>
    </>
  );
};
