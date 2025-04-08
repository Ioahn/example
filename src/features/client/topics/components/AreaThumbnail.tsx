import { forwardRef } from 'react';
import { PressEvent, useButton, useObjectRef } from 'react-aria';
import { Card, Image } from '@shared/UI';

type AreaThumbnailType = {
  iconSrc: string;
  label: string;
  description: string;
  onPress?: (e: PressEvent) => void;
};

export const AreaThumbnail = forwardRef<HTMLDivElement, AreaThumbnailType>(
  function AreaThumbnail({ iconSrc, label, description, onPress }, forwardRef) {
    const ref = useObjectRef(forwardRef);

    const { buttonProps } = useButton({ onPress }, ref);

    return (
      <div ref={ref} {...buttonProps} role='button'>
        <Card
          variant='secondary'
          className='flex items-center gap-4 cursor-pointer'
        >
          <div className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] shrink-0 relative'>
            <Image
              src={iconSrc}
              alt={iconSrc}
              fill
              className='object-contain'
            />
          </div>
          <div className='flex flex-col gap-2'>
            <h3 className='md:text-md font-semibold'>{label}</h3>
            <span className='text-2xs md:text-base'>{description}</span>
          </div>
        </Card>
      </div>
    );
  }
);
