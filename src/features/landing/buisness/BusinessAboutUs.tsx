import { ParsedText } from '@features/landing';
import { cn } from '@shared/utils';
import { Button, Card, Container, Image } from '@shared/UI';

type Props = {
  title: string;
  description: string;
  cards: { id: number; image: string; text: string }[];
  subtitle: string;
  image: string;
};

export const BusinessAboutUs: FCC<Props> = function BusinessAboutUs({
  className,
  title,
  description,
  subtitle,
  cards,
  image,
}) {
  return (
    <section>
      <Container className={cn('flex flex-col', className)} type='landing'>
        <div className='h-8 md:h-[3.75rem]' />
        <h2 className='font-galaxy text-center'>{title}</h2>
        <div className='h-4 md:h-6' />
        <ParsedText className='font-rock text-center'>{description}</ParsedText>
        <div className='h-8 md:h-[3.75rem]' />
        <div className='max-md:contents flex gap-4'>
          <div className='max-md:contents flex flex-col md:w-1/2'>
            <div className='grid grid-cols-2 gap-4'>
              {cards.map(({ id, image, text }) => (
                <Card
                  key={id}
                  className='col-span-1 flex flex-col gap-2 text-center items-center px-2 text-2xs'
                >
                  <div>
                    <Image src={image} alt={text} width={20} height={20} />
                  </div>
                  <ParsedText className='font-base-semibold'>{text}</ParsedText>
                </Card>
              ))}
            </div>
            <div className='h-8 md:h-10' />
            <ParsedText className='font-base'>{subtitle}</ParsedText>
            <div className='h-8 md:h-10' />
            <Button className='max-md:hidden' href='/about-us' as='link'>
              {' '}
              О проекте
            </Button>
          </div>

          <div className='w-full md:w-1/2 relative'>
            <div className='aspect-w-4 aspect-h-3 relative w-full'>
              <Image
                src={image}
                alt={title}
                width={500}
                height={500}
                className='object-contain'
              />
            </div>
          </div>
          <div className='h-8 md:hidden' />
          <Button fullWidth className='md:hidden' href='/about-us' as='link'>
            О проекте
          </Button>
        </div>
        <div className='h-8 md:h-[3.75rem]' />
      </Container>
    </section>
  );
};
