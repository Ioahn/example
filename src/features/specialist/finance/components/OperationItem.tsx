import { GregorianCalendar } from '@internationalized/date';
import { useDateFormatter } from 'react-aria';
import { TSpecialistFinanceOperationSchema } from '@shared/api';
import { fl } from '@shared/utils';
import { AvatarThumbnail, Card } from '@shared/UI';

export const OperationItem: FCC<TSpecialistFinanceOperationSchema> = ({
  image,
  amount,
  date,
  amount_description,
  title,
}) => {
  const monthFormatter = useDateFormatter({
    day: 'numeric',
    month: 'long',
    calendar: typeof GregorianCalendar,
  });

  const hoursMinutes = useDateFormatter({
    hour: 'numeric',
    minute: 'numeric',
    calendar: typeof GregorianCalendar,
  });

  const dateInMS = new Date(date * 1000);

  const longData = monthFormatter.format(dateInMS).split(' ').map(fl).join(' ');

  const time = hoursMinutes.format(dateInMS);

  return (
    <Card
      className='flex items-center justify-between rounded-[2rem] '
      variant='secondary'
    >
      <div className='flex items-center gap-4'>
        <AvatarThumbnail
          name={title}
          img={image}
          size='md'
          description={` ${longData}, ${time}`}
        />
      </div>
      <div className='flex flex-col items-end'>
        <span className='font-bold'>{amount}</span>
        <span className='text-xs text-content-secondary'>
          {amount_description}
        </span>
      </div>
    </Card>
  );
};
