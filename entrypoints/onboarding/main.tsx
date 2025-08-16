import ReactDOM from "react-dom/client";
import "../popup/style.css";
import { Providers } from "@/src/providers/Providers.tsx";
import { ConsoleOutput } from "@/src/dev/ConsoleOutput.tsx";
import { OnboardingFlow } from "@/src/flows/onboarding/OnboardingFlow";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Providers>
    <OnboardingFlow />
    {/* <ConsoleOutput /> */}
  </Providers>
);
