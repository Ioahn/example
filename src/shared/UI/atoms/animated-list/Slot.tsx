import { ListState } from '@react-stately/list';
import { ForwardedRef, forwardRef } from 'react';
import { useObjectRef, useOption } from 'react-aria';
import { Node } from 'react-stately';

type Props<T> = PropsWithClassNames & {
  item: Node<T>;
  state: ListState<T>;
};

export const Slot = forwardRef(function Slot<T>(
  { item, state }: Props<T>,
  forwardRef: ForwardedRef<HTMLLIElement>
) {
  const ref = useObjectRef(forwardRef);
  const { optionProps } = useOption({ key: item.key }, state, ref);

  return (
    <li {...optionProps} className='outline-none cursor-pointer' ref={ref}>
      {item.rendered}
    </li>
  );
});
