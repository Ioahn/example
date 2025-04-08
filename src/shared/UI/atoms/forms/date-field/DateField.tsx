import { createCalendar, parseDate } from '@internationalized/date';
import { DateSegment as TDateSegment } from '@react-stately/datepicker';
import { useRef } from 'react';
import {
  AriaDateFieldProps,
  DateValue,
  useDateField,
  useDateSegment,
  useLocale,
} from 'react-aria';
import { DateFieldState, useDateFieldState } from 'react-stately';
import { cn } from '@shared/utils';

type Props = AriaDateFieldProps<DateValue> & {
  value?: DateValue | string | null;
  segmentClassName?: string;
};

export const DateField: FCC<Props> = (props) => {
  const { locale } = useLocale();

  const { value, ...rest } = props;
  const dateValue =
    typeof value === 'string' && value ? parseDate(value) : value;

  const state = useDateFieldState({
    locale,
    createCalendar,
    value: dateValue,
    ...rest,
  });

  const ref = useRef(null);
  const { labelProps, fieldProps } = useDateField(props, state, ref);

  const data = state.segments.slice(0, 5);
  const time = state.segments.slice(6, state.segments.length);

  return (
    <div>
      <span {...labelProps}>{props.label}</span>
      <div {...fieldProps} ref={ref} className='flex flex-col items-center'>
        <div className='flex flex-nowrap'>
          {data.map((segment, i) => (
            <DateSegment
              key={i}
              segment={segment}
              state={state}
              className={props.segmentClassName}
            />
          ))}
        </div>
        {!!time.length && (
          <div className='flex flex-nowrap'>
            {time.map((segment, i) => (
              <DateSegment
                key={i}
                segment={segment}
                state={state}
                className={props.segmentClassName}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const DateSegment: FCC<{
  state: DateFieldState;
  segment: TDateSegment;
}> = ({ segment, state, className }) => {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <span
      {...segmentProps}
      ref={ref}
      className={cn(
        'relative rounded-md outline-none focus:bg-content-primary focus:text-content-inverse',
        {
          ['text-content-tertiary px-[2px]']: segment.isEditable,
        },
        className
      )}
    >
      {segment.text}
    </span>
  );
};
