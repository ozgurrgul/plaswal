import { useRef, useEffect, useState } from "react";

interface Props<T extends string> {
  step: T;
  steps: Record<T, React.ReactNode>;
  setStep: (step: T) => void;
}

export const Stepper = <T extends string>({
  step,
  steps,
  setStep,
}: Props<T>) => {
  const stepHistory = useRef<T[]>([]);
  const [canGoBack, setCanGoBack] = useState(false);

  const handleBack = () => {
    stepHistory.current.pop(); //remove current step from history
    const previousStep = stepHistory.current[stepHistory.current.length - 1];

    if (previousStep) {
      setStep(previousStep);
    }

    setCanGoBack(stepHistory.current.length > 1);
  };

  useEffect(() => {
    // prevents duplicate history entries
    const lastStep = stepHistory.current[stepHistory.current.length - 1];
    if (lastStep !== step) {
      stepHistory.current.push(step as T);
    }

    setCanGoBack(stepHistory.current.length > 1);
  }, [step]);

  return (
    <div>
      <button onClick={handleBack} disabled={!canGoBack}>
        back
      </button>
      <div>{steps[step]}</div>
    </div>
  );
};
