import { ChatWidget } from '@features/chat';
import {
  DesktopMenu,
  Notifications,
  UserName,
} from '@features/navigation-panel';

export const DesktopNavigationPanel = () => {
  return (
    <div className='flex items-center gap-2 max-md:hidden'>
      <ChatWidget />
      <Notifications />
      <DesktopMenu />
      <UserName />
    </div>
  );
};
