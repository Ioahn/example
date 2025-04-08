import { useCallback, useState } from 'react';

export const useToggle = (
  initialState: boolean,
  callback: (newState?: boolean) => void = () => {}
): [boolean, () => void] => {
  const [isOn, setState] = useState(initialState);

  const toggle = useCallback(() => {
    const newState = !isOn;
    setState(newState);
    callback(newState);
  }, [isOn, setState, callback]);

  return [isOn, toggle];
};
