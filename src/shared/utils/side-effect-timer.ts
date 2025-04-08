import { isSSR } from '@react-spring/shared';

const DELAY = 5000;

export const sideEffectTimer = (
  callBack: () => void,
  delay: number = DELAY
) => {
  if (!isSSR()) {
    setTimeout(callBack, delay);
  }
};
