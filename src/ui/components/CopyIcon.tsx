interface Props {
  onClick: () => void;
  isCopied: boolean;
}

const copyIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-copy-icon lucide-copy"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
};

const checkIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      className="lucide lucide-check-icon lucide-check"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
};

export const CopyIcon = ({ onClick, isCopied }: Props) => {
  return (
    <span
      className="wallet-detail-copy-button"
      onClick={onClick}
      title={isCopied ? "Copied!" : "Copy address"}
    >
      {isCopied ? checkIcon() : copyIcon()}
    </span>
  );
};
