import { CheckIcon, CopyIcon as CopyIconSvg } from "./Icons";

interface Props {
  onClick: () => void;
  isCopied: boolean;
}

export const CopyIcon = ({ onClick, isCopied }: Props) => {
  return (
    <span onClick={onClick} title={isCopied ? "Copied!" : "Copy address"}>
      {isCopied ? <CheckIcon /> : <CopyIconSvg />}
    </span>
  );
};
