import { useWalletData } from "@/src/library/coins/hooks/useWalletData";
import { WalletItem } from "./WalletItem";
import { Header } from "@/src/ui/components/Header";
import "./WalletScreen.css";
import { LoadingBig } from "@/src/ui/components/Loading";
import { usePersistenceValue } from "@/src/hooks/usePersistenceValue";
import { PERSISTENCE_KEYS } from "@/src/constants/PersistenceKeys";
import { setValue } from "@/src/utils/persistence";
import { WalletSortOption, WalletSortConfig } from "./types";
import { useWalletScreenSortedData } from "./hooks/useWalletScreenSortedData";
import {
  SortAlphabeticallyIcon,
  SortByBalanceIcon,
} from "@/src/ui/components/Icons";
import Tooltip from "@mui/joy/Tooltip";
import IconButton from "@mui/joy/IconButton";

export const WalletScreen = () => {
  const { isLoading, error } = useWalletData();

  const sortConfig = usePersistenceValue<WalletSortConfig>(
    PERSISTENCE_KEYS.WALLET_SCREEN_SORT,
    undefined
  ) || { sortBy: "alphabetical" };

  const handleSortToggle = () => {
    const currentSort = sortConfig?.sortBy || "alphabetical";
    const newSortBy: WalletSortOption =
      currentSort === "alphabetical" ? "balance" : "alphabetical";
    const newConfig: WalletSortConfig = { sortBy: newSortBy };
    setValue(PERSISTENCE_KEYS.WALLET_SCREEN_SORT, newConfig);
  };

  const sortedWalletEntries = useWalletScreenSortedData(sortConfig);

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
        {/* Sort icon in top right */}
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: "12px",
          }}
        >
          <Tooltip
            title={`Currently sorting ${
              sortConfig?.sortBy === "balance" ? "by balance" : "alphabetically"
            }. Click to toggle.`}
          >
            <IconButton onClick={handleSortToggle}>
              {sortConfig?.sortBy === "balance" ? (
                <SortByBalanceIcon />
              ) : (
                <SortAlphabeticallyIcon />
              )}
            </IconButton>
          </Tooltip>
        </div>

        <div className="wallet-screen-coins-list">
          {sortedWalletEntries.map((entry) => {
            if (!entry) return null;

            return (
              <WalletItem
                key={entry.coin.metadata.symbol}
                coin={entry.coin.metadata}
                wallet={entry.wallet}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};
