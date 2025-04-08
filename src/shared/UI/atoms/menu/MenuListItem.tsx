import { ReactElement } from 'react';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { cn } from '@shared/utils';

type Props = {
  icon?: ReactElement;
  text: string;
  isExternalLink?: boolean;
};

export const MenuListItem: FCC<Props> = ({
  icon,
  text,
  className,
  isExternalLink,
}) => {
  return (
    <>
      <div className={cn('flex items-center gap-3 outline-none', className)}>
        {icon && (
          <div className='rounded-full bg-bg-primary p-2 text-md transition-colors group-aria-selected:bg-bg-secondary'>
            {icon}
          </div>
        )}
        {text}
        {isExternalLink && (
          <RiArrowRightUpLine className='text-md text-content-secondary' />
        )}
      </div>
    </>
  );
};
