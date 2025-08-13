import { useAppNavigate } from "@/src/hooks/useAppNavigate";

interface Props {
  title: string;
}

const backIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-arrow-left"
    >
      <path d="M19 12H5" />
      <path d="M12 19L5 12 12 5" />
    </svg>
  );
};

export const Header: React.FC<Props> = ({ title }) => {
  const { canGoBack, goBack } = useAppNavigate();

  return (
    <div
      style={{
        position: "relative",
        borderBottom: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        padding: "0px 12px",
        minHeight: "40px",
      }}
    >
      {canGoBack && (
        <span style={{ cursor: "pointer" }} onClick={goBack}>
          {backIcon()}
        </span>
      )}
      <div
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          top: "4px",
        }}
      >
        {title}
      </div>
    </div>
  );
};
