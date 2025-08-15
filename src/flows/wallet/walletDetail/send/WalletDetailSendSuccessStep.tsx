import Lottie from "react-lottie";
import lottieSendAnimation from "../../../../../assets/lottie/lottieSendAnimation.json";
import { SendFormData } from "./WalletDetailSendFlowHelper";
import { SupportedCoinOrTokenSymbol } from "@/src/library/coins/types";
import { useCoinOrToken } from "@/src/library/coins/hooks/useCoinOrToken";

interface Props {
  formData: SendFormData;
  coinSymbol: SupportedCoinOrTokenSymbol;
  txHash: string;
  onSendAnotherTransaction: () => void;
}

export const WalletDetailSendSuccessStep: React.FC<Props> = ({
  formData,
  coinSymbol,
  txHash,
  onSendAnotherTransaction,
}) => {
  const coinOrToken = useCoinOrToken(coinSymbol);
  const [showTransactionDetails, setShowTransactionDetails] = useState(false);

  if (!showTransactionDetails) {
    return (
      <Lottie
        height={200}
        options={{
          animationData: lottieSendAnimation,
          loop: false,
          autoplay: true,
        }}
        eventListeners={[
          {
            eventName: "complete",
            callback: () => {
              setShowTransactionDetails(true);
            },
          },
        ]}
      />
    );
  }

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          textAlign: "center",
        }}
      >
        <div>
          <h3>Transaction Sent!</h3>
          <p
            style={{
              margin: "0",
              fontSize: "0.9rem",
              color: "var(--text-secondary)",
            }}
          >
            Your transaction has been submitted successfully
          </p>
        </div>

        <div
          style={{
            padding: "12px",
            backgroundColor: "var(--accent-bg)",
            borderRadius: "6px",
            border: "1px solid var(--border)",
          }}
        >
          <div style={{ fontSize: "0.9rem", color: "var(--text)" }}>
            Sent {formData.amount} {coinSymbol}
          </div>
          <div
            style={{
              fontSize: "0.8rem",
              color: "var(--text-secondary)",
              fontFamily: "monospace",
              wordBreak: "break-all",
              marginTop: "4px",
            }}
          >
            to {formData.recipientAddress}
          </div>
        </div>

        <div>
          <a
            href={`${coinOrToken?.metadata.explorerUrl}/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {txHash}
          </a>
        </div>

        <button onClick={onSendAnotherTransaction}>
          Send Another Transaction
        </button>
      </div>
    </div>
  );
};
