interface Props {
  onContinueClick: () => void;
}

export const ImportWalletSuccessScreen: React.FC<Props> = ({
  onContinueClick,
}) => {
  return (
    <div>
      You have successfully imported your wallet!
      <button onClick={onContinueClick}>Continue</button>
    </div>
  );
};
