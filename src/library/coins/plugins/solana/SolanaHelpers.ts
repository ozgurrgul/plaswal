import { createSolanaRpc } from "@solana/kit";
import { RPC_URLS } from "./SolanaConstants";

export const getSolanaRpcUrl = () => {
  return RPC_URLS.development;
};

export const getSolanaRpc = () => {
  return createSolanaRpc(getSolanaRpcUrl());
};
