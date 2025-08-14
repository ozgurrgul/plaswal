import type { WalletCore } from "@trustwallet/wallet-core";
import type {
  BaseCoinPlugin,
  CoinMetadata,
  TokenMetadata,
} from "../../../types";
import { HDWallet } from "@trustwallet/wallet-core/dist/src/wallet-core";
import { getEthereumRpc } from "./EthereumHelpers";

export class EthereumPlugin implements BaseCoinPlugin {
  readonly metadata: CoinMetadata = {
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    iconUrl:
      "https://assets.coingecko.com/coins/images/279/standard/ethereum.png",
    explorerUrl: "https://etherscan.io",
    isNative: true,
  };

  getAddress(walletCore: WalletCore, hdWallet: HDWallet): string {
    return hdWallet.getAddressForCoin(walletCore.CoinType.ethereum);
  }

  isValidAddress(walletCore: WalletCore, address: string): boolean {
    return walletCore.AnyAddress.isValid(address, walletCore.CoinType.ethereum);
  }

  async getBalance(address: string): Promise<string> {
    const balance = await getEthereumRpc().getBalance({
      address: address as `0x${string}`,
    });

    return balance.toString();
  }

  async sendTransaction(
    walletCore: WalletCore,
    from: string,
    to: string,
    amount: string,
    privateKey: string
  ): Promise<string> {
    throw new Error("Ethereum transaction sending not implemented yet");
  }

  getKnownTokenMetadata(): TokenMetadata[] {
    return [
      {
        symbol: "USDT",
        name: "Tether USD",
        decimals: 6,
        contractAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
        iconUrl:
          "https://assets.coingecko.com/coins/images/325/standard/Tether.png",
        isNative: false,
      },
      {
        symbol: "WETH",
        name: "Wrapped Ether",
        decimals: 18,
        contractAddress: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        iconUrl:
          "https://assets.coingecko.com/coins/images/2518/standard/weth.png",
        isNative: false,
      },
    ];
  }
}
