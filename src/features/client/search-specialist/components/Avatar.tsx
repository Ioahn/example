import { StaticImageData } from 'next/image';
import { TAreaType } from '@shared/api';
import { cn } from '@shared/utils';
import { Image, WorkingAreas } from '@shared/UI';

type AvatarProps = {
  src: string | StaticImageData;
  areas?: TAreaType[];
};
export const Avatar: FCC<AvatarProps> = ({ src, className, areas }) => (
  <div className={cn('relative w-full', className)}>
    <Image
      src={src}
      alt='avatar'
      className='h-full w-full rounded-xl object-cover'
      width={400}
      height={400}
    />
    {areas && (
      <div className='absolute inset-4 flex flex-col justify-end sm:hidden'>
        <WorkingAreas areas={areas} />
      </div>
    )}
  </div>
);
