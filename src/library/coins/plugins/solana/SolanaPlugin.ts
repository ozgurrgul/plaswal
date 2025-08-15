import type { WalletCore } from "@trustwallet/wallet-core";
import type { BaseCoinPlugin, CoinMetadata, TokenMetadata } from "../../types";
import { HDWallet } from "@trustwallet/wallet-core/dist/src/wallet-core";
import {
  address as addressCtor,
  createTransactionMessage,
  setTransactionMessageFeePayerSigner,
  setTransactionMessageLifetimeUsingBlockhash,
  signTransactionMessageWithSigners,
  sendAndConfirmTransactionFactory,
  appendTransactionMessageInstructions,
  getSignatureFromTransaction,
  pipe,
  lamports,
  createKeyPairSignerFromBytes,
  createSolanaRpcSubscriptions,
} from "@solana/kit";
import { getSolanaRpc, getSolanaRpcUrl } from "./SolanaHelpers";
import { PERSISTENCE_KEYS } from "@/src/constants/PersistenceKeys";
import { getValue } from "@/src/utils/persistence";
import { getTransferSolInstruction } from "@solana-program/system";

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

  async getBalance(address: string): Promise<bigint> {
    try {
      const tokenAccountAddress = addressCtor(address);
      const balance = await getSolanaRpc()
        .getBalance(tokenAccountAddress)
        .send();
      return balance.value;
    } catch (error) {
      console.error("Error fetching SOL balance:", error);
      return BigInt(0);
    }
  }

  async sendTransaction(
    walletCore: WalletCore,
    from: string,
    to: string,
    amount: string
  ): Promise<string> {
    try {
      const mnemonic = await getValue<string>(PERSISTENCE_KEYS.WALLET_MNEMONIC);
      if (!mnemonic) {
        throw new Error("Wallet mnemonic not found");
      }

      const hdWallet = walletCore.HDWallet.createWithMnemonic(mnemonic, "");

      const privateKeyData = hdWallet.getKeyForCoin(walletCore.CoinType.solana);
      const privateKeyBytes = privateKeyData.data();

      // WalletCore only gives us the 32-byte private key, but createKeyPairSignerFromBytes
      // expects a 64-byte keypair. We need to derive the public key and concatenate them.
      const { Keypair } = await import("@solana/web3.js");

      // Solana expects a 64-byte secret key (32 bytes private + 32 bytes public)
      // but WalletCore gives us only the 32-byte private key
      let keypair;
      if (privateKeyBytes.length === 64) {
        // WalletCore gave us the full 64-byte secret key
        keypair = Keypair.fromSecretKey(privateKeyBytes);
      } else if (privateKeyBytes.length === 32) {
        // We only have the 32-byte private key, use fromSeed to generate the full keypair
        keypair = Keypair.fromSeed(privateKeyBytes);
      } else {
        throw new Error(
          `Unexpected private key size: ${privateKeyBytes.length} bytes`
        );
      }

      // Create 64-byte keypair (32 bytes private + 32 bytes public)
      const fullKeyPairBytes = new Uint8Array([
        ...keypair.secretKey.slice(0, 32), // First 32 bytes are the private key
        ...keypair.publicKey.toBytes(), // Next 32 bytes are the public key
      ]);

      const signer = await createKeyPairSignerFromBytes(fullKeyPairBytes);
      const rpc = getSolanaRpc();

      const senderBalance = await this.getBalance(from);
      const amountInSOL = parseFloat(amount);
      const balanceInSOL = Number(senderBalance) / Math.pow(10, 9);

      if (balanceInSOL < amountInSOL) {
        throw new Error(
          `Insufficient balance. Have: ${balanceInSOL} SOL, Need: ${amountInSOL} SOL`
        );
      }

      const estimatedFee = 0.000005;
      if (balanceInSOL < amountInSOL + estimatedFee) {
        throw new Error(
          `Insufficient balance for transaction + fees. Have: ${balanceInSOL} SOL, Need: ${
            amountInSOL + estimatedFee
          } SOL`
        );
      }

      const rpcSubscriptions = createSolanaRpcSubscriptions(getSolanaRpcUrl());

      const sendAndConfirmTransaction = sendAndConfirmTransactionFactory({
        rpc,
        rpcSubscriptions,
      });

      const amountInLamports = lamports(
        BigInt(Math.floor(parseFloat(amount) * Math.pow(10, 9)))
      );
      const transferInstruction = getTransferSolInstruction({
        source: signer,
        destination: addressCtor(to),
        amount: amountInLamports,
      });

      const { value: latestBlockhash } = await rpc.getLatestBlockhash().send();

      const transactionMessage = pipe(
        createTransactionMessage({ version: 0 }),
        (tx) => setTransactionMessageFeePayerSigner(signer, tx),
        (tx) =>
          setTransactionMessageLifetimeUsingBlockhash(latestBlockhash, tx),
        (tx) => appendTransactionMessageInstructions([transferInstruction], tx)
      );

      const transaction = await signTransactionMessageWithSigners(
        transactionMessage
      );

      const signature = getSignatureFromTransaction(transaction);
      await sendAndConfirmTransaction(transaction, { commitment: "confirmed" });

      return signature;
    } catch (error) {
      console.error("Error sending Solana transaction:", error);
      throw error;
    }
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
