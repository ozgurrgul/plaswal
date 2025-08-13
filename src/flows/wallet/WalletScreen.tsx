import { useCoins } from "@/src/library/coins/hooks/useCoins";
import { useWalletData } from "@/src/library/coins/hooks/useWalletData";
import { WalletItem } from "./WalletItem";
import { Header } from "@/src/ui/components/Header";
import "./WalletScreen.css";

export const WalletScreen = () => {
  const { getAllCoins } = useCoins();
  const { data: walletData, isLoading, error } = useWalletData();

  const supportedCoins = getAllCoins();

  if (isLoading) {
    return <div>Loading wallet...</div>;
  }

  if (error) {
    return <div>Error loading wallet: {error.message}</div>;
  }

  return (
    <>
      <Header title="Your Wallet" />
      <div className="wallet-screen">
        <div className="wallet-screen-coins-list">
          {supportedCoins.map((coin) => {
            const wallet = walletData?.[coin.metadata.symbol];
            if (!wallet) {
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
