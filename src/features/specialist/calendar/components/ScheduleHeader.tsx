import { GregorianCalendar } from '@internationalized/date';
import { useDateFormatter } from 'react-aria';
import { cn } from '@shared/utils';

type Props = {
  date: number;
  active?: boolean;
};
export const ScheduleHeader = (props: Props) => {
  const dateFormatter = useDateFormatter({
    day: 'numeric',
    timeZone: 'UTC',
    calendar: typeof GregorianCalendar,
  });

  const weekDateFormatter = useDateFormatter({
    weekday: 'short',
    timeZone: 'UTC',
    calendar: typeof GregorianCalendar,
  });

  const currentDateFormatter = useDateFormatter({
    day: 'numeric',
    weekday: 'short',
    year: '2-digit',
    timeZone: 'UTC',
    calendar: typeof GregorianCalendar,
  });

  const isCurrentDate =
    currentDateFormatter.format(new Date()) ===
    currentDateFormatter.format(new Date(props.date * 1000));

  return (
    <div
      className='flex flex-col items-center p-2 text-2xs aria-checked:-mt-[4px] aria-checked:border-t aria-checked:border-t-4  aria-checked:border-t-content-accent'
      aria-checked={props.active}
    >
      <span>{weekDateFormatter.format(new Date(props.date * 1000))}</span>
      <span
        className={cn('block rounded-full px-2 py-1 font-bold', {
          ['bg-content-accent-vivid text-content-inverse']: isCurrentDate,
        })}
      >
        {dateFormatter.format(new Date(props.date * 1000))}
      </span>
    </div>
  );
};
