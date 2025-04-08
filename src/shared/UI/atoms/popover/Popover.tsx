import {
  animated,
  useIsomorphicLayoutEffect,
  useTransition,
} from '@react-spring/web';
import { ReactNode, useRef } from 'react';
import {
  AriaPopoverProps,
  DismissButton,
  FocusScope,
  Overlay,
  usePopover,
} from 'react-aria';
import { OverlayTriggerState } from 'react-stately';
import { useUnmount } from 'react-use';
import { cn, setDirection } from '@shared/utils';
import { usePortal } from '@shared/providers';
import { PositioningArrow } from '@shared/UI';

interface PopoverProps extends Omit<AriaPopoverProps, 'popoverRef'> {
  children: ReactNode;
  state: OverlayTriggerState;
  withArrow?: boolean;
}

export const Popover: FCC<PopoverProps> = ({
  children,
  state,
  offset = 0,
  withArrow = false,
  className,
  ...props
}) => {
  const portalRef = usePortal();
  const popoverRef = useRef(null);
  const { popoverProps, underlayProps, arrowProps, placement } = usePopover(
    {
      isNonModal: !state.isOpen,
      ...props,
      offset,
      popoverRef,
    },
    state
  );

  // TODO обработать для всех значений placement
  const [transitions, api] = useTransition(state.isOpen, () => ({
    ...setDirection(props.placement),
  }));

  useIsomorphicLayoutEffect(() => {
    api.start();
  }, [state.isOpen]);

  useUnmount(() => {
    api.stop();
  });

  return transitions(
    (style, item) =>
      item && (
        <Overlay portalContainer={portalRef?.current as Element}>
          <div {...underlayProps} className='fixed inset-0' />
          {withArrow && (
            <PositioningArrow {...arrowProps} placement={placement} />
          )}
          <animated.div
            ref={popoverRef}
            {...popoverProps}
            style={{ ...style, ...popoverProps.style }}
            className={cn(
              'w-max overflow-hidden overflow-y-scroll rounded-xl bg-white shadow-popover hide-scrollbar',
              className
            )}
          >
            <FocusScope restoreFocus={state.isOpen} contain>
              <DismissButton onDismiss={state.close} />
              {children}
            </FocusScope>
          </animated.div>
        </Overlay>
      )
  );
};
