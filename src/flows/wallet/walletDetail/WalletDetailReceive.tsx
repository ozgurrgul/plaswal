import { useCopyText } from "@/src/hooks/useCopyText";
import { Button } from "@/src/ui/components/Button";
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
          padding: "12px",
          backgroundColor: "var(--accent-bg)",
          borderRadius: "5px",
          border: "1px solid var(--border)",
        }}
      >
        <QRCodeSVG value={address} />
        <p
          style={{
            fontSize: "var(--fontSize-md)",
            wordBreak: "break-all",
            marginTop: "12px",
            color: "var(--text-secondary)",
          }}
        >
          {address}
        </p>
      </div>
      <Button
        className="drawer-button-primary"
        onClick={() => handleCopyText(address)}
        style={{ width: "100%", marginTop: "12px" }}
      >
        {copySuccess ? "Copied!" : "Copy Address"}
      </Button>
    </div>
  );
};
