import { AriaRadioGroupProps, RadioGroupProps } from '@react-types/radio';
import { useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';
import { cn } from '@shared/utils';
import { RadioContext } from './RadioContext';

export const RadioGroup: FCC<RadioGroupProps & AriaRadioGroupProps> = (
  props
) => {
  const { children, label, description, errorMessage, isRequired, className } =
    props;
  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps, descriptionProps, errorMessageProps } =
    useRadioGroup(props, state);

  return (
    <div {...radioGroupProps} className={cn('flex flex-col gap-2', className)}>
      {label && (
        <span
          {...labelProps}
          className='text-xs aria-required:after:ml-1 aria-required:after:text-content-accent-vivid aria-required:after:content-["*"]'
          aria-required={isRequired}
        >
          {label}
        </span>
      )}
      <div className='flex flex-col gap-2'>
        <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
      </div>
      {description && <div {...descriptionProps}>{description}</div>}
      {errorMessage && typeof errorMessage !== 'function' && (
        <div
          className='ml-2 text-xs text-content-accent-vivid'
          {...errorMessageProps}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};
