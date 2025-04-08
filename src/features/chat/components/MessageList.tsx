import { Item } from 'react-stately';
import { TMessageSchema } from '@shared/api';
import { cn } from '@shared/utils';
import { AsyncList } from '@shared/UI';
import { Message } from './Message';

type MessageListProps = {
  accountId: string;
  messages: TMessageSchema[];
  loadMore: () => void;
  topIsLoading?: boolean;
};

export function MessageList({
  messages,
  className,
  loadMore,
  accountId,
  topIsLoading,
}: CommonProps<MessageListProps>) {
  return (
    <AsyncList
      items={messages}
      className={cn(
        'flex flex-col gap-2 overflow-y-scroll bg-content-tertiary/10 p-4 text-sm hide-scrollbar',
        className
      )}
      withAnchor
      loadMore={loadMore}
      topIsLoading={topIsLoading}
    >
      {(message) => (
        <Item key={message.id} textValue={message.message_text}>
          <Message {...message} accountId={accountId} />
        </Item>
      )}
    </AsyncList>
  );
}
