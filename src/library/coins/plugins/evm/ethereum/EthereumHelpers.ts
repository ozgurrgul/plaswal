import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

export const getEthereumRpc = () => {
  return createPublicClient({
    chain: mainnet,
    transport: http(),
  });
};
