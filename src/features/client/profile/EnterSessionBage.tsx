import { GregorianCalendar } from '@internationalized/date';
import { useDateFormatter } from 'react-aria';
import { RiVideoAddLine } from 'react-icons/ri';
import {
  openVideoCall,
  selectClientProfile,
  selectClientSpecialist,
} from '@entities/models';
import { TAreaType } from '@shared/api';
import { cn, fl } from '@shared/utils';
import { useAppSelector } from '@shared/hooks';
import { AvatarThumbnail, Button, Card } from '@shared/UI';
import { WORKING_AREA_DICT } from '@shared/constants';

export const EnterSessionBage: FCC = ({ className }) => {
  const { next_session } = useAppSelector(
    (state) => selectClientProfile(state) || {}
  );

  const specialist = useAppSelector(selectClientSpecialist);

  const weekDateFormatter = useDateFormatter({
    weekday: 'long',
    timeZone: 'UTC',
    calendar: typeof GregorianCalendar,
  });

  const dayWithMonth = useDateFormatter({
    month: 'long',
    day: '2-digit',
    calendar: typeof GregorianCalendar,
  });

  const time = useDateFormatter({
    timeStyle: 'short',
    calendar: typeof GregorianCalendar,
  });

  if (!next_session || !specialist) {
    return null;
  }

  const { utc_date: date, is_able_to_enter, area } = next_session;
  const { first_name, last_name, avatar_url } = specialist;

  const dateInMs = new Date(date * 1000);

  return (
    <Card
      variant='secondary'
      className={cn('flex md:gap-6 gap-4 items-center flex-wrap', className)}
    >
      <div className='flex md:gap-6 gap-4 items-center'>
        <div
          className={cn('flex items-center rounded-full p-3', {
            ['bg-content-accent-vivid']: area === TAreaType.ECoaching,
            ['bg-content-accent']: area === TAreaType.EPsychotherapy,
          })}
        >
          <RiVideoAddLine className='md:text-lg  text-content-inverse' />
        </div>
        <div className='font-semibold max-md:hidden'>
          <span className='font-normal'>Следующая сессия</span>{' '}
          {fl(weekDateFormatter.format(dateInMs))},{' '}
          {dayWithMonth.format(dateInMs)} <span className='font-normal'>в</span>{' '}
          {time.format(dateInMs)} <span className='font-normal'>c</span>
        </div>
        <div className='font-semibold md:hidden text-2xs flex-col'>
          <div>
            {fl(weekDateFormatter.format(dateInMs))},{' '}
            {dayWithMonth.format(dateInMs)}, {time.format(dateInMs)}
          </div>
          <div className='font-normal'>Следующая сессия</div>
        </div>
      </div>
      <AvatarThumbnail
        size='md'
        name={`${first_name} ${last_name || ''}`}
        img={avatar_url}
        description={WORKING_AREA_DICT[area]}
      />
      <div className='md:ml-auto max-md:w-full'>
        <Button
          isDisabled={!is_able_to_enter}
          className='max-md:max-w-full max-md:w-full'
          onPress={() => openVideoCall(next_session.id)}
        >
          Подключиться к сессии
        </Button>
      </div>
    </Card>
  );
};
