import { useState } from "react";
import { useIsValidWalletMutation } from "../../library/walletCore/hooks/useIsValidWalletMutation";

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
        <textarea
          placeholder="Enter your wallet mnemonic (12, 15, 18, 21, or 24 words)"
          value={mnemonic}
          onChange={(e) => setMnemonic(e.target.value.trim())}
          rows={3}
        />
      </p>
      {isValidWalletMutation.error && (
        <p style={{ color: "var(--error)" }}>
          {isValidWalletMutation.error.message}
        </p>
      )}
      <button
        onClick={handleImportClick}
        disabled={isValidWalletMutation.isPending}
      >
        Import and continue
      </button>
    </div>
  );
};
