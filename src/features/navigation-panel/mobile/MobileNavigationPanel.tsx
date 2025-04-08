import { mobileModalIsOpened } from '@entities/models';
import { MobileMenuButton, MobileModalView } from '@features/navigation-panel';
import { useAppSelector } from '@shared/hooks';
import { Overlay } from '@shared/UI';

export const MobileNavigationPanel = () => {
  const isOpened = useAppSelector(mobileModalIsOpened);

  return (
    <div className='md:hidden'>
      <MobileMenuButton />
      <Overlay isOpen={isOpened}>
        <MobileModalView />
      </Overlay>
    </div>
  );
};
