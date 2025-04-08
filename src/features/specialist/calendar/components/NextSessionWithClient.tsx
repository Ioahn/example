import { RiVideoAddLine } from 'react-icons/ri';
import {
  openVideoCall,
  selectSpecialistNextSession,
  selectTimezone,
} from '@entities/models';
import { TAreaType } from '@shared/api';
import { cn, convertUnixTimeIntl, fl } from '@shared/utils';
import { useAppSelector } from '@shared/hooks';
import { AvatarThumbnail, Button, Card } from '@shared/UI';
import { WORKING_AREA_DICT } from '@shared/constants';

export const NextSessionWithClient: FCC = ({ className }) => {
  const next_session = useAppSelector(selectSpecialistNextSession);
  const timeZone = useAppSelector(selectTimezone);

  if (!next_session) {
    return null;
  }

  const { utc_date, is_able_to_enter, interlocutor, area } = next_session;
  const { first_name, last_name, avatar_url } = interlocutor;

  const { dayOfWeek, time, date } = convertUnixTimeIntl(utc_date, timeZone);

  return (
    <Card
      variant='secondary'
      className={cn('flex md:gap-3 gap-4 items-center flex-wrap', className)}
    >
      <div className='flex md:gap-6 gap-4 items-center'>
        <div
          className={cn('flex items-center rounded-full p-3', {
            ['bg-content-accent-vivid']: area === TAreaType.ECoaching,
            ['bg-content-accent']: area === TAreaType.EPsychotherapy,
          })}
        >
          <RiVideoAddLine className='md:text-lg text-content-inverse' />
        </div>
        <div className='font-semibold max-md:hidden'>
          <span className='font-normal'>Следующая сессия</span> {fl(dayOfWeek)},{' '}
          {date} <span className='font-normal'>в</span> {time}{' '}
          <span className='font-normal'>c</span>
        </div>
        <div className='font-semibold md:hidden text-2xs flex-col'>
          <div>
            {fl(dayOfWeek)}, {date}, {time}
          </div>
          <div className='font-normal'>Следующая сессия</div>
        </div>
      </div>
      <AvatarThumbnail
        size='md'
        name={`${first_name} ${last_name || ''}`}
        img={avatar_url || undefined}
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
