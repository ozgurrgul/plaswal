import { SupportedCoinOrTokenSymbol } from "@/src/library/coins/types";
import { SendFormData } from "./WalletDetailSendFlowHelper";
import { useSendMutation } from "@/src/library/coins/hooks/useSendMutation";

interface Props {
  coinSymbol: SupportedCoinOrTokenSymbol;
  formData: SendFormData;
  onSent: () => void;
}

export const WalletDetailSendPreviewStep: React.FC<Props> = ({
  coinSymbol,
  formData,
  onSent,
}) => {
  const {
    mutate: sendMutation,
    isPending,
    error,
  } = useSendMutation({
    coinSymbol,
    onSuccess: onSent,
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <p
          style={{
            margin: "0",
            fontSize: "0.9rem",
            color: "var(--text-secondary)",
          }}
        >
          Please confirm the details below
        </p>
      </div>

      <div
        style={{
          padding: "16px",
          backgroundColor: "var(--accent-bg)",
          borderRadius: "6px",
          border: "1px solid var(--border)",
        }}
      >
        <div style={{ marginBottom: "12px" }}>
          <div
            style={{
              fontSize: "0.8rem",
              color: "var(--text-secondary)",
              marginBottom: "4px",
            }}
          >
            To Address
          </div>
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "0.85rem",
              wordBreak: "break-all",
              color: "var(--text)",
            }}
          >
            {formData.recipientAddress}
          </div>
        </div>

        <div style={{ marginBottom: "12px" }}>
          <div
            style={{
              fontSize: "0.8rem",
              color: "var(--text-secondary)",
              marginBottom: "4px",
            }}
          >
            Amount
          </div>
          <div
            style={{
              fontSize: "1.2rem",
              fontWeight: "600",
              color: "var(--text)",
            }}
          >
            {formData.amount} {coinSymbol}
          </div>
        </div>
      </div>

      <button onClick={() => sendMutation(formData)} disabled={isPending}>
        {isPending ? "Sending..." : "Confirm and Send!"}
      </button>

      {error && (
        <div style={{ color: "var(--error)", marginTop: "16px" }}>
          {error.message}
        </div>
      )}
    </div>
  );
};
