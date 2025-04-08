import { CalendarDateTime, Time, ZonedDateTime } from '@internationalized/date';
import { useRef } from 'react';
import {
  AriaTimeFieldProps,
  useDateSegment,
  useLocale,
  useTimeField,
} from 'react-aria';
import {
  DateFieldState,
  DateSegment as TDateSegment,
  useTimeFieldState,
} from 'react-stately';
import { cn } from '@shared/utils';

export const TimeField = (
  props: AriaTimeFieldProps<Time | CalendarDateTime | ZonedDateTime> & {
    segmentClassName?: string;
  }
) => {
  const { locale } = useLocale();
  const state = useTimeFieldState({
    ...props,
    locale,
  });

  const ref = useRef(null);
  const { labelProps, fieldProps } = useTimeField(props, state, ref);
  return (
    <div>
      {props.label && <span {...labelProps}>{props.label}</span>}
      <div {...fieldProps} ref={ref} className='flex'>
        {state.segments.slice(0, 3).map((segment, i) => (
          <DateSegment
            key={i}
            segment={segment}
            state={state}
            className={props.segmentClassName}
          />
        ))}
      </div>
    </div>
  );
};

const DateSegment = ({
  segment,
  state,
  className,
}: {
  state: DateFieldState;
  segment: TDateSegment;
  className?: string;
}) => {
  const ref = useRef(null);
  const { segmentProps } = useDateSegment(segment, state, ref);

  const segmentText =
    segment.type === 'hour' ? segment.text.padStart(2, '0') : segment.text;

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
      {segmentText}
    </span>
  );
};
