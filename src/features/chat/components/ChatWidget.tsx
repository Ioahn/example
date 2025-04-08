import { useRef } from 'react';
import { RiChat3Line } from 'react-icons/ri';
import { useOverlayTriggerState } from 'react-stately';
import { useMedia } from 'react-use';
import { Chat, selectChatUIState, setChatVisibility } from '@features/chat';
import { cn } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, Dot, Popover } from '@shared/UI';

type Props = {
  size?: 'base' | 'lg';
  variant?: 'primary' | 'secondary';
};

export const ChatWidget: FCC<Props> = ({
  size = 'base',
  variant = 'primary',
}) => {
  const dispatch = useAppDispatch();
  const toggleRef = useRef(null);
  const { chatIsOpened } = useAppSelector(selectChatUIState);

  const state = useOverlayTriggerState({
    isOpen: chatIsOpened,
    onOpenChange: (isOpen) => dispatch(setChatVisibility(isOpen)),
  });
  const isDesktop = useMedia('(min-width: 640px)', false);
  const { hasNewChatMessages } = useAppSelector(selectChatUIState);

  return (
    <>
      <div
        className={cn('rounded-full relative p-3', {
          ['bg-bg-secondary']:
            chatIsOpened && isDesktop && variant === 'primary',
          ['hover:bg-bg-secondary']: isDesktop,
          ['hover:text-content-primary text-content-inverse bg-content-primary/50']:
            variant === 'secondary',
          ['text-content-primary bg-bg-primary']:
            chatIsOpened && variant === 'secondary',
        })}
        ref={toggleRef}
      >
        {hasNewChatMessages && (
          <Dot
            className={cn('top-1.5 right-1.5 bg-content-accent', {
              ['right-14']: !isDesktop,
            })}
          />
        )}
        <Button
          variant='clear'
          startIcon={
            <RiChat3Line
              className={cn({
                ['text-md']: size === 'base',
                ['text-lg']: size === 'lg',
              })}
            />
          }
          onPress={state.toggle}
          className={cn('rounded-full', {
            ['flex-col items-center']: !isDesktop,
          })}
        ></Button>
        {isDesktop && (
          <Popover
            state={state}
            triggerRef={toggleRef}
            offset={12}
            placement='bottom right'
          >
            <div className='h-[28rem] w-[clamp(20rem,33rem,33rem)] select-none'>
              <Chat variant={variant} />
            </div>
          </Popover>
        )}
      </div>
    </>
  );
};
