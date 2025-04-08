import { ChangeEvent, ReactNode, RefObject, forwardRef, useRef } from 'react';
import { AriaTextFieldProps, useTextField } from 'react-aria';
import { RiErrorWarningLine } from 'react-icons/ri';
import { mergeRefs } from 'react-merge-refs';
import { cn } from '@shared/utils';
import { KeyboardFocus, TooltipTrigger } from '@shared/UI';

type Props = AriaTextFieldProps & {
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
  allowEmoji?: boolean;
};

export const TextArea = forwardRef<HTMLTextAreaElement, ForwardProps<Props>>(
  (props, forwardRef) => {
    const ref = useRef<HTMLTextAreaElement>(null);

    const mergedRef = mergeRefs([ref, forwardRef]);
    const { inputProps, labelProps, errorMessageProps, descriptionProps } =
      useTextField(
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        { ...props, inputElementType: 'textarea' },
        mergedRef as unknown as RefObject<HTMLTextAreaElement>
      );

    const {
      label,
      errorMessage,
      description,
      className,
      startIcon,
      endIcon,
      startElement,
      inputClassName,
      hasError = !!errorMessage,
      fullWidth = false,
      tooltip,
      isRequired,
      maxLength,
      allowEmoji = false,
    } = props;

    const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
      if (!allowEmoji) {
        event.target.value = event.target.value.replace(
          /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g,
          ''
        );
      }

      inputProps.onChange?.(event);
    };

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
        <KeyboardFocus isTextInput within>
          <div
            className={cn(
              `flex min-h-[4.375rem] w-full items-center gap-5 rounded-2xl border px-4 md:px-6 py-4 text-content-tertiary caret-content-accent-vivid outline-none transition-all`,
              {
                ['border-content-accent-vivid']: hasError,
                ['bg-border-tertiary']: inputProps.disabled,
              }
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
            <textarea
              {...inputProps}
              onChange={handleChange}
              ref={mergedRef}
              className={cn(
                'min-h-[120px] min-w-0 flex-1 border-none bg-transparent text-content-primary outline-none',
                inputClassName
              )}
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
        </KeyboardFocus>
        {maxLength && (
          <div className='ml-2 text-xs'>
            {(inputProps.value as string).length}/{maxLength}
          </div>
        )}
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
      </div>
    );
  }
);
