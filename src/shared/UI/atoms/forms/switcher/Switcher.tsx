import { ToggleProps } from '@react-types/checkbox';
import { AriaSwitchProps } from '@react-types/switch';
import { useRef } from 'react';
import { useSwitch } from 'react-aria';
import { useToggleState } from 'react-stately';
import { KeyboardFocus } from '@shared/UI';

export const Switcher: FCC<ToggleProps & AriaSwitchProps> = (props) => {
  const state = useToggleState(props);
  const ref = useRef(null);
  const { inputProps, isSelected, isDisabled } = useSwitch(props, state, ref);
  const { children, className = '' } = props;

  return (
    <label
      className={`flex items-center gap-3 ${className} ${
        isDisabled ? 'text-content-tertiary' : ''
      }`}
    >
      <KeyboardFocus>
        <input
          {...inputProps}
          ref={ref}
          role='checkbox'
          aria-checked={isSelected}
          disabled={isDisabled}
          className={`relative h-5 w-8 cursor-pointer appearance-none rounded-[4rem] border border-solid border-border-primary bg-content-inverse outline-none transition-all before:absolute before:left-px before:top-px before:block before:h-4 before:w-4 before:rounded-full before:bg-border-primary before:transition-all before:content-[\'\'] checked:border-content-primary checked:before:left-auto checked:before:right-px checked:before:bg-content-primary checked:disabled:border-content-tertiary checked:disabled:before:bg-content-tertiary`}
        />
      </KeyboardFocus>
      {children}
    </label>
  );
};
