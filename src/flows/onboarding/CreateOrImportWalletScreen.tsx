import { Button } from "@/src/ui/components/Button";

interface Props {
  onCreateClick: () => void;
  onImportClick: () => void;
}

export const CreateOrImportWalletScreen: React.FC<Props> = ({ onCreateClick, onImportClick }) => {
  return <div>
    <h2>Multi-Coin Wallet</h2>

    <div className="actions">
      <Button onClick={onCreateClick}>Create New Wallet</Button>
      <Button onClick={onImportClick}>Import Existing Wallet</Button>
    </div>
  </div>;
};