import Marquee from 'react-fast-marquee';
import { TopicTag } from '@features/client';
import { TAreaType } from '@shared/api';
import { cn } from '@shared/utils';
import { Image } from '@shared/UI';
import { WORKING_AREA_SPECIALIZATION } from '@shared/constants';

type Props = {
  specialists: {
    area: TAreaType[];
    name: string;
    img: string;
  }[];
};

export const InfiniteMarque: FCC<Props> = ({ specialists, className }) => {
  return (
    <div className={cn(className)}>
      <Marquee
        autoFill={true}
        speed={10}
        loop={0}
        className='h-full overflow-x-auto overflow-y-hidden scrollbar-width-none overflow-scrolling-touch'
        // style={{
        //   overflowX: 'auto', // Overflow doesn't work with className, FIXME
        //   overflowY: 'hidden',
        //   WebkitOverflowScrolling: 'touch',
        //   scrollbarWidth: 'none',
        // }}
      >
        {specialists.map(({ name, area, img }) => (
          <div
            key={img}
            className={cn(
              'group select-none md:w-[15rem] w-[10rem] mr-8 relative overflow-hidden rounded-2xl after:absolute after:inset-0 after:bg-gradient-to-t after:from-content-primary after:to-transparent after:to-30%'
            )}
          >
            <div className='aspect-w-4 aspect-h-5 w-full'>
              <div className='flex flex-col p-4 h-full justify-end z-[1] gap-2'>
                <p className='text-content-inverse text-xs'>{name}</p>
                <div className='flex gap-2'>
                  {area.map((el) => (
                    <TopicTag
                      area={el}
                      name={WORKING_AREA_SPECIALIZATION[el]}
                      key={el}
                      className='bg-transparent border border-border-primary rounded-2xl text-2xs text-content-inverse p-1'
                    />
                  ))}
                </div>
              </div>
              <Image
                src={img}
                alt={name}
                width={1000}
                height={1000}
                className='object-cover'
              />
            </div>
          </div>
        ))}
      </Marquee>
    </div>
  );
};
