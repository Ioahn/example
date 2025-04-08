import { useRef } from 'react';
import { AriaCalendarCellProps, useCalendarCell } from 'react-aria';
import { CalendarState, RangeCalendarState } from 'react-stately';
import { cn } from '@shared/utils';

type Props = AriaCalendarCellProps & {
  state: CalendarState | RangeCalendarState;
};
export const CalendarCell: FCC<Props> = ({ state, ...props }) => {
  const ref = useRef(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    formattedDate,
    isDisabled,
  } = useCalendarCell(props, state, ref);

  return (
    <td {...cellProps}>
      <div
        {...buttonProps}
        ref={ref}
        hidden={isOutsideVisibleRange}
        className={cn(
          'text-center outline-none rounded-md p-1 hover:group-[.calendar-psychotherapy]:bg-content-accent-vivid/10 hover:group-[.calendar-coaching]:bg-content-accent/10',
          {
            ['group-[.calendar-coaching]:bg-content-accent group-[.calendar-psychotherapy]:bg-content-accent-vivid text-content-inverse font-semibold hover:group-[.calendar-coaching]:bg-content-accent hover:group-[.calendar-psychotherapy]:bg-content-accent-vivid']:
              isSelected,
            ['opacity-30 cursor-not-allowed']: isDisabled,
          }
        )}
      >
        {formattedDate}
      </div>
    </td>
  );
};
