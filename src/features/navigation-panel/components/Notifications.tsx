import { useRef } from 'react';
import { RiNotification2Line } from 'react-icons/ri';
import { useOverlayTriggerState } from 'react-stately';
import { useMedia } from 'react-use';
import {
  selectHasNewMessage,
  selectUIStates,
  setNotificationVisible,
} from '@entities/models';
import { Notification } from '@features/notifications';
import { cn } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, Dot, Popover } from '@shared/UI';

export const Notifications = () => {
  const dispatch = useAppDispatch();
  const toggleRef = useRef(null);
  const { notificationIsVisible } = useAppSelector(selectUIStates);
  const state = useOverlayTriggerState({
    isOpen: notificationIsVisible,
    onOpenChange: (isOpen) => dispatch(setNotificationVisible(isOpen)),
  });
  const hasNewMessages = useAppSelector(selectHasNewMessage);
  const isDesktop = useMedia('(min-width: 640px)', false);
  const onPressHandler = () => {
    state.toggle();
  };

  return (
    <>
      <div
        className={cn('rounded-full relative p-3', {
          ['bg-bg-secondary']: notificationIsVisible && isDesktop,
          ['hover:bg-bg-secondary']: isDesktop,
        })}
        ref={toggleRef}
      >
        {hasNewMessages && (
          <Dot
            className={cn('top-1.5 right-1.5 bg-content-accent', {
              ['right-14']: !isDesktop,
            })}
          />
        )}
        <Button
          variant='clear'
          startIcon={<RiNotification2Line className='text-md' />}
          onPress={onPressHandler}
          className={cn(
            'rounded-full enabled:focus-visible:outline-offset-[1rem]',
            {
              ['flex-col items-center']: !isDesktop,
            }
          )}
        />
        {isDesktop && (
          <Popover
            state={state}
            triggerRef={toggleRef}
            offset={12}
            placement='bottom right'
          >
            <div className='h-[28rem] w-[clamp(15rem,22rem,33rem)]'>
              <Notification />
            </div>
          </Popover>
        )}
      </div>
    </>
  );
};
