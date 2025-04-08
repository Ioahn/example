import { TBlogResponseSchema } from '@shared/api';
import { cn } from '@shared/utils';
import { Image, WorkingAreas } from '@shared/UI';
import { WORKING_AREA_DICT } from '@shared/constants';

type Props = TBlogResponseSchema & PropsWithClassNames;

export const PreviewImage = function PreviewImage({
  preview_image,
  title,
  className,
  areas,
}: Props) {
  return (
    <div className={cn('relative aspect-w-2 aspect-h-1', className)}>
      <div className='absolute inset-0 overflow-hidden z-0'>
        <Image
          src={preview_image}
          alt='preview image'
          fill
          className='object-cover object-top'
        />
        <div className='absolute inset-0 z-10 flex flex-col justify-end md:px-[4.5rem] md:py-8 p-4 overflow-hidden'>
          <div className='bg-gradient-to-t from-black/70 to-transparent absolute inset-0' />
          <p className='font-galaxy-semibold text-content-inverse z-10'>
            {title}
          </p>
          {areas && (
            <div className='md:mt-11 mt-3 relative'>
              <WorkingAreas
                areas={areas}
                labelsMap={WORKING_AREA_DICT}
                className='!font-grain'
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
