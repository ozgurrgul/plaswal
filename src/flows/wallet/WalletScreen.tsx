import { useCoins } from "@/src/library/coins/hooks/useCoins";
import { useWalletData } from "@/src/library/coins/hooks/useWalletData";
import { WalletItem } from "./WalletItem";

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
    <div>
      <div>Your Wallet</div>
      <div>
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
  );
};
