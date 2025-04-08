import { ComponentProps } from 'react';
import { ParsedText, VideoPreview } from '@features/landing';
import { cn } from '@shared/utils';
import { Container } from '@shared/UI';

type Props = {
  title: string;
  description: string;
  about: {
    id: number;
    title: string;
  }[];
  video: ComponentProps<typeof VideoPreview>;
};

export const Founder: FCC<Props> = function Founder({
  description,
  className,
  title,
  about,
  video,
}) {
  return (
    <section className='relative'>
      <Container
        className={cn(
          'grid-cols-6 grid md:grid-cols-12 gap-x-8 grid-flow-dense',
          className
        )}
        type='landing'
      >
        <div className='h-8 md:h-[3.75rem] col-span-6 md:col-span-12' />
        <h2 className='col-span-6 md:col-span-12 font-galaxy-semibold text-center'>
          {title}
        </h2>
        <div className='h-4 col-span-6 md:col-span-12' />
        <ParsedText className='col-span-6 md:col-span-12 font-rock text-center'>
          {description}
        </ParsedText>
        <div className='h-8 md:h-[3.75rem] col-span-6 md:col-span-12' />
        <div className='col-span-6 md:order-1'>
          <VideoPreview className='aspect-w-16 aspect-h-9' {...video} />
        </div>
        <div className='h-8 md:hidden col-span-6' />
        <div className='col-span-6'>
          <ul className='gap-4 flex flex-col pt-4'>
            {about.map(({ id, title }) => (
              <li className='flex gap-8 items-start' key={id}>
                <div
                  className={
                    'w-2 bg-content-accent-vivid h-2 mt-1.5 rounded-full outline outline-border-primary flex-shrink-0'
                  }
                />
                <ParsedText className='font-base'>{title}</ParsedText>
              </li>
            ))}
          </ul>
        </div>
        <div className='h-8 md:h-[3.75rem] col-span-6 md:col-span-12' />
      </Container>
    </section>
  );
};
