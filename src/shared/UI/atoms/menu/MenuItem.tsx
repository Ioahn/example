import { useRef } from 'react';
import { useMenuItem } from 'react-aria';
import { Node, TreeState } from 'react-stately';
import { cn } from '@shared/utils';

type Props = {
  item: Node<unknown>;
  state: TreeState<unknown>;
};

export const MenuItem = ({ item, state }: Props) => {
  const ref = useRef(null);
  const { menuItemProps, isFocused, isSelected } = useMenuItem(
    { key: item.key },
    state,
    ref
  );

  return (
    <li
      {...menuItemProps}
      ref={ref}
      className={cn(
        'group cursor-pointer rounded-lg px-2 py-3 outline-none hover:bg-bg-primary'
      )}
      data-selected={isSelected || isFocused}
    >
      {item.rendered}
    </li>
  );
};
