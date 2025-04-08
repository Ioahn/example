import { useIsomorphicLayoutEffect } from '@react-spring/web';
import { CheckboxGroupState } from '@react-stately/checkbox';
import { usePrevious } from 'react-use';

export const useResetKey = (state: CheckboxGroupState, resetKey?: string) => {
  const previous = usePrevious(Boolean(resetKey && state.isSelected(resetKey)));

  useIsomorphicLayoutEffect(() => {
    if (!resetKey) {
      return;
    }

    if (state.isSelected(resetKey) && !previous) {
      state.setValue([resetKey]);

      return;
    }

    if (state.value.length > 1 && previous) {
      state.removeValue(resetKey);

      return;
    }

    if (state.value.length === 0) {
      state.setValue([resetKey]);

      return;
    }
  }, [state, resetKey, previous]);
};
