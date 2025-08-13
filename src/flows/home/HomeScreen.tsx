import { useCoins } from "@/src/library/coins/hooks/useCoins";
import { useWalletData } from "@/src/library/coins/hooks/useWalletData";

export const HomeScreen = () => {
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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Your Wallet</h1>
      <div style={{ display: "grid", gap: "16px" }}>
        {supportedCoins.map((coin) => {
          const walletAddress = walletData?.addresses[coin.metadata.symbol];
          return (
            <div key={coin.metadata.symbol}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                {coin.metadata.iconUrl && (
                  <img
                    src={coin.metadata.iconUrl}
                    alt={coin.metadata.name}
                    style={{ width: "32px", height: "32px" }}
                    onError={(e) => {
                      // Hide broken images
                      e.currentTarget.style.display = "none";
                    }}
                  />
                )}
                <div>
                  <h3 style={{ margin: "0 0 4px 0" }}>
                    {coin.metadata.name} ({coin.metadata.symbol})
                  </h3>
                  <p
                    style={{ margin: "0", fontSize: "14px", color: "#666" }}
                  ></p>
                </div>
              </div>

              {walletAddress && (
                <div style={{ marginTop: "12px" }}>
                  <p>Address: {walletAddress.address}</p>
                  <p>Balance: {walletAddress.balance}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
