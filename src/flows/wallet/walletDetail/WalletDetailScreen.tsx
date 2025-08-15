import { useParams } from "react-router";
import { Header } from "@/src/ui/components/Header";
import "./WalletDetailScreen.css";
import { CopyIcon } from "@/src/ui/components/CopyIcon";
import { SupportedCoinOrTokenSymbol } from "@/src/library/coins/types";
import { QrCodeIcon } from "@/src/ui/components/Icons";
import { useCoinOrToken } from "@/src/library/coins/hooks/useCoinOrToken";
import { CustomDrawer } from "@/src/ui/components/Drawer";
import { WalletDetailReceive } from "./WalletDetailReceive";
import { useCopyText } from "@/src/hooks/useCopyText";
import { WalletDetailSendFlow } from "./send/WalletDetailSendFlow";
import { useWalletDataByCoin } from "@/src/library/coins/hooks/useWalletDataByCoin";

export const WalletDetailScreen = () => {
  const { coinSymbol } = useParams() as {
    coinSymbol: SupportedCoinOrTokenSymbol;
  };
  const walletData = useWalletDataByCoin(coinSymbol);
  const coinOrToken = useCoinOrToken(coinSymbol);
  const { copySuccess, handleCopyText } = useCopyText();

  if (!walletData || !coinOrToken) {
    return null;
  }

  const { balance, address } = walletData;

  return (
    <>
      <Header title={`${coinOrToken.metadata.name} Wallet`} />

      <div className="wallet-detail-screen">
        <div className="wallet-detail-main-info">
          <div className="wallet-detail-coin-header">
            {coinOrToken.metadata.iconUrl && (
              <img src={coinOrToken.metadata.iconUrl} />
            )}
            <div className="wallet-detail-coin-name">
              {coinOrToken.metadata.name}
            </div>
            <QrCodeIcon />
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
            trigger={<button>Send</button>}
            title="Send Crypto"
            description={`Send your ${coinOrToken.metadata.symbol} to another address`}
          >
            <WalletDetailSendFlow
              balance={balance}
              coinSymbol={coinOrToken.metadata.symbol}
            />
          </CustomDrawer>

          <CustomDrawer
            trigger={<button>Receive</button>}
            title="Receive Crypto"
            description={`Share your ${coinOrToken.metadata.symbol} address`}
          >
            <WalletDetailReceive address={address} />
          </CustomDrawer>

          <button>Swap</button>
        </div>
      </div>
    </>
  );
};
