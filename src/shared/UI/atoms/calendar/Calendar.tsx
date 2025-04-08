import { createCalendar } from '@internationalized/date';
import { CalendarProps, DateValue, useCalendar, useLocale } from 'react-aria';
import { RiArrowDropLeftLine, RiArrowDropRightLine } from 'react-icons/ri';
import { useCalendarState } from 'react-stately';
import { TAreaType } from '@shared/api';
import { cn, fl } from '@shared/utils';
import { Button } from '@shared/UI';
import { CalendarGrid } from './CalendarGrid';

type Props = CalendarProps<DateValue> & {
  area?: TAreaType;
};

export const Calendar: FCC<Props> = (props) => {
  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });
  const { calendarProps, prevButtonProps, nextButtonProps, title } =
    useCalendar(props, state);
  const { area = 'coaching' } = props;

  return (
    <div
      {...calendarProps}
      className={cn('md:p-4 p-2 flex flex-col gap-4 group', `calendar-${area}`)}
    >
      <div className='flex gap-4 items-center'>
        <p className='font-semibold md:min-w-[200px] flex-grow md:text-md group-[.calendar-coaching]:text-content-accent group-[.calendar-psychotherapy]:text-content-accent-vivid'>
          {fl(title)}
        </p>
        <div className='flex gap-2'>
          <Button
            {...prevButtonProps}
            size='icon-sm'
            className='p-1 group-[.calendar-coaching]:bg-content-accent group-[.calendar-psychotherapy]:bg-content-accent-vivid'
            startIcon={<RiArrowDropLeftLine className='text-md' />}
          />
          <Button
            {...nextButtonProps}
            size='icon-sm'
            className='p-1 group-[.calendar-coaching]:bg-content-accent group-[.calendar-psychotherapy]:bg-content-accent-vivid'
            startIcon={<RiArrowDropRightLine className='text-md' />}
          />
        </div>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
};
