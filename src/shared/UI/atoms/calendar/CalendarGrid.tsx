import { getWeeksInMonth } from '@internationalized/date';
import { AriaCalendarGridProps, useCalendarGrid, useLocale } from 'react-aria';
import { CalendarState, RangeCalendarState } from 'react-stately';
import { CalendarCell } from './CalendarCell';

export const CalendarGrid: FCC<
  AriaCalendarGridProps & {
    state: CalendarState | RangeCalendarState;
  }
> = ({ state, ...props }) => {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table {...gridProps}>
      <thead {...headerProps}>
        <tr>
          {weekDays.map((day, index) => (
            <th key={index} className='max-md:text-xs'>
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
