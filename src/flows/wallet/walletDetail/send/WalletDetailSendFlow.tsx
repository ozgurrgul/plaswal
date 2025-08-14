import { useState } from "react";
import { Stepper } from "@/src/ui/components/Stepper";
import { WalletDetailSendInputStep } from "./WalletDetailSendInputStep";
import { SupportedCoinOrTokenSymbol } from "@/src/library/coins/types";
import { WalletDetailSendPreviewStep } from "./WalletDetailSendPreviewStep";
import { WalletDetailSendSuccessStep } from "./WalletDetailSendSuccessStep";
import { useSendMutation } from "@/src/library/coins/hooks/useSendMutation";

interface Props {
  balance: string;
  coinSymbol: SupportedCoinOrTokenSymbol;
}

type SendStep = "input" | "preview" | "success";

interface SendFormData {
  recipientAddress: string;
  amount: string;
}

export const WalletDetailSendFlow: React.FC<Props> = ({
  balance,
  coinSymbol,
}) => {
  const [step, setStep] = useState<SendStep>("input");
  const [formData, setFormData] = useState<SendFormData>({
    recipientAddress: "",
    amount: "",
  });

  const resetForm = () => {
    setFormData({
      recipientAddress: "",
      amount: "",
    });
    setStep("input");
  };

  const handleContinueToPreview = (data: SendFormData) => {
    setFormData(data);
    setStep("preview");
  };

  const steps: Record<SendStep, React.ReactNode> = {
    input: (
      <WalletDetailSendInputStep
        balance={balance}
        coinSymbol={coinSymbol}
        onContinue={handleContinueToPreview}
      />
    ),
    preview: (
      <WalletDetailSendPreviewStep
        coinSymbol={coinSymbol}
        formData={formData}
        onSent={() => setStep("success")}
      />
    ),

    success: (
      <WalletDetailSendSuccessStep
        formData={formData}
        coinSymbol={coinSymbol}
        onSendAnotherTransaction={resetForm}
      />
    ),
  };

  return (
    <div style={{ padding: "16px" }}>
      <Stepper
        step={step}
        steps={steps}
        setStep={setStep}
        hideBackButton={step === "success" || step === "input"}
      />
    </div>
  );
};
