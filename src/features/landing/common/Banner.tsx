import { useMetrica } from 'next-yandex-metrica';
import { StaticImageData } from 'next/image';
import { Item } from 'react-stately';
import { ParsedText } from '@features/landing';
import { cn } from '@shared/utils';
import { Button, Container, Image, List } from '@shared/UI';

type Props = {
  variant?: 'primary' | 'secondary' | string;
  image: string | StaticImageData;
  title: string;
  description: string;
  advantages?: { id: number; text: string; icon: string }[];
  button?: { title: string; href?: string };
  withoutButton?: boolean;
  additional_description?: string;
};
export const Banner: FCC<Props> = ({
  variant = 'primary',
  image,
  title,
  description,
  advantages,
  button,
  additional_description,
}) => {
  const { reachGoal } = useMetrica();

  return (
    <section className={cn('group', `banner-${variant}`)}>
      <div className='md:h-[3.75rem] h-6' />
      <Container
        type='landing'
        className='grid grid-cols-6 md:grid-cols-12 gap-x-8 grid-flow-dense'
      >
        <div className='h-8 md:hidden col-span-6' />
        <div className='col-span-6 flex flex-col group-[.banner-secondary]:order-1'>
          <h2 className='font-galaxy-semibold'>{title}</h2>
          <div className='h-6' />
          <ParsedText className='font-rock'>{description}</ParsedText>
          <div className='md:h-8 h-6' />
          {advantages && (
            <List
              className='gap-x-4 md:gap-y-6 gap-y-4 flex flex-col font-base'
              items={advantages}
            >
              {({ id, text, icon }) => (
                <Item key={id} textValue={text}>
                  <div className='flex gap-4 items-end' key={id}>
                    <div className='shrink-0'>
                      <div className='relative md:w-8 md:h-8 h-6 w-8'>
                        <Image
                          width={32}
                          height={32}
                          src={icon}
                          alt={text}
                          className='object-contain'
                        />
                      </div>
                    </div>
                    <span className='font-base'>{text}</span>
                  </div>
                </Item>
              )}
            </List>
          )}
          <div className='md:h-8 h-6' />
          {additional_description && (
            <p className='font-rock'>{additional_description}</p>
          )}
          <div className='md:h-8 h-6' />
          <Button
            as='link'
            href={button?.href || '/client/select/area-type'}
            className='max-md:max-w-none max-md:w-full'
            onPress={() => reachGoal(`banner-button-clicked`)}
          >
            {button?.title || 'Выбрать специалиста'}
          </Button>
        </div>
        <div className='col-span-6 max-md:-order-1'>
          <div className='aspect-w-4 aspect-h-3 w-full relative'>
            <Image
              src={image}
              alt='banner-image'
              fill
              className='rounded-2xl object-contain'
            />
          </div>
        </div>
      </Container>
      <div className='md:h-[3.75rem] h-6' />
    </section>
  );
};
