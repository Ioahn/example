import { Item } from 'react-stately';
import { nextInboxPage, selectAllInboxes } from '@entities/models';
import { NotificationItemType } from '@features/notifications';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { AsyncList } from '@shared/UI';

export const Notification = () => {
  const dispatch = useAppDispatch();
  const inboxes = useAppSelector(selectAllInboxes);

  return (
    <div className='h-full p-2'>
      <AsyncList
        items={inboxes}
        className='flex grow flex-col gap-2 overflow-y-scroll text-sm hide-scrollbar'
        isVirtualized
        withAnchor
        loadMore={() => dispatch(nextInboxPage())}
      >
        {(message) => (
          <Item key={message.id} textValue={message.type}>
            <NotificationItemType {...message} />
          </Item>
        )}
      </AsyncList>
      {inboxes.length === 0 ? (
        <p className='text-content-secondary h-full flex items-center text-center p-4'>
          Ваши уведомления появятся здесь
        </p>
      ) : null}
    </div>
  );
};
