import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { WalletCoreProvider } from "../library/walletCore/WalletCoreProvider";
import { ThemeProvider } from "./ThemeProvider";

const queryClient = new QueryClient();

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <WalletCoreProvider>{children}</WalletCoreProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
