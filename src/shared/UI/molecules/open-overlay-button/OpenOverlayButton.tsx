import { AriaToggleButtonProps } from '@react-types/button';
import { OverlayTriggerProps } from '@react-types/overlays';
import { ComponentProps, ReactNode, useCallback, useRef } from 'react';
import { useOverlayTrigger } from 'react-aria';
import { useOverlayTriggerState } from 'react-stately';
import { cn } from '@shared/utils';
import { Dot, Overlay, ToggleButton } from '@shared/UI';

type Props = AriaToggleButtonProps & {
  onOpen?: () => void;
  modalRender: (close: () => void) => ReactNode;
  withDot?: boolean;
  stateProps?: OverlayTriggerProps;
} & Pick<ComponentProps<typeof ToggleButton>, 'startIcon' | 'variant'>;

export const OpenOverlayButton: FCC<Props> = ({
  onOpen,
  modalRender,
  children,
  withDot = true,
  startIcon,
  stateProps = {},
  ...buttonProps
}) => {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const state = useOverlayTriggerState(stateProps);
  const { triggerProps, overlayProps } = useOverlayTrigger(
    { type: 'dialog' },
    state,
    triggerRef
  );

  const onPress = useCallback(() => {
    onOpen?.();

    state.open();
  }, [onOpen, state]);
  return (
    <>
      <ToggleButton
        {...triggerProps}
        variant='tertiary'
        size='icon'
        startIcon={startIcon}
        endIcon={withDot && <Dot />}
        buttonRef={triggerRef}
        onPress={onPress}
        {...buttonProps}
        className={cn(
          'relative enabled:bg-bg-secondary',
          buttonProps.className
        )}
      >
        {children}
      </ToggleButton>
      <Overlay {...overlayProps} isOpen={state.isOpen} close={state.close}>
        {modalRender(state.close)}
      </Overlay>
    </>
  );
};
