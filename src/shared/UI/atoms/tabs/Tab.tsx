import { TabListState } from '@react-stately/tabs';
import { Node } from '@react-types/shared/src/collections';
import { useRef } from 'react';
import { Orientation, useTab } from 'react-aria';
import { cn } from '@shared/utils';
import { KeyboardFocus } from '@shared/UI';

type Props<T> = PropsWithClassNames & {
  item: Node<T>;
  state: TabListState<T>;
  orientation?: Orientation;
};

export const Tab = <T,>({ item, state, className }: Props<T>) => {
  const { key, rendered } = item;
  const ref = useRef(null);
  const { tabProps } = useTab({ key }, state, ref);

  return (
    <KeyboardFocus>
      <div
        {...tabProps}
        ref={ref}
        className={cn('cursor-pointer transition-all outline-none', className)}
      >
        {rendered}
      </div>
    </KeyboardFocus>
  );
};
