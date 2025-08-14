import type { WalletCore } from "@trustwallet/wallet-core";

import type { BaseTokenPlugin, TokenMetadata } from "../../types";
import { HDWallet } from "@trustwallet/wallet-core/dist/src/wallet-core";
import { SolanaPlugin } from "./SolanaPlugin";
import { address as addressCtor } from "@solana/kit";
import { getSolanaRpc } from "./SolanaHelpers";

export class SplTokenPlugin implements BaseTokenPlugin {
  readonly metadata: TokenMetadata;
  readonly parentCoin = "SOL" as const;
  private solanaPlugin: SolanaPlugin;

  constructor(metadata: TokenMetadata) {
    this.metadata = metadata;
    this.solanaPlugin = new SolanaPlugin();
  }

  // Use SolanaPlugin methods for address operations
  getAddress(walletCore: WalletCore, hdWallet: HDWallet): string {
    return this.solanaPlugin.getAddress(walletCore, hdWallet);
  }

  isValidAddress(walletCore: WalletCore, address: string): boolean {
    return this.solanaPlugin.isValidAddress(walletCore, address);
  }

  async getBalance(address: string): Promise<string> {
    try {
      const tokenAccount = await getSolanaRpc()
        .getTokenAccountsByOwner(
          addressCtor(address),
          {
            mint: addressCtor(this.metadata.contractAddress),
          },
          { encoding: "jsonParsed" }
        )
        .send();

      if (tokenAccount.value.length === 0) {
        return "0";
      }

      return (
        tokenAccount.value[0].account.data.parsed.info.tokenAmount
          .uiAmountString || "0"
      );
    } catch (error) {
      console.error("Error fetching SPL token balance:", error);
      return "0";
    }
  }

  async sendTransaction(
    walletCore: WalletCore,
    from: string,
    to: string,
    amount: string
  ): Promise<string> {
    throw new Error("SPL token transaction sending not implemented yet");
  }

  // Static method to create known SPL token instances
  static createKnownTokens(): SplTokenPlugin[] {
    const knownTokens = new SolanaPlugin().getKnownTokenMetadata();
    return knownTokens.map(
      (tokenMetadata) => new SplTokenPlugin(tokenMetadata)
    );
  }
}
