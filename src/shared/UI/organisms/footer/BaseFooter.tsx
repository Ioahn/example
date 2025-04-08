// import { useMedia } from 'react-use';
// import { selectAuthStatus, selectUIStates } from '@entities/models';
// import {
//   ChatWidget,
//   MobileNavigationFooter,
//   Notifications,
// } from '@features/navigation-panel';
// import { cn } from '@shared/utils';
// import { useAppSelector } from '@shared/hooks';

export const BaseFooter = () => {
  // const isDesktop = useMedia('(min-width: 640px)', false);
  // const hasAuth = useAppSelector(selectAuthStatus);
  // const { chatIsVisible, notificationIsVisible } =
  //   useAppSelector(selectUIStates);

  return (
    <>
      {/*{!isDesktop && hasAuth && (*/}
      {/*  <MobileNavigationFooter>*/}
      {/*    <div*/}
      {/*      className={cn({*/}
      {/*        ['text-content-accent']: chatIsVisible,*/}
      {/*      })}*/}
      {/*    >*/}
      {/*      <ChatWidget />*/}
      {/*    </div>*/}
      {/*    <div*/}
      {/*      className={cn({*/}
      {/*        ['text-content-accent']: notificationIsVisible,*/}
      {/*      })}*/}
      {/*    >*/}
      {/*      <Notifications />*/}
      {/*    </div>*/}
      {/*  </MobileNavigationFooter>*/}
      {/*)}*/}
      <footer></footer>
    </>
  );
};
