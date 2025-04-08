import { ReactNode, RefObject, forwardRef, useRef } from 'react';
import {
  AriaTextFieldProps,
  mergeProps,
  useFocusRing,
  useTextField,
} from 'react-aria';
import { RiErrorWarningLine } from 'react-icons/ri';
import { mergeRefs } from 'react-merge-refs';
import { cn } from '@shared/utils';
import { TooltipTrigger } from '@shared/UI';

type Props = AriaTextFieldProps & {
  variant?: 'primary' | 'secondary';
  startIcon?: ReactNode;
  startElement?: ReactNode;
  endIcon?: ReactNode;
  fullWidth?: boolean;
  hasError?: boolean;
  tooltip?: {
    message: string;
    position: 'start' | 'end';
  };
  inputClassName?: string;
  inputContainerClassName?: string;
  successMessage?: ReactNode;
};

const useInputStyle = ({
  variant = 'primary',
  inputClassName,
}: Pick<Props, 'variant' | 'inputClassName'>) => {
  const inputStyle = cn(
    'min-w-0 flex-1 border-none bg-transparent outline-none text-content-primary',
    {
      ['h-full']: variant === 'secondary',
    },
    inputClassName
  );

  const labelStyle = cn(
    'text-xs aria-required:after:ml-1 aria-required:after:text-content-accent-vivid aria-required:after:content-["*"]'
  );
  const inputFieldStyle = cn(
    'text-content-tertiary caret-content-accent-vivid items-center flex outline-none w-full transition-all',
    {
      ['rounded-2xl px-4 md:px-6 gap-5 border min-h-[4.375rem]']:
        variant === 'primary',
      ['border-b py-2']: variant === 'secondary',
    }
  );

  return { inputStyle, labelStyle, inputFieldStyle };
};

export const TextField = forwardRef<HTMLInputElement, ForwardProps<Props>>(
  (props, forwardRef) => {
    const ref = useRef<HTMLInputElement>(null);

    const mergedRef = mergeRefs([ref, forwardRef]);
    const { inputProps, labelProps, errorMessageProps, descriptionProps } =
      useTextField(props, mergedRef as unknown as RefObject<HTMLInputElement>);
    const { inputFieldStyle, inputStyle } = useInputStyle(props);

    const { focusProps, isFocused } = useFocusRing();

    const {
      label,
      errorMessage,
      description,
      className,
      startIcon,
      endIcon,
      startElement,
      inputClassName,
      inputContainerClassName,
      hasError = !!errorMessage,
      fullWidth = false,
      tooltip,
      isRequired,
      successMessage,
    } = props;

    return (
      <div
        className={cn(
          'relative flex flex-col gap-2',
          { ['w-full']: fullWidth },
          className
        )}
      >
        {label && (
          <label
            {...labelProps}
            className='text-xs aria-required:after:ml-1 aria-required:after:text-content-accent-vivid aria-required:after:content-["*"]'
            aria-required={isRequired}
          >
            {label}
          </label>
        )}
        <div
          className={cn(
            inputFieldStyle,
            {
              ['border-content-accent-vivid']: hasError,
              ['bg-border-tertiary']: inputProps.disabled,
              ['outline-offset-4 outline-content-tertiary/50']: isFocused,
            },
            inputContainerClassName
          )}
          role='textbox'
          tabIndex={!inputProps.disabled ? 0 : undefined}
          aria-disabled={inputProps.disabled}
        >
          {tooltip && tooltip.position === 'start' && (
            <TooltipTrigger
              triggerElement={
                <RiErrorWarningLine
                  className={hasError ? 'text-content-accent-vivid' : ''}
                />
              }
            >
              <div className='rounded bg-content-inverse px-1 py-0.5 shadow-popover'>
                {tooltip.message}
              </div>
            </TooltipTrigger>
          )}
          {startElement}
          {startIcon}
          <input
            {...mergeProps(focusProps, inputProps)}
            ref={mergedRef}
            className={cn(inputStyle, inputClassName)}
          />
          {endIcon}
          {tooltip && tooltip.position === 'end' && (
            <TooltipTrigger
              triggerElement={
                <RiErrorWarningLine
                  className={hasError ? 'text-content-accent-vivid' : ''}
                />
              }
            >
              <div className='rounded bg-content-inverse px-1 py-0.5 shadow-popover'>
                {tooltip.message}
              </div>
            </TooltipTrigger>
          )}
        </div>
        {description && !errorMessage && (
          <div {...descriptionProps} className='ml-2 text-xs'>
            {description}
          </div>
        )}
        {errorMessage && typeof errorMessage !== 'function' && (
          <div
            {...errorMessageProps}
            className='ml-2 text-xs text-content-accent-vivid'
          >
            {errorMessage}
          </div>
        )}
        {successMessage}
      </div>
    );
  }
);
