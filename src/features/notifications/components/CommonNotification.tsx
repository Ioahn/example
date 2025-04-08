import { cn } from '@shared/utils';
import { AvatarThumbnail } from '@shared/UI';

export type TCommonNotification = {
  icon?: string;
  new_session_date_utc: number;
  old_session_date_utc: number;
  participant_first_name: string;
  participant_last_name: string;
};

export const CommonNotification: FCC<
  TCommonNotification & { isRead: boolean }
> = ({ icon, participant_first_name, participant_last_name, isRead }) => {
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
        />
      </div>
    </div>
  );
};
