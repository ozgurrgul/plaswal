import { SupportedCoinSymbol } from "@/src/library/coins";
import { useCoin } from "@/src/library/coins/hooks/useCoin";
import { useWalletDataByCoin } from "@/src/library/coins/hooks/useuseWalletDataByCoin";
import { useTokenBalance } from "@/src/library/coins/hooks/useTokenBalance";
import { useParams } from "react-router";
import { Header } from "@/src/ui/components/Header";
import { useState } from "react";
import type { TokenMetadata } from "@/src/library/coins/types";
import "./WalletDetailScreen.css";
import { CopyIcon } from "@/src/ui/components/CopyIcon";

interface EnhancedTokenItemProps {
  token: TokenMetadata;
  address: string;
}

const qrCodeIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-qr-code-icon lucide-qr-code"
    >
      <rect width="5" height="5" x="3" y="3" rx="1" />
      <rect width="5" height="5" x="16" y="3" rx="1" />
      <rect width="5" height="5" x="3" y="16" rx="1" />
      <path d="M21 16h-3a2 2 0 0 0-2 2v3" />
      <path d="M21 21v.01" />
      <path d="M12 7v3a2 2 0 0 1-2 2H7" />
      <path d="M3 12h.01" />
      <path d="M12 3h.01" />
      <path d="M12 16v.01" />
      <path d="M16 12h1" />
      <path d="M21 12v.01" />
      <path d="M12 21v-1" />
    </svg>
  );
};

const EnhancedWalletDetailTokenItem: React.FC<EnhancedTokenItemProps> = ({
  token,
  address,
}) => {
  const { data: balance, isLoading } = useTokenBalance(token.symbol, address);

  return (
    <div className="wallet-detail-token-item">
      <div className="wallet-detail-token-icon">
        {token.iconUrl ? (
          <img src={token.iconUrl} alt={token.symbol} />
        ) : (
          token.symbol.charAt(0)
        )}
      </div>
      <div className="wallet-detail-token-content">
        <div className="wallet-detail-token-info">
          <div className="wallet-detail-token-symbol">{token.symbol}</div>
        </div>
        <div className="wallet-detail-token-balance">
          {isLoading ? "..." : balance?.balance || "0"} {token.symbol}
        </div>
      </div>
    </div>
  );
};

export const WalletDetailScreen = () => {
  const { coinSymbol } = useParams() as {
    coinSymbol: SupportedCoinSymbol;
  };
  const walletData = useWalletDataByCoin(coinSymbol);
  const coin = useCoin(coinSymbol);
  const tokens = coin?.getKnownTokenMetadata();
  const [copySuccess, setCopySuccess] = useState(false);

  if (!walletData || !coin) {
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
      <Header title={`${coin.metadata.name} Wallet`} />

      <div className="wallet-detail-screen">
        <div className="wallet-detail-main-info">
          <div className="wallet-detail-coin-header">
            {coin.metadata.iconUrl && (
              <img src={coin.metadata.iconUrl} alt={coin.metadata.name} />
            )}
            <div className="wallet-detail-coin-name">{coin.metadata.name}</div>
            {qrCodeIcon()}
          </div>

          <div className="wallet-detail-balance-section">
            <div className="wallet-detail-balance">
              {balance} {coin.metadata.symbol}
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

        {tokens && tokens.length > 0 && (
          <div className="wallet-detail-tokens-section">
            <div className="wallet-detail-tokens-title">Tokens</div>
            <div className="wallet-detail-tokens-list">
              {tokens.map((token) => (
                <EnhancedWalletDetailTokenItem
                  key={token.symbol}
                  token={token}
                  address={walletData.address}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};
