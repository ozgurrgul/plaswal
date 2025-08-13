interface Props {
  onContinueClick: () => void;
}

export const CreateNewWalletSuccessScreen: React.FC<Props> = ({
  onContinueClick,
}) => {
  return (
    <div>
      You have successfully created a new wallet!
      <button onClick={onContinueClick}>Continue</button>
    </div>
  );
};
