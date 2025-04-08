import { AriaRadioProps } from '@react-types/radio';
import { useContext, useRef } from 'react';
import { useRadio } from 'react-aria';
import { cn, safe } from '@shared/utils';
import { KeyboardFocus } from '@shared/UI';
import { RadioContext } from './RadioContext';

export const RadioButton: FCC<AriaRadioProps & { hasError?: boolean }> = (
  props
) => {
  const state = useContext(RadioContext);
  const ref = useRef(null);
  const { children, className = '', hasError } = props;
  const { inputProps, isDisabled } = useRadio(props, safe(state), ref);

  return (
    <label
      className={cn(
        `inline-flex items-center gap-3`,
        isDisabled ? 'text-content-tertiary' : 'text-black',
        className
      )}
    >
      <KeyboardFocus>
        <input
          {...inputProps}
          ref={ref}
          className={cn(
            `flex h-6 w-6 cursor-pointer appearance-none items-center justify-center rounded-full border border-solid border-border-primary bg-content-inverse text-inherit outline-none transition-all before:block before:h-3 before:w-3 before:rounded-full before:bg-transparent before:transition-all before:content-[''] checked:border-bg-inverse-primary checked:bg-bg-inverse-primary checked:before:bg-content-inverse disabled:text-content-tertiary checked:disabled:border-content-tertiary checked:disabled:bg-content-tertiary`,
            { ['border-content-accent-vivid']: hasError }
          )}
        />
      </KeyboardFocus>
      <span className='flex-shrink-0'>{children}</span>
    </label>
  );
};
