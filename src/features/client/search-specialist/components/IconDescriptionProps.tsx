import { ReactElement } from 'react';
import { cn } from '@shared/utils';

type IconWithDescriptionProps = {
  icon: ReactElement;
  description: string;
  value: string | number;
  variant?: 'primary' | 'secondary' | 'tertiary';
};

export const IconWithDescription: FCC<IconWithDescriptionProps> = ({
  className,
  icon,
  description,
  value,
  variant = 'primary',
}) => {
  return (
    <div className={cn('group', variant, className)}>
      <div className='group flex gap-2 group-[.tertiary]:flex-col group-[.secondary]:items-start group-[.tertiary]:items-start group-[.primary]:items-center group-[.primary]:text-2xs group-[.secondary]:text-base'>
        <div className='flex flex-shrink-0 items-center justify-center rounded-full bg-bg-primary group-[.tertiary]:bg-transparent group-[.primary]:h-8 group-[.secondary]:h-10 group-[.primary]:w-8 group-[.secondary]:w-10 group-[.primary]:text-base group-[.secondary]:text-md'>
          {icon}
        </div>

        <div>
          <p className='overflow-wrap-anywhere group-[.primary]:text-content-secondary group-[.tertiary]:text-content-secondary group-[.tertiary]:text-2xs'>
            {description}
          </p>
          <div className='text-2xs group-[.secondary]:text-content-secondary'>
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};
