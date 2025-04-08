import { RiUser3Fill } from 'react-icons/ri';
import { Carousel, ParsedText } from '@features/landing';
import { cn } from '@shared/utils';
import { Card, Container, Image } from '@shared/UI';

type Props = {
  items: {
    id: number;
    icon?: string;
    description: string;
    author?: string;
  }[];
};

export const Recommendation: FCC<Props> = ({ items, className }) => {
  return (
    <section className={cn('bg-bg-primary', className)}>
      <Container type='landing'>
        <div className='h-8 md:h-[3.75rem]' />
        <h3 className='col-span-6 md:col-span-12 font-galaxy-semibold text-center'>
          Отзывы
        </h3>
        <div className='h-8 md:h-[3.75rem]' />
        <Carousel items={items} className='col-span-6 md:col-span-12'>
          {({ description, icon, author }) => (
            <Card variant='secondary' className='flex gap-4 max-md:flex-col'>
              <div className='md:contents flex md:gap-4 gap-2 items-center'>
                <div className='rounded-full md:w-[5.625rem] w-[2.875rem] md:h-[5.625rem] h-[2.875rem] overflow-hidden flex-shrink-0 bg-bg-tertiary p-2'>
                  <div className='w-full h-full relative flex justify-center items-center'>
                    {!icon ? (
                      <RiUser3Fill className='md:text-6xl text-2lg text-content-inverse' />
                    ) : (
                      <Image
                        src={icon}
                        alt={icon}
                        fill
                        className='object-contain'
                      />
                    )}
                  </div>
                </div>
                <p className='font-base-semibold md:hidden'>{author}</p>
              </div>
              <div className='flex flex-col gap-4'>
                <ParsedText>{description}</ParsedText>
                <p className='font-base-semibold max-md:hidden'>{author}</p>
              </div>
            </Card>
          )}
        </Carousel>
        <div className='h-8 md:h-[3.75rem]' />
      </Container>
    </section>
  );
};
