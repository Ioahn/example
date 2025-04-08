import { ParsedText } from '@features/landing';
import { cn } from '@shared/utils';
import { Button, Card, Container, Image } from '@shared/UI';

type Props = {
  title: string;
  subtitle: string;
  blocks: {
    id: number;
    title: string;
    goals: {
      id: number;
      icon: string;
      text: string;
    }[];
  }[];
};

export const Goals: FCC<Props> = function Goals({ title, subtitle, blocks }) {
  return (
    <section className='bg-content-tertiary/20'>
      <Container className={cn('flex flex-col items-center')} type='landing'>
        <div className='h-8 md:h-[3.75rem]' />
        <h2 className='font-galaxy text-center'>{title}</h2>
        <div className='h-6' />
        <p className='font-rock text-center'>{subtitle}</p>
        <div className='h-8 md:h-[3.75rem]' />
        <div className='flex flex-col md:flex-row gap-4'>
          {blocks.map(({ id, title, goals }) => (
            <Card
              key={id}
              variant='secondary'
              className='flex flex-col md:w-1/2'
            >
              <ParsedText className='font-rock-semibold'>{title}</ParsedText>
              <div className='h-6 md:h-9' />
              <ul className='gap-4 flex flex-col'>
                {goals.map(({ id, icon, text }) => (
                  <li className='flex gap-4 items-center' key={id}>
                    <div className='shrink-0'>
                      <Image src={icon} alt={text} width={24} height={24} />
                    </div>
                    <span className='font-base'>{text}</span>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
        <div className='h-6 md:h-9' />
        <Button
          className='max-md:max-w-none max-md:w-full'
          href='#business-request-form'
          as='link'
        >
          Оставить заявку
        </Button>
        <div className='h-8 md:h-[3.75rem]' />
      </Container>
    </section>
  );
};
