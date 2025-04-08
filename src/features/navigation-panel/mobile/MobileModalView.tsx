import { animated, useTransition } from '@react-spring/web';
import { always } from 'ramda';
import { RiCloseLine } from 'react-icons/ri';
import { closeAllUI, selectUIStates } from '@entities/models';
import { ChatSlideView, selectChatUIState } from '@features/chat';
import { MobileUser } from '@features/navigation-panel';
import { Notification } from '@features/notifications';
import { callFnByPredicates } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, Container, Image } from '@shared/UI';

enum FSM_VIEWS {
  DEFAULT = 'default',
  MENU = 'menu',
  NOTIFICATION = 'notification',
  CHAT = 'chat',
}

export const MobileModalView = () => {
  const dispatch = useAppDispatch();
  const ComponentMap = {
    [FSM_VIEWS.MENU]: <MobileUser />,
    [FSM_VIEWS.NOTIFICATION]: <Notification />,
    [FSM_VIEWS.CHAT]: <ChatSlideView />,
    [FSM_VIEWS.DEFAULT]: <div />,
  };

  const { menuIsVisible, notificationIsVisible } =
    useAppSelector(selectUIStates);

  const { chatIsOpened } = useAppSelector(selectChatUIState);

  const state = callFnByPredicates([
    [[true, false, false], always(FSM_VIEWS.MENU)],
    [[false, true, false], always(FSM_VIEWS.NOTIFICATION)],
    [[false, false, true], always(FSM_VIEWS.CHAT)],
    [[false, false, false], always(FSM_VIEWS.DEFAULT)],
  ])([menuIsVisible, notificationIsVisible, chatIsOpened]) as FSM_VIEWS;

  const transition = useTransition(state, {
    from: {
      transform:
        state === FSM_VIEWS.DEFAULT
          ? 'translate3d(-100%, 0, 0)'
          : 'translate3d(100%, 0, 0)',
    },
    enter: { transform: 'translate3d(0%, 0, 0)' },
    leave: {
      transform:
        state === FSM_VIEWS.DEFAULT
          ? 'translate3d(100%, 0, 0)'
          : 'translate3d(-100%, 0, 0)',
    },
    delay: state === FSM_VIEWS.DEFAULT ? 200 : 0,
  });

  return (
    <div className='w-full h-screen grid grid-rows-[4rem_1fr]'>
      <Container className='flex items-center justify-between row-span-1'>
        <span className='h-4'>
          <Image
            quality={100}
            alt='SenseA'
            width={100}
            height={20}
            src='/logo.png'
            priority
            className='h-full w-auto sm:block'
          />
        </span>
        <Button
          variant='ghost'
          size='icon'
          className='rounded-full'
          endIcon={<RiCloseLine className='text-md' />}
          onPress={() => dispatch(closeAllUI())}
        />
      </Container>
      <div className='relative row-span-1'>
        {transition((style, item) => (
          <animated.div style={style} key={item} className='absolute inset-0'>
            {ComponentMap[item]}
          </animated.div>
        ))}
      </div>
    </div>
  );
};
