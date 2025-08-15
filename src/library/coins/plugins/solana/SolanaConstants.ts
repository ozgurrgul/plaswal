import { CoinEnvironment } from "../../types";

export const RPC_URLS: Record<CoinEnvironment, string> = {
  production: "https://go.getblock.us/86aac42ad4484f3c813079afc201451c",
  development: "https://api.devnet.solana.com",
};
