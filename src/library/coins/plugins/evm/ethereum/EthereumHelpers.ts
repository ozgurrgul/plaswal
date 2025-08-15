import { createPublicClient, http } from "viem";
import { ETH_CHAINS } from "./EthereumConstants";
import { COIN_ENVIRONMENT } from "@/src/library/constants";

export const getEthereumChain = () => {
  return ETH_CHAINS[COIN_ENVIRONMENT];
};

export const getEthereumRpc = () => {
  return createPublicClient({
    chain: getEthereumChain(),
    transport: http(),
  });
};
