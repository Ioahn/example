import { GregorianCalendar } from '@internationalized/date';
import { useDateFormatter } from 'react-aria';
import { selectFinance, selectTimezone } from '@entities/models';
import { cn, fl } from '@shared/utils';
import { useAppSelector } from '@shared/hooks';
import { Card } from '@shared/UI';

export const PaymentStats: FCC = ({ className }) => {
  const { stats } = useAppSelector(selectFinance);
  const timeZone = useAppSelector(selectTimezone);

  const fullDateFormatter = useDateFormatter({
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
    timeZone: timeZone,
    calendar: typeof GregorianCalendar,
  });

  const monthFormatter = useDateFormatter({
    month: 'long',
    calendar: typeof GregorianCalendar,
    timeZone: timeZone,
  });

  const nextPayoutDate = new Date();

  nextPayoutDate.setMonth(nextPayoutDate.getMonth() + 1);
  nextPayoutDate.setDate(15);

  const pastPayoutDate = new Date();

  pastPayoutDate.setMonth(nextPayoutDate.getMonth() - 2);

  return (
    <Card
      variant='secondary'
      className={cn(
        'flex flex-col gap-6 rounded-[2rem] bg-bg-inverse-secondary text-content-inverse',
        className
      )}
    >
      <div className='flex justify-between'>
        <div className='flex flex-col'>
          <span className='text-lg font-bold sm:text-3xl'>
            {stats.current_month_earnings}
          </span>
          <span>Заработано {fl(monthFormatter.format(new Date()))}</span>
        </div>
        {stats.current_month_sessions_number ||
          (0 > 0 && (
            <div className='flex flex-col items-end text-sm'>
              <span className='text-right'>Следующая выплата</span>
              <span>до {fullDateFormatter.format(nextPayoutDate)}</span>
            </div>
          ))}
      </div>
      <div className='flex gap-4'>
        <Card className='bg-bg-primary/10' size='sm'>
          <div className='text-lg font-bold'>
            {stats.current_month_sessions_number}
          </div>
          <div>Всего сессий</div>
        </Card>
      </div>
      {stats.previous_month_earnings && (
        <div className='mt-4 flex flex-col gap-2'>
          <span className='text-md font-bold'>
            {stats.previous_month_earnings}
          </span>
          <div className='flex md:w-1/2 flex-wrap justify-between gap-2'>
            <span>
              Заработано за {fl(monthFormatter.format(pastPayoutDate))}
            </span>
          </div>
        </div>
      )}
    </Card>
  );
};
