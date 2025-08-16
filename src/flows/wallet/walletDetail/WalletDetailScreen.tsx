import "./WalletDetailScreen.css";
import { CopyIcon } from "@/src/ui/components/CopyIcon";
import { SupportedCoinOrTokenSymbol } from "@/src/library/coins/types";
import { useCoinOrToken } from "@/src/library/coins/hooks/useCoinOrToken";
import { CustomDrawer } from "@/src/ui/components/Drawer";
import { WalletDetailReceive } from "./WalletDetailReceive";
import { useCopyText } from "@/src/hooks/useCopyText";
import { WalletDetailSendFlow } from "./send/WalletDetailSendFlow";
import { useWalletDataByCoin } from "@/src/library/coins/hooks/useWalletDataByCoin";
import { Button } from "@/src/ui/components/Button";

interface Props {
  coinSymbol: SupportedCoinOrTokenSymbol;
}

export const WalletDetailScreen: React.FC<Props> = ({ coinSymbol }) => {
  const walletData = useWalletDataByCoin(coinSymbol);
  const coinOrToken = useCoinOrToken(coinSymbol);
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
            {coinOrToken.metadata.iconUrl && (
              <img src={coinOrToken.metadata.iconUrl} />
            )}
            <div className="wallet-detail-coin-name">
              {coinOrToken.metadata.name}
            </div>
            {/* <QrCodeIcon /> */}
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
              <CopyIcon
                onClick={() => handleCopyText(address)}
                isCopied={copySuccess}
              />
            </div>
          </div>
        </div>
        <div className="wallet-detail-actions">
          <CustomDrawer
            trigger={<Button>Send</Button>}
            title="Send Crypto"
            description={`Send your ${coinOrToken.metadata.symbol} to another address`}
          >
            <WalletDetailSendFlow coinSymbol={coinOrToken.metadata.symbol} />
          </CustomDrawer>

          <CustomDrawer
            trigger={<Button>Receive</Button>}
            title="Receive Crypto"
            description={`Share your ${coinOrToken.metadata.symbol} address`}
          >
            <WalletDetailReceive address={address} />
          </CustomDrawer>

          <Button>Swap</Button>
        </div>
      </div>
    </>
  );
};
