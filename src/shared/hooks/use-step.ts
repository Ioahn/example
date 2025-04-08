import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';

type TUseState = (
  components: MaybeFunctions<ReactElement>[],
  controlledStep?: string | number,
  option?: {
    onChange: (step: number) => void;
  }
) => {
  component: ReactElement;
  nextStep: () => void;
  prevStep: () => void;
};
export const useStep: TUseState = (components, controlledStep = 0, option) => {
  const [step, setStep] = useState(+controlledStep);

  const nextStep = useCallback(
    () => setStep(step + 1 > components.length - 1 ? step : step + 1),
    [step, components.length]
  );

  const prevStep = useCallback(
    () => setStep(step - 1 >= 0 ? step - 1 : step),
    [step, setStep]
  );

  const actualComponent = useMemo(() => {
    if (typeof components[step] === 'function') {
      return (components[step] as (...args: (() => void)[]) => ReactElement)(
        nextStep,
        prevStep
      );
    }

    return components[step];
  }, [components, nextStep, prevStep, step]);

  useEffect(() => {
    option?.onChange?.(step);
  }, [option, step]);

  useEffect(() => {
    setStep(+controlledStep);
  }, [setStep, controlledStep]);

  return {
    component: actualComponent as ReactElement,
    nextStep,
    prevStep,
  };
};
