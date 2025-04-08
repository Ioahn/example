import { useCallback } from 'react';
import { usePress } from 'react-aria';
import { Item, Key } from 'react-stately';
import {
  selectActiveRoomId,
  selectAllRooms,
  selectHasNewChatMessagesInRoom,
  setActiveRoom,
} from '@features/chat';
import { TChatResponseSchema } from '@shared/api';
import { cn } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { AvatarThumbnail, Dot, List } from '@shared/UI';

type RoomsProps = { toDialogs?: () => void };

export function Rooms({ toDialogs, className }: CommonProps<RoomsProps>) {
  const dispatch = useAppDispatch();
  const rooms = useAppSelector(selectAllRooms);
  const activeChat = useAppSelector(selectActiveRoomId);

  const openDialog = useCallback(
    (id: Key) => {
      dispatch(setActiveRoom(id as string));
      toDialogs?.();
    },
    [dispatch, toDialogs]
  );

  return (
    <div className={cn('relative h-full w-full', className)}>
      <div className='overflow-auto h-full [&::-webkit-scrollbar]:hidden scrollbar-none'>
        <List
          items={rooms}
          className='flex flex-col'
          selectedKeys={new Set([activeChat as string])}
          selectionMode='single'
          disallowEmptySelection
          onSelectionChange={([key]) => {
            dispatch(setActiveRoom(key as string));
            toDialogs?.();
          }}
        >
          {(room) => (
            <Item key={room.id} textValue={room.id}>
              <Room {...room} onPress={openDialog} />
            </Item>
          )}
        </List>
      </div>
    </div>
  );
}

export const Room: FCC<
  TChatResponseSchema & { onPress: (id: Key) => void }
> = ({ onPress, interlocutor, id }) => {
  const activeChat = useAppSelector(selectActiveRoomId);

  const { pressProps } = usePress({
    onPress: () => onPress(id),
    isDisabled: activeChat === id,
  });

  const hasNewMessage = useAppSelector((state) =>
    selectHasNewChatMessagesInRoom(state, id)
  );

  return (
    <div
      className={cn('px-2 py-3 cursor-pointer grid grid-cols-[1fr_1rem]', {
        ['bg-content-accent/15']: activeChat === id,
        ['grid-cols-1']: !hasNewMessage,
      })}
      {...pressProps}
    >
      <div className='col-span-1 overflow-hidden'>
        <AvatarThumbnail
          name={interlocutor.name}
          size='sm'
          img={interlocutor.avatar_url as unknown as string}
          className='w-full'
        />
      </div>
      <div
        className={cn('col-span-1 flex justify-center items-center', {
          ['hidden']: !hasNewMessage,
        })}
      >
        <Dot className='relative top-0 right-0' />
      </div>
    </div>
  );
};
