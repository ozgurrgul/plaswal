import { useCoins } from "@/src/library/coins/hooks/useCoins";
import { useWalletData } from "@/src/library/coins/hooks/useWalletData";
import { WalletItem } from "./WalletItem";
import { Header } from "@/src/ui/components/Header";
import "./WalletScreen.css";
import { SupportedCoinSymbol, WalletData } from "@/src/library/coins";
import { SupportedTokenSymbol } from "@/src/library/coins";
import { LoadingBig } from "@/src/ui/components/Loading";

export const WalletScreen = () => {
  const { getCoin, getToken } = useCoins();
  const { data: walletData, isLoading, error } = useWalletData();

  if (isLoading) {
    return <LoadingBig />;
  }

  if (error) {
    return <div>Error loading wallet: {error.message}</div>;
  }

  return (
    <>
      <Header title="Your Wallet" />
      <div className="wallet-screen wallet-screen-fade-in">
        <div className="wallet-screen-coins-list">
          {Object.keys(walletData || {}).map((assetSymbol) => {
            const wallet = walletData?.[assetSymbol as keyof WalletData];
            if (!wallet) {
              return null;
            }

            const coin = wallet.isNative
              ? getCoin(assetSymbol as SupportedCoinSymbol)
              : getToken(assetSymbol as SupportedTokenSymbol);

            if (!coin) {
              return null;
            }

            return (
              <WalletItem
                key={coin.metadata.symbol}
                coin={coin.metadata}
                wallet={wallet}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
