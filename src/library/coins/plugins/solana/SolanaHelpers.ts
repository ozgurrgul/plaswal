import { createSolanaRpc } from "@solana/kit";
import { RPC_URLS } from "./SolanaConstants";
import { COIN_ENVIRONMENT } from "@/src/library/constants";

export const getSolanaRpcUrl = () => {
  return RPC_URLS[COIN_ENVIRONMENT];
};

export const getSolanaRpc = () => {
  return createSolanaRpc(getSolanaRpcUrl());
};
