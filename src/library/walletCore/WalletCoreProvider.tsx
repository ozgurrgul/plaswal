import { type WalletCore } from "@trustwallet/wallet-core";
import React, { useEffect, useState } from "react";
import { getWalletCore } from "./walletCore";

const WalletCoreContext = React.createContext<WalletCore | null>(null);

export const useWalletCore = () => {
  const context = React.useContext(WalletCoreContext);
  if (context === undefined) {
    throw new Error("useWalletCore must be used within a WalletCoreProvider");
  }
  return context;
};

export const WalletCoreProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [walletCore, setWalletCore] = useState<WalletCore | null>(null);

  useEffect(() => {
    getWalletCore().then(setWalletCore);
  }, []);

  return (
    <WalletCoreContext.Provider value={walletCore}>
      {children}
    </WalletCoreContext.Provider>
  );
};
