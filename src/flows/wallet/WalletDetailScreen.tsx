import { useWalletDataByCoin } from "@/src/library/coins/hooks/useuseWalletDataByCoin";
import { useParams } from "react-router";
import { Header } from "@/src/ui/components/Header";
import { useState } from "react";
import "./WalletDetailScreen.css";
import { CopyIcon } from "@/src/ui/components/CopyIcon";
import { SupportedCoinOrTokenSymbol } from "@/src/library/coins/types";
import { QrCodeIcon } from "@/src/ui/components/Icons";
import { useCoinOrToken } from "@/src/library/coins/hooks/useCoinOrToken";

export const WalletDetailScreen = () => {
  const { coinSymbol } = useParams() as {
    coinSymbol: SupportedCoinOrTokenSymbol;
  };
  const walletData = useWalletDataByCoin(coinSymbol);
  const coinOrToken = useCoinOrToken(coinSymbol);
  const [copySuccess, setCopySuccess] = useState(false);

  if (!walletData || !coinOrToken) {
    return null;
  }

  const { balance, address } = walletData;
  const balanceFiat = "133$"; // dummy for now

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(address);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

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
            <div className="wallet-detail-balance-fiat">{balanceFiat}</div>
          </div>

          <div className="wallet-detail-address-section">
            <div className="wallet-detail-address-label">Address</div>
            <div className="wallet-detail-address-container">
              <div className="wallet-detail-address">{address}</div>
              <CopyIcon onClick={handleCopyAddress} isCopied={copySuccess} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
