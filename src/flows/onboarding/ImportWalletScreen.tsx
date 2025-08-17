import { useState } from "react";
import { useIsValidWalletMutation } from "../../library/walletCore/hooks/useIsValidWalletMutation";
import { Button } from "@/src/ui/components/Button";
import Textarea from "@mui/joy/Textarea";

interface Props {
  onContinueClick: () => void;
}

export const ImportWalletScreen: React.FC<Props> = ({ onContinueClick }) => {
  const [mnemonic, setMnemonic] = useState("");

  const isValidWalletMutation = useIsValidWalletMutation({
    onSuccess: onContinueClick,
  });

  const handleImportClick = () => {
    isValidWalletMutation.mutate(mnemonic);
  };

  return (
    <div>
      <h4>Import Wallet</h4>
      <p>Enter your wallet mnemonic to import your wallet.</p>
      <p>
        <Textarea
          placeholder="Enter your wallet mnemonic (12, 15, 18, 21, or 24 words)"
          value={mnemonic}
          onChange={(e) => setMnemonic(e.target.value.trim())}
          minRows={3}
          maxRows={3}
        />
      </p>
      {isValidWalletMutation.error && (
        <p style={{ color: "var(--error)" }}>
          {isValidWalletMutation.error.message}
        </p>
      )}
      <Button
        onClick={handleImportClick}
        disabled={isValidWalletMutation.isPending}
      >
        Import and continue
      </Button>
    </div>
  );
};
