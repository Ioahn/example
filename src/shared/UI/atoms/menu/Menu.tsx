import { useRef } from 'react';
import type { AriaMenuProps } from 'react-aria';
import { useMenu } from 'react-aria';
import { useTreeState } from 'react-stately';
import { MenuSection } from '@shared/UI';
import { MenuItem } from './MenuItem';

export const Menu = <T extends AnyObject>(props: AriaMenuProps<T>) => {
  const state = useTreeState(props);
  const ref = useRef(null);
  const { menuProps } = useMenu(props, state, ref);

  return (
    <ul
      {...menuProps}
      ref={ref}
      className='p-2 flex list-none flex-col gap-1 focus-visible:outline-none'
    >
      {[...state.collection].map((item) =>
        item.type === 'section' ? (
          <MenuSection key={item.key} section={item} state={state} />
        ) : (
          <MenuItem key={item.key} item={item} state={state} />
        )
      )}
    </ul>
  );
};
