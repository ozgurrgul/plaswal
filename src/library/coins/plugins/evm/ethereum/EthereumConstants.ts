import { CoinEnvironment } from "../../../types";
import { Chain, mainnet, sepolia } from "viem/chains";

export const ETH_CHAINS: Record<CoinEnvironment, Chain> = {
  production: mainnet,
  development: sepolia,
};
