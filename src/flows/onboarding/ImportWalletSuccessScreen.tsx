import { Button } from "@/src/ui/components/Button";

interface Props {
  onContinueClick: () => void;
}

export const ImportWalletSuccessScreen: React.FC<Props> = ({
  onContinueClick,
}) => {
  return (
    <div>
      You have successfully imported your wallet!
      <Button onClick={onContinueClick}>Continue</Button>
    </div>
  );
};
