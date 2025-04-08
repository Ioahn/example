import { selectTimezone } from '@entities/models';
import { cn } from '@shared/utils';
import { useAppSelector } from '@shared/hooks';
import { AvatarThumbnail, FormattedDate } from '@shared/UI';

export type TSessionScheduled = {
  icon?: string;
  participant_first_name: string;
  participant_last_name: string;
  session_date_utc: number;
  isRead: boolean;
};

export const SessionScheduled: FCC<TSessionScheduled> = ({
  icon,
  participant_first_name,
  participant_last_name,
  session_date_utc,
  isRead,
}) => {
  const timeZone = useAppSelector(selectTimezone);

  return (
    <div
      className={cn('rounded-lg p-4', {
        ['bg-content-accent/10']: !isRead,
      })}
    >
      <div className='flex gap-4'>
        <AvatarThumbnail
          className='items-start p-0'
          size='md'
          img={icon}
          name={`${participant_first_name} ${participant_last_name ?? ''}`}
          description={
            <div className='flex flex-col text-2xs text-content-primary font-normal'>
              <p className='font-semibold text-content-accent'>
                Сессия запланирована
              </p>
              <FormattedDate
                date={session_date_utc}
                day='2-digit'
                month='long'
                weekday='long'
                hour='numeric'
                minute='numeric'
                timeZone={timeZone}
              />
            </div>
          }
        />
      </div>
    </div>
  );
};
