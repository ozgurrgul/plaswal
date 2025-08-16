import { useState } from "react";
import { useCreateWalletMutation } from "../../library/walletCore/hooks/useCreateWalletMutation";
import { PERSISTENCE_KEYS } from "@/src/constants/PersistenceKeys";
import { setValue } from "@/src/utils/persistence";
import { Button } from "@/src/ui/components/Button";

interface Props {
  onContinueClick: () => void;
}

export const CreateNewWalletScreen: React.FC<Props> = ({ onContinueClick }) => {
  const [tempMnemonic, setTempMnemonic] = useState<string | null>(null);

  const createWalletMutation = useCreateWalletMutation({
    onSuccess: (mnemonic) => {
      setTempMnemonic(mnemonic);
    },
  });

  const handleContinueClick = () => {
    setValue(PERSISTENCE_KEYS.WALLET_MNEMONIC, tempMnemonic);
    onContinueClick();
  };

  useEffect(() => {
    createWalletMutation.mutateAsync();
  }, []);

  return (
    <div className="wallet-screen">
      {tempMnemonic && (
        <div className="wallet-info">
          <h4>New Wallet Created</h4>
          <div>
            <strong>Mnemonic (Save this securely!):</strong>
            <p>
              <code className="mnemonic">{tempMnemonic}</code>
            </p>
          </div>
          <Button
            onClick={handleContinueClick}
            disabled={createWalletMutation.isPending}
          >
            Continue
          </Button>
        </div>
      )}
    </div>
  );
};
