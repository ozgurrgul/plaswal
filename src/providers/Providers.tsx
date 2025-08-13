import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { WalletCoreProvider } from "../library/walletCore/WalletCoreProvider"

const queryClient = new QueryClient()

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletCoreProvider>{children}</WalletCoreProvider>
    </QueryClientProvider>
  )
}
