import {
  AriaCheckboxGroupItemProps,
  AriaCheckboxProps,
  ToggleProps,
} from '@react-types/checkbox';
import { useContext, useRef } from 'react';
import { useCheckbox, useCheckboxGroupItem } from 'react-aria';
import { RiCheckLine } from 'react-icons/ri';
import { useToggleState } from 'react-stately';
import { cn, safe } from '@shared/utils';
import { KeyboardFocus } from '@shared/UI';
import { CheckboxContext } from './CheckboxContext';

const CheckboxItemGroup: FCC<AriaCheckboxGroupItemProps> = (props) => {
  const { children, className } = props;
  const state = safe(useContext(CheckboxContext));
  const ref = useRef(null);
  const { inputProps } = useCheckboxGroupItem(props, state, ref);

  const isDisabled = state.isDisabled || props.isDisabled;
  const isSelected = state.isSelected(props.value);

  return (
    <label
      aria-disabled={isDisabled}
      aria-selected={isSelected}
      className={`group relative flex items-start gap-3 ${
        isDisabled ? 'text-gray-500' : ''
      }`}
    >
      <div className='relative'>
        <span className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-aria-disabled:opacity-100 group-aria-selected:opacity-100'>
          <RiCheckLine className='cursor-pointer text-md text-white' />
        </span>
        <KeyboardFocus>
          <input {...inputProps} ref={ref} className={className} />
        </KeyboardFocus>
      </div>
      {children}
    </label>
  );
};

const CheckboxBase: FCC<ToggleProps & AriaCheckboxProps> = (props) => {
  const { children, className } = props;
  const state = useToggleState(props);
  const ref = useRef(null);
  const { inputProps, isSelected, isDisabled } = useCheckbox(props, state, ref);

  return (
    <label
      className={`group flex items-start gap-3 ${
        isDisabled ? 'text-gray-500' : ''
      }`}
      aria-selected={state.isSelected || isSelected}
      aria-disabled={isDisabled}
    >
      <div className='relative'>
        <div className='absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-aria-disabled:opacity-100 group-aria-selected:opacity-100'>
          <RiCheckLine className='cursor-pointer text-md text-white' />
        </div>
        <KeyboardFocus>
          <input {...inputProps} ref={ref} className={className} />
        </KeyboardFocus>
      </div>
      <div>{children}</div>
    </label>
  );
};

export const Checkbox: FCC<
  ToggleProps & AriaCheckboxProps & AriaCheckboxGroupItemProps
> = (props) => {
  const state = useContext(CheckboxContext);
  const { className } = props;

  const baseClassName = cn(
    'flex h-6 w-6 items-center justify-center',
    'appearance-none',
    'cursor-pointer',
    'transition-all',
    'rounded-md',
    'border border-solid outline-none border-border-primary bg-content-inverse',
    'checked:bg-bg-inverse-primary checked:border-bg-inverse-primary',
    'disabled:border-content-tertiary disabled:bg-content-tertiary',
    className
  );

  if (state) {
    return <CheckboxItemGroup {...props} className={baseClassName} />;
  }

  return <CheckboxBase {...props} className={baseClassName} />;
};
