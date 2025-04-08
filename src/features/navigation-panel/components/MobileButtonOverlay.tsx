import { Overlay } from 'react-aria';
import { useMedia } from 'react-use';
import { cn } from '@shared/utils';
import { usePortal } from '@shared/providers';

export const MobileButtonOverlay: FCC = function MobileButtonOverlay({
  children,
  className,
}) {
  const portalRef = usePortal();
  const isDesktop = useMedia('(min-width: 640px)', true);

  // useDisableCarrotQuest();

  if (isDesktop) {
    return children;
  }

  return (
    <Overlay portalContainer={portalRef?.current as HTMLDivElement}>
      <div className='fixed z-10 bottom-0 inset-x-0'>
        <div className='min-h-10 bg-bg-secondary p-4 w-full'>{children}</div>
      </div>
      <div className={cn('min-h-32', className)} />
    </Overlay>
  );
};
