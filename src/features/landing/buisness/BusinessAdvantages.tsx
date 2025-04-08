import { cn } from '@shared/utils';
import { Button, Card, Container } from '@shared/UI';

type Props = {
  title: string;
  subtitle: string;
  cards: {
    id: number;
    title: string;
    description: string;
    type: string;
  }[];
};

export const BusinessAdvantages: FCC<Props> = function BusinessAdvantages({
  className,
  title,
  subtitle,
  cards,
}) {
  return (
    <section className='bg-black'>
      <div className='h-8 md:h-[3.75rem]' />
      <Container
        className={cn(
          'flex flex-col md:flex-row md:gap-6 md:items-center text-content-inverse',
          className
        )}
        type='landing'
      >
        <div className='md:w-1/2 max-md:contents'>
          <h2 className='font-galaxy max-md:text-center'>{title}</h2>
          <div className='md:h-10 h-6' />
          <p className='max-md:text-center text-content-inverse font-rock'>
            {subtitle}
          </p>
          <div className='h-10' />
          <Button
            variant='secondary'
            href='#business-request-form'
            as='link'
            className='max-md:hidden'
          >
            Оставить заявку
          </Button>
        </div>
        <div className='h-8 max-md:hidden' />
        <div className='flex flex-col md:w-1/2 items-center'>
          {cards.map(({ id, title, description, type }) => (
            <div
              key={id}
              className={cn(
                'w-[300px] md:w-[429px] text-content-inverse relative',
                {
                  ['']: type === 'primary',
                  ['-mt-10 md:ml-16 ml-4 z-10']: type === 'secondary',
                  ['-mt-10']: type === 'tertiary',
                }
              )}
            >
              <Card
                className={cn('flex flex-col md:p-10 p-4', {
                  ['bg-gradient-to-r from-[#34BEB6] to-[#258F9D] md:pb-16 pb-14']:
                    type === 'primary',
                  ['backdrop-blur-2xl bg-white/20']: type === 'secondary',
                  ['bg-gradient-to-r from-[#FF6422] to-[#FF4F62] justify-end md:pt-16 pt-14']:
                    type === 'tertiary',
                })}
              >
                <p className='font-rock-semibold'>{title}</p>
                <div className='md:h-10 h-3' />
                <p className='font-base'>{description}</p>
              </Card>
            </div>
          ))}
        </div>
        <div className='h-6 md:hidden' />
        <Button
          variant='secondary'
          href='#business-request-form'
          as='link'
          fullWidth
          className='md:hidden'
        >
          Оставить заявку
        </Button>
      </Container>
      <div className='h-8 md:h-[3.75rem]' />
    </section>
  );
};
