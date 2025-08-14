import type { WalletCore } from "@trustwallet/wallet-core";
import type { BaseTokenPlugin, TokenMetadata } from "../types";
import { HDWallet } from "@trustwallet/wallet-core/dist/src/wallet-core";
import { SolanaPlugin } from "./SolanaPlugin";

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
    return "0.0";
  }

  async sendTransaction(
    walletCore: WalletCore,
    from: string,
    to: string,
    amount: string,
    contractAddress: string,
    privateKey: string
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
