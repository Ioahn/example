import { ParsedText } from '@features/landing';
import { cn } from '@shared/utils';
import { Card, Container, Image } from '@shared/UI';

type Props = {
  title: string;
  blocks: {
    id: number;
    image: string;
    name: string;
    description: string;
    list: {
      id: number;
      text: string;
      variant: string;
    }[];
  }[];
};

export const Founders: FCC<Props> = function Founders({
  className,
  title,
  blocks,
}) {
  return (
    <section className='bg-bg-primary'>
      <Container
        className={cn('flex flex-col gap-6', className)}
        type='landing'
      >
        <div className='h-4' />
        <h2 className='font-galaxy-semibold text-center'>{title}</h2>
        <div className='grid grid-cols-2 gap-6'>
          {blocks.map(({ id, image, name, list, description }) => (
            <Card
              key={id}
              variant='secondary'
              className='col-span-2 md:col-span-1 flex flex-col gap-4'
            >
              <div className='w-full aspect-w-4 aspect-h-3 relative overflow-hidden rounded-2xl'>
                <Image
                  src={image}
                  alt={name}
                  fill
                  className='object-cover object-top'
                />
              </div>
              <ParsedText className='font-rock-semibold'>{name}</ParsedText>
              <ParsedText className='font-base-semibold'>
                {description}
              </ParsedText>
              <div>
                <ul className='gap-4 flex flex-col pt-4'>
                  {list.map(({ id, text, variant }) => (
                    <li className='flex gap-4 items-start' key={id}>
                      <div
                        className={cn(
                          'w-2 h-2 mt-1.5 rounded-full outline outline-border-primary flex-shrink-0',
                          {
                            ['bg-content-accent']: variant === 'primary',
                            ['bg-content-accent-vivid']:
                              variant === 'secondary',
                          }
                        )}
                      />
                      <ParsedText className='font-base'>{text}</ParsedText>
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          ))}
        </div>
        <div className='h-4' />
      </Container>
    </section>
  );
};
