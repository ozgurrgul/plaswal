import { useAppNavigate } from "@/src/hooks/useAppNavigate";
import { BackIcon } from "./Icons";

interface Props {
  title: string;
}

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
          <BackIcon />
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
