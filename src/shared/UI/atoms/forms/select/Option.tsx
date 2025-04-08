import { ListState } from '@react-stately/list';
import { useRef } from 'react';
import { useOption } from 'react-aria';
import { Node } from 'react-stately';
import { cn } from '@shared/utils';

type Props = {
  item: Node<unknown>;
  state: ListState<unknown>;
};

export const Option = ({ item, state }: Props) => {
  const ref = useRef(null);
  const { optionProps, isSelected, isFocused } = useOption(
    { key: item.key },
    state,
    ref
  );

  return (
    <li
      {...optionProps}
      ref={ref}
      className={cn('cursor-pointer rounded-lg px-4 py-3 outline-none', {
        ['bg-bg-primary']: isSelected,
        ['bg-bg-primary/50']: isFocused,
      })}
    >
      {item.rendered}
    </li>
  );
};
