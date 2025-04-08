import { ParsedText } from '@features/landing';
import { cn } from '@shared/utils';
import { Container, Image } from '@shared/UI';

type Props = {
  title: string;
  steps: {
    id: number;
    title: string;
  }[];
};

export const Process: FCC<Props> = function Process({
  title,
  steps,
  className,
}) {
  return (
    <section>
      <Container className={cn('flex flex-col', className)} type='landing'>
        <div className='h-8 md:h-[3.75rem]' />
        <h2 className='font-galaxy text-center'>{title}</h2>
        <div className='h-6 md:h-8' />
        <div className='flex gap-6 max-md:contents'>
          <ul className='flex flex-col gap-4 md:w-1/2 md:justify-around'>
            {steps.map(({ id, title }) => (
              <div key={id} className='flex flex-col md:flex-row gap-4'>
                <div>
                  <div className='text-md border border-content-accent-vivid text-content-accent-vivid rounded-md inline-block w-[2rem] h-[2rem] text-center'>
                    {id}
                  </div>
                </div>
                <ParsedText className='font-rock'>{title}</ParsedText>
              </div>
            ))}
          </ul>
          <div className='md:w-1/2 h-[524px] max-md:hidden relative'>
            <Image
              src='/landing/buisness/happy-face.png'
              alt='happy face'
              width={500}
              height={500}
              className='object-contain'
            />
          </div>
        </div>
        <div className='h-8 md:h-[3.75rem]' />
      </Container>
    </section>
  );
};
