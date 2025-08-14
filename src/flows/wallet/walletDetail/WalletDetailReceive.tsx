import { useCopyText } from "@/src/hooks/useCopyText";
import { QRCodeSVG } from "qrcode.react";

interface Props {
  address: string;
}

export const WalletDetailReceive: React.FC<Props> = ({ address }) => {
  const { copySuccess, handleCopyText } = useCopyText();

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          padding: "20px",
          backgroundColor: "var(--accent-bg)",
          borderRadius: "var(--standard-border-radius)",
          marginBottom: "16px",
          border: "var(--border-width) solid var(--border)",
        }}
      >
        <QRCodeSVG value={address} />
        <p
          style={{
            margin: "0",
            fontSize: "0.9rem",
            wordBreak: "break-all",
          }}
        >
          {address}
        </p>
      </div>
      <button
        className="drawer-button-primary"
        onClick={() => handleCopyText(address)}
        style={{ width: "100%" }}
      >
        {copySuccess ? "Copied!" : "Copy Address"}
      </button>
    </div>
  );
};
