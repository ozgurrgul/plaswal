import { ROUTES } from "@/src/router/RouterConstants";
import { HashRouter, Route, Routes } from "react-router";
import { useEffect } from "react";
import { useIsOnboarded } from "@/src/library/walletCore/hooks/useIsOnboarded";
import { HomeScreen } from "@/src/flows/home/HomeScreen";

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
          <Route path={ROUTES.HOME} element={<HomeScreen />} />
          <Route path={ROUTES.ABOUT} element={<div>About</div>} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
