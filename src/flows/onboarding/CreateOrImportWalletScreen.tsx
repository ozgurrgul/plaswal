interface Props {
  onCreateClick: () => void;
  onImportClick: () => void;
}

export const CreateOrImportWalletScreen: React.FC<Props> = ({ onCreateClick, onImportClick }) => {
  return <div>
    <h2>Multi-Coin Wallet</h2>

    <div className="actions">
      <button onClick={onCreateClick}>Create New Wallet</button>
      <button onClick={onImportClick}>Import Existing Wallet</button>
    </div>
  </div>;
};