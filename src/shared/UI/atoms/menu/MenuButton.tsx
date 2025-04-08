import { ComponentProps, ReactNode, useRef } from 'react';
import {
  AriaMenuProps,
  Placement,
  mergeProps,
  useMenuTrigger,
} from 'react-aria';
import type { MenuTriggerProps } from 'react-stately';
import { useMenuTriggerState } from 'react-stately';
import { Button, Popover } from '@shared/UI';
import { Menu } from './Menu';

type MenuButtonProps<T> = AriaMenuProps<T> &
  MenuTriggerProps & {
    label?: string | ReactNode;
    buttonProps?: ComponentProps<typeof Button>;
    className?: string;
    placement?: Placement;
    offset?: number;
  };

export const MenuButton = <T extends AnyObject>(props: MenuButtonProps<T>) => {
  const state = useMenuTriggerState(props);
  const ref = useRef(null);
  const { menuTriggerProps, menuProps } = useMenuTrigger<T>({}, state, ref);
  const {
    buttonProps,
    className,
    placement = 'bottom start',
    offset = 4,
  } = props;

  return (
    <div className={className}>
      <Button
        variant='clear'
        buttonRef={ref}
        aria-pressed={state.isOpen}
        {...mergeProps(menuTriggerProps, buttonProps)}
      >
        {props.label}
      </Button>
      <Popover
        state={state}
        triggerRef={ref}
        offset={offset}
        placement={placement}
      >
        <Menu {...mergeProps(props, menuProps)} />
      </Popover>
    </div>
  );
};
