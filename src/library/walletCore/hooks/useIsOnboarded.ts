import { PERSISTENCE_KEYS } from "@/src/constants/PersistenceKeys";
import { usePersistenceValue } from "@/src/hooks/usePersistenceValue";
import { getValue } from "@/src/utils/persistence";

/**
 * Checks if the user is onboarded by checking if the wallet mnemonic is set in the persistence storage.
 * We send 'true' as initial value intentionally to avoid showing the onboarding flow to users who have already onboarded.
 * @returns true if the user is onboarded, false otherwise.
 */
export const useIsOnboarded = () => {
  return usePersistenceValue<boolean>(PERSISTENCE_KEYS.WALLET_MNEMONIC, true);
};
