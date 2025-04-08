import { ListState } from '@react-stately/list';
import { Node } from '@react-types/shared/src/collections';
import { useRef } from 'react';
import { useOption } from 'react-aria';
import { cn } from '@shared/utils';

export const ListOption = <T extends AnyObject>({
  item,
  state,
  className,
}: {
  state: ListState<T>;
  item: Node<T>;
  className?: string;
}) => {
  const ref = useRef(null);
  const { optionProps } = useOption({ key: item.key }, state, ref);

  return (
    <li
      {...optionProps}
      ref={ref}
      className={cn('outline-none rounded-3xl', className)}
    >
      {item.rendered}
    </li>
  );
};
