import { AriaToggleButtonProps } from '@react-types/button';
import { RefObject, useRef } from 'react';
import { useToggleButton } from 'react-aria';
import { mergeRefs } from 'react-merge-refs';
import { useToggleState } from 'react-stately';
import { cn } from '@shared/utils';
import { KeyboardFocus } from '@shared/UI';
import { useButtonStyles } from './useButtonStyles';

export const ToggleButton: FCC<AriaToggleButtonProps & TButtonProps> = (
  props
) => {
  const ref = useRef(null);
  const state = useToggleState(props);
  const { buttonProps } = useToggleButton(props, state, ref);

  const buttonStyles = useButtonStyles(props);
  const { className, startIcon, children, endIcon } = props;

  return (
    <KeyboardFocus>
      <button
        {...buttonProps}
        ref={mergeRefs([ref, props.buttonRef as RefObject<HTMLButtonElement>])}
        className={cn(buttonStyles, className)}
      >
        {startIcon}
        {children}
        {endIcon}
      </button>
    </KeyboardFocus>
  );
};
