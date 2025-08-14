import { initWasm, WalletCore } from "@trustwallet/wallet-core";

let WalletCore_Instance: WalletCore | null = null;

export const getWalletCore = async () => {
  if (WalletCore_Instance) {
    return WalletCore_Instance;
  }

  WalletCore_Instance = await initWasm();

  return WalletCore_Instance;
};
