import { ReactElement, RefObject, useRef } from 'react';
import { AriaSelectProps, HiddenSelect, useSelect } from 'react-aria';
import { RiArrowDropDownFill } from 'react-icons/ri';
import { mergeRefs } from 'react-merge-refs';
import { useSelectState } from 'react-stately';
import useMeasure from 'react-use-measure';
import { cn } from '@shared/utils';
import { Button, Popover } from '@shared/UI';
import { ListBox } from './ListBox';

export const Select = <T extends AnyObject>(
  props: AriaSelectProps<T> &
    PropsWithClassNames & {
      variant?: TButtonProps['variant'];
      buttonClassName?: string;
      hasError?: boolean;
      buttonChildren?: ReactElement;
      menuWidth?: number;
    }
) => {
  const ref = useRef<HTMLButtonElement>(null);
  const state = useSelectState(props);
  const { labelProps, triggerProps, valueProps, menuProps, errorMessageProps } =
    useSelect({ 'aria-label': 'select', ...props }, state, ref);

  const [buttonRef, { width }] = useMeasure();

  const {
    isRequired,
    className,
    placeholder,
    variant = 'clear',
    buttonClassName,
    hasError,
    errorMessage,
    buttonChildren,
    menuWidth = width,
  } = props;

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {props.label && (
        <div
          {...labelProps}
          className='text-xs aria-required:after:ml-1 aria-required:after:text-content-accent-vivid aria-required:after:content-["*"]'
          aria-required={isRequired}
        >
          {props.label}
        </div>
      )}
      <HiddenSelect
        state={state}
        triggerRef={ref}
        label={props.label}
        name={props.name}
      />
      <Button
        {...triggerProps}
        className={cn(
          'disabled:bg-border-tertiary max-md:px-2',
          {
            ['border-content-accent-vivid']: hasError || errorMessage,
          },
          buttonClassName
        )}
        buttonRef={
          mergeRefs([ref, buttonRef]) as unknown as RefObject<HTMLButtonElement>
        }
        variant={variant}
        endIcon={
          <RiArrowDropDownFill
            className={cn(
              `text-md transition-transform duration-150 ease-in shrink-0`,
              state.isOpen && 'rotate-180'
            )}
          />
        }
      >
        {state.selectedItem ? (
          <span {...valueProps}>
            {buttonChildren || state.selectedItem.rendered}
          </span>
        ) : (
          placeholder && (
            <div className='font-normal text-content-tertiary'>
              {placeholder}
            </div>
          )
        )}
      </Button>
      {errorMessage && typeof errorMessage !== 'function' && (
        <div
          {...errorMessageProps}
          className='ml-2 text-xs text-content-accent-vivid'
        >
          {errorMessage}
        </div>
      )}
      <Popover state={state} triggerRef={ref} offset={10}>
        <ListBox {...menuProps} state={state} width={menuWidth} isVirtualized />
      </Popover>
    </div>
  );
};
