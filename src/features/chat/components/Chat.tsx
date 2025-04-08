import { animated, useTransition } from '@react-spring/web';
import { useDisableCarrotQuest } from '@shared/externals';
import { useState } from 'react';
import {
  Dialog,
  Rooms,
  selectActiveRoomId,
  selectHasRooms,
  selectIsChatInit,
} from '@features/chat';
import { cn } from '@shared/utils';
import { useAppSelector } from '@shared/hooks';
import { Loader } from '@shared/UI';
import { LOADING_STATES } from '@shared/constants';

type Props = {
  variant?: 'primary' | 'secondary';
};

export const Chat: FCC<Props> = ({ variant = 'primary' }) => {
  const hasRooms = useAppSelector(selectHasRooms);
  const isInit = useAppSelector(selectIsChatInit);

  if (!isInit) {
    return (
      <div className='h-full relative'>
        <div className='absolute inset-0 flex flex-col justify-center items-center'>
          <Loader loadingState={LOADING_STATES.LOADING} />
        </div>
      </div>
    );
  }

  if (!hasRooms) {
    return (
      <div className='h-full relative'>
        <div className='absolute inset-0 flex flex-col justify-center items-center'>
          <p className='text-content-secondary'>Ваша переписка появится тут</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'grid grid-cols-3 h-full group overflow-hidden',
        `chat-${variant}`
      )}
    >
      <div className='group-[.chat-primary]:col-span-1 overflow-hidden group-[.chat-secondary]:hidden border-r-[1px] border-content-tertiary/20'>
        <Rooms />
      </div>
      <div className='relative group-[.chat-primary]:col-span-2 col-span-3'>
        <Dialog className='absolute inset-0' />
      </div>
    </div>
  );
};

enum FSM_CHATS {
  ROOMS = 'rooms',
  DIALOG = 'dialog',
}

export const ChatSlideView = () => {
  const activeChat = useAppSelector(selectActiveRoomId);
  const [state, setState] = useState(
    activeChat ? FSM_CHATS.DIALOG : FSM_CHATS.ROOMS
  );

  const ComponentMap = {
    [FSM_CHATS.ROOMS]: <Rooms toDialogs={() => setState(FSM_CHATS.DIALOG)} />,
    [FSM_CHATS.DIALOG]: (
      <Dialog
        toRooms={() => setState(FSM_CHATS.ROOMS)}
        className='absolute inset-0'
      />
    ),
  };

  const transition = useTransition(state, {
    from: {
      transform:
        state === FSM_CHATS.ROOMS
          ? 'translate3d(-100%, 0, 0)'
          : 'translate3d(100%, 0, 0)',
    },
    enter: { transform: 'translate3d(0%, 0, 0)' },
    leave: {
      transform:
        state === FSM_CHATS.ROOMS
          ? 'translate3d(100%, 0, 0)'
          : 'translate3d(-100%, 0, 0)',
    },
  });

  useDisableCarrotQuest();

  return (
    <div className='overflow-hidden relative w-full h-full'>
      {transition((style, item) => (
        <animated.div style={style} key={item} className='absolute inset-0'>
          {ComponentMap[item]}
        </animated.div>
      ))}
    </div>
  );
};
