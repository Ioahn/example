import { ParsedText } from '@features/landing';
import { cn } from '@shared/utils';
import { Card, Container } from '@shared/UI';

type Props = {
  title: string;
  subtitle: string;
  cards: { id: number; title: string; description: string; type: string }[];
};

export const AboutProject: FCC<Props> = function AboutProject({
  className,
  title,
  subtitle,
  cards,
}) {
  return (
    <section className='bg-black'>
      <Container
        className={cn('flex flex-col gap-6', className)}
        type='landing'
      >
        <div className='h-4' />
        <h2 className='font-galaxy-semibold text-center text-content-inverse'>
          {title}
        </h2>
        <ParsedText className='font-rock text-center text-content-inverse'>
          {subtitle}
        </ParsedText>
        <div className='grid grid-cols-3 gap-4'>
          {cards.map(({ id, title, type, description }) => (
            <Card
              key={id}
              className={cn(
                'group col-span-3 md:col-span-1 flex flex-col gap-4 pt-8',
                {
                  ['bg-gradient-to-r from-[#34BEB6] to-[#258F9D] text-content-inverse']:
                    type === 'primary',
                  ['bg-white']: type === 'secondary',
                  ['bg-gradient-to-r from-[#FF6422] to-[#FF4F62] text-content-inverse']:
                    type === 'tertiary',
                }
              )}
            >
              <ParsedText className='font-rock-semibold'>{title}</ParsedText>
              <ParsedText className='font-base'>{description}</ParsedText>
            </Card>
          ))}
        </div>
        <div className='h-8' />
      </Container>
    </section>
  );
};
