import { RiArrowLeftSLine } from 'react-icons/ri';
import { useMedia } from 'react-use';
import { selectShortProfile } from '@entities/models';
import {
  ChatInputField,
  nextMessagePageAction,
  selectActiveRoom,
  selectMessagePageState,
  selectMessagesByActiveRoom,
} from '@features/chat';
import { cn } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { AvatarThumbnail, Button, Loader } from '@shared/UI';
import { LOADING_STATES } from '@shared/constants';
import { MessageList } from './MessageList';

type DialogProps = { toRooms?: () => void };

export function Dialog({ toRooms, className }: CommonProps<DialogProps>) {
  const room = useAppSelector(selectActiveRoom);
  const pageState = useAppSelector((state) =>
    selectMessagePageState(state, room?.id)
  );
  const { id } = useAppSelector(selectShortProfile);
  const messages = useAppSelector(selectMessagesByActiveRoom);
  const isDesktop = useMedia('(min-width: 640px)', false);
  const dispatch = useAppDispatch();

  if (!room?.interlocutor || !pageState) {
    return null;
  }

  const { interlocutor, id: roomId } = room;
  const { isInit } = pageState;

  return (
    <div className={cn('grid grid-rows-[4rem_1fr] overflow-hidden', className)}>
      <div className='row-span-1 flex md:p-4 p-2 gap-4 shadow-md shadow-bg-inverse-secondary/10 z-10'>
        {!isDesktop && (
          <Button
            variant='ghost'
            size='icon'
            onPress={toRooms}
            startIcon={<RiArrowLeftSLine className='text-md' />}
          />
        )}
        <AvatarThumbnail
          name={interlocutor.name}
          size='md'
          img={interlocutor.avatar_url as unknown as string}
        />
      </div>
      <div className='row-span-1 grid grid-rows-[1fr_minmax(3rem,auto)] overflow-hidden h-full'>
        <div className='row-span-1 overflow-hidden'>
          {!!messages?.length ? (
            <MessageList
              messages={messages}
              loadMore={() => dispatch(nextMessagePageAction({ id: roomId }))}
              accountId={id}
              className='h-full'
            />
          ) : (
            <div className='flex flex-col justify-center items-center h-full text-content-secondary text-xs bg-content-tertiary/10'>
              {isInit ? (
                'Начните диалог'
              ) : (
                <Loader loadingState={LOADING_STATES.LOADING} />
              )}
            </div>
          )}
        </div>
        <div className='row-span-1'>
          <ChatInputField />
        </div>
      </div>
    </div>
  );
}
