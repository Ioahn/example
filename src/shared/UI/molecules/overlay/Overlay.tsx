import { animated, useSpring, useTransition } from '@react-spring/web';
import { useRef } from 'react';
import {
  DismissButton,
  FocusScope,
  OverlayContainer,
  mergeProps,
  useOverlay,
  usePreventScroll,
} from 'react-aria';
import { cn } from '@shared/utils';
import { usePortal } from '@shared/providers';

type Props = {
  isOpen: boolean;
  close?: () => void;
};

export function Overlay({
  isOpen,
  close,
  className,
  children,
  ...rest
}: CommonProps<Props>) {
  const portalRef = usePortal();
  const ref = useRef(null);

  const { overlayProps, underlayProps } = useOverlay(
    {
      isOpen: isOpen,
      onClose: close,
      isDismissable: true,
    },
    ref
  );

  usePreventScroll({ isDisabled: !isOpen });

  const transitions = useTransition(isOpen, {
    from: { backgroundColor: 'rgb(0 0 0 / 0.0)' },
    enter: { backgroundColor: 'rgb(0 0 0 / 0.2)' },
    leave: { backgroundColor: 'rgb(0 0 0 / 0.0)' },
  });

  const [translate] = useSpring(
    () => ({
      from: {
        transform: 'translate3d(100%, 0, 0)',
      },
      to: {
        transform: isOpen ? 'translate3d(0%, 0, 0)' : 'translate3d(100%, 0, 0)',
      },
      delay: isOpen ? 200 : 0,
    }),
    [isOpen]
  );

  return transitions(
    (styles, item) =>
      item && (
        <OverlayContainer portalContainer={portalRef?.current as HTMLElement}>
          <animated.div
            className={cn('fixed inset-0 right-0 z-20', className)}
            {...underlayProps}
            style={styles}
          >
            <animated.div
              {...mergeProps(overlayProps, rest)}
              className='absolute mb-safe min-h-screen inset-x-0 top-0 bg-white max-md:w-full sm:w-1/2'
              style={translate}
              ref={ref}
            >
              <FocusScope autoFocus>
                {children}
                <DismissButton onDismiss={close} />
              </FocusScope>
            </animated.div>
          </animated.div>
        </OverlayContainer>
      )
  );
}
