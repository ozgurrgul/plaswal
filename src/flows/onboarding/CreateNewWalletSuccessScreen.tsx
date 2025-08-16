import { Button } from "@/src/ui/components/Button";

interface Props {
  onContinueClick: () => void;
}

export const CreateNewWalletSuccessScreen: React.FC<Props> = ({
  onContinueClick,
}) => {
  return (
    <div>
      You have successfully created a new wallet!
      <Button onClick={onContinueClick}>Continue</Button>
    </div>
  );
};
