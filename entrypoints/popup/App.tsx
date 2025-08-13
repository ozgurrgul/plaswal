import { ROUTES } from "@/src/router/RouterConstants";
import { HashRouter, Route, Routes } from "react-router";
import { useEffect } from "react";
import { useIsOnboarded } from "@/src/library/walletCore/hooks/useIsOnboarded";
import { WalletScreen } from "@/src/flows/wallet/WalletScreen";
import { WalletDetailScreen } from "@/src/flows/wallet/WalletDetailScreen";

function App() {
  const isOnboarded = useIsOnboarded();

  useEffect(() => {
    (async () => {
      if (!isOnboarded) {
        await browser.tabs.create({
          url: browser.runtime.getURL("/onboarding.html"),
        });
      }
    })();
  }, [isOnboarded]);

  return (
    <>
      <HashRouter>
        <Routes>
          <Route path={ROUTES.WALLET} element={<WalletScreen />} />
          <Route path={ROUTES.WALLET_DETAIL} element={<WalletDetailScreen />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
