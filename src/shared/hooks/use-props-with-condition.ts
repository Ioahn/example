import { useMemo } from 'react';

const usePropsWithCondition = <T extends AnyObject>(
  props: T,
  cond: boolean
) => {
  return useMemo(() => {
    if (!cond) {
      return {} as T;
    }

    return props;
  }, [cond, props]);
};
