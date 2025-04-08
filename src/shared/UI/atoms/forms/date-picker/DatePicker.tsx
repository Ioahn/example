import { useEffect, useRef } from 'react';
import { DateValue, useDatePicker } from 'react-aria';
import { RiCalendar2Line } from 'react-icons/ri';
import { DatePickerStateOptions, useDatePickerState } from 'react-stately';
import { TAreaType } from '@shared/api';
import { cn } from '@shared/utils';
import { Button, DateField, Popover } from '@shared/UI';
import { Calendar } from '@shared/UI';

type Props = DatePickerStateOptions<DateValue> & {
  area?: TAreaType;
  onValidationChange?: (isInvalid: boolean) => void;
};

export const DatePicker: FCC<Props> = ({
  onValidationChange,
  area,
  ...props
}) => {
  const state = useDatePickerState(props);
  const ref = useRef(null);
  const { groupProps, labelProps, fieldProps, buttonProps, calendarProps } =
    useDatePicker(props, state, ref);

  useEffect(() => {
    onValidationChange?.(state.isInvalid);
  }, [onValidationChange, state.isInvalid]);

  return (
    <div>
      <div {...labelProps}>{props.label}</div>
      <div
        {...groupProps}
        ref={ref}
        className='flex gap-3 items-center rounded-md p-1 pl-2'
      >
        <DateField
          {...fieldProps}
          segmentClassName={cn(
            'text-content-inverse focus:bg-content-inverse focus:text-content-primary'
          )}
        />
        <Button
          {...buttonProps}
          variant='secondary'
          size='icon'
          className='p-2 rounded-md'
          startIcon={<RiCalendar2Line className='text-md' />}
        />
      </div>
      <Popover state={state} triggerRef={ref} offset={4}>
        <Calendar {...calendarProps} area={area} />
      </Popover>
    </div>
  );
};
