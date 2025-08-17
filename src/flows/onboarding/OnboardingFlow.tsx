import { useState } from "react";
import { CreateNewWalletScreen } from "./CreateNewWalletScreen";
import { ImportWalletScreen } from "./ImportWalletScreen";
import { Stepper } from "@/src/ui/components/Stepper";
import { CreateOrImportWalletScreen } from "./CreateOrImportWalletScreen";
import { CreateNewWalletSuccessScreen } from "./CreateNewWalletSuccessScreen";
import { ImportWalletSuccessScreen } from "./ImportWalletSuccessScreen";

type Step =
  | "create-or-import-wallet"
  | "create-wallet"
  | "create-wallet-success"
  | "import-wallet"
  | "import-wallet-success";

export const OnboardingFlow = () => {
  const [step, setStep] = useState<Step>("create-or-import-wallet");

  return (
    <div style={{ color: "white" }}>
      <Stepper
        step={step}
        setStep={setStep}
        steps={{
          "create-or-import-wallet": (
            <CreateOrImportWalletScreen
              onCreateClick={() => setStep("create-wallet")}
              onImportClick={() => setStep("import-wallet")}
            />
          ),
          "create-wallet": (
            <CreateNewWalletScreen
              onContinueClick={() => setStep("create-wallet-success")}
            />
          ),
          "create-wallet-success": (
            <CreateNewWalletSuccessScreen
              onContinueClick={() => window.close()}
            />
          ),
          "import-wallet": (
            <ImportWalletScreen
              onContinueClick={() => setStep("import-wallet-success")}
            />
          ),
          "import-wallet-success": (
            <ImportWalletSuccessScreen onContinueClick={() => window.close()} />
          ),
        }}
      />
    </div>
  );
};
