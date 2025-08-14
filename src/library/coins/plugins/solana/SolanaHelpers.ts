import { createSolanaRpc } from "@solana/kit";

const RPC_URL = "https://go.getblock.us/86aac42ad4484f3c813079afc201451c";

export const getSolanaRpc = () => {
  return createSolanaRpc(RPC_URL);
};
