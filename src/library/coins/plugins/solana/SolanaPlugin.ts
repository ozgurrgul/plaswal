import type { WalletCore } from "@trustwallet/wallet-core";
import type { BaseCoinPlugin, CoinMetadata, TokenMetadata } from "../../types";
import { HDWallet } from "@trustwallet/wallet-core/dist/src/wallet-core";
import { address as addressCtor } from "@solana/kit";
import { getSolanaRpc } from "./SolanaHelpers";

export class SolanaPlugin implements BaseCoinPlugin {
  readonly metadata: CoinMetadata = {
    symbol: "SOL",
    name: "Solana",
    decimals: 9,
    iconUrl:
      "https://assets.coingecko.com/coins/images/4128/standard/solana.png",
    explorerUrl: "https://explorer.solana.com",
    isNative: true,
  };

  getAddress(walletCore: WalletCore, hdWallet: HDWallet): string {
    return hdWallet.getAddressForCoin(walletCore.CoinType.solana);
  }

  isValidAddress(walletCore: WalletCore, address: string): boolean {
    return walletCore.AnyAddress.isValid(address, walletCore.CoinType.solana);
  }

  async getBalance(address: string): Promise<string> {
    try {
      const tokenAccountAddress = addressCtor(address);
      const balance = await getSolanaRpc()
        .getBalance(tokenAccountAddress)
        .send();
      return balance.value.toString() || "0";
    } catch (error) {
      console.error("Error fetching SOL balance:", error);
      return "0";
    }
  }

  async sendTransaction(
    walletCore: WalletCore,
    from: string,
    to: string,
    amount: string
  ): Promise<string> {
    throw new Error("Solana transaction sending not implemented yet");
  }

  getKnownTokenMetadata(): TokenMetadata[] {
    return [
      {
        symbol: "JUP",
        name: "Jupiter",
        decimals: 6,
        contractAddress: "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN",
        iconUrl:
          "https://assets.coingecko.com/coins/images/34188/standard/jup.png?1704266489",
        isNative: false,
      },
    ];
  }
}
