import { selectTimezone } from '@entities/models';
import { TMessageSchema } from '@shared/api';
import { cn, convertUnixTimeIntl } from '@shared/utils';
import { useAppSelector } from '@shared/hooks';

export function Message({
  accountId,
  message_text,
  sender_id,
  sent_at,
}: TMessageSchema & { accountId: string }) {
  const timeZone = useAppSelector(selectTimezone);
  const formattedDate = convertUnixTimeIntl(sent_at, timeZone);
  return (
    <div className='flex flex-col'>
      <div
        className={cn('w-2/3 break-words rounded-xl p-2', {
          ['self-end rounded-br-none  bg-content-accent/20']:
            accountId === sender_id,
          ['self-start rounded-tl-none bg-bg-secondary']:
            accountId !== sender_id,
        })}
      >
        {message_text}
        <div
          className={cn('text-right bottom-0 right-0 text-2xs text-gray-400')}
        >
          {formattedDate.time} {formattedDate.date}
        </div>
      </div>
    </div>
  );
}
