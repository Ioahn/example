import {
  AriaCheckboxGroupProps,
  CheckboxGroupProps,
} from '@react-types/checkbox';
import { useCheckboxGroup } from 'react-aria';
import { useCheckboxGroupState } from 'react-stately';
import { cn } from '@shared/utils';
import { CheckboxContext } from './CheckboxContext';
import { useResetKey } from './hooks';

export const CheckboxGroup: FCC<
  CheckboxGroupProps & AriaCheckboxGroupProps & { resetKey?: string }
> = (props) => {
  const {
    children,
    label,
    description,
    className,
    errorMessage,
    isRequired,
    resetKey,
  } = props;
  const state = useCheckboxGroupState(props);
  const {
    groupProps,
    labelProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
  } = useCheckboxGroup(props, state);

  useResetKey(state, resetKey);

  return (
    <div {...groupProps} className={cn('flex flex-col gap-2', className)}>
      {label && (
        <span
          {...labelProps}
          className='text-xs aria-required:after:ml-1 aria-required:after:text-content-accent-vivid aria-required:after:content-["*"]'
          aria-required={isRequired}
        >
          {label}
        </span>
      )}
      <CheckboxContext.Provider value={state}>
        {children}
      </CheckboxContext.Provider>
      {description && <div {...descriptionProps}>{description}</div>}
      {errorMessage && typeof errorMessage !== 'function' && isInvalid && (
        <div {...errorMessageProps}>{errorMessage}</div>
      )}
    </div>
  );
};
