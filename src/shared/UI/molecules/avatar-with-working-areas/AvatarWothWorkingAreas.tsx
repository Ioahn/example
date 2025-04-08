import { StaticImageData } from 'next/image';
import { TAreaType } from '@shared/api';
import { cn } from '@shared/utils';
import { Image, WorkingAreas } from '@shared/UI';

type AvatarProps = {
  src: string | StaticImageData;
  areas?: TAreaType[];
};

export function AvatarWithWorkingAreas({
  src,
  className,
  areas,
}: CommonProps<AvatarProps>) {
  return (
    <div className={cn('relative w-full', className)}>
      <div>
        <Image
          src={src}
          alt='avatar'
          className='h-full w-full rounded-xl object-cover'
          width={400}
          height={400}
        />
      </div>
      {areas && (
        <div className='absolute inset-4 flex flex-col justify-end sm:hidden'>
          <WorkingAreas areas={areas} />
        </div>
      )}
    </div>
  );
}
