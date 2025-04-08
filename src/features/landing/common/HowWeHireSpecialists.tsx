import { RiCheckLine } from 'react-icons/ri';
import { ParsedText } from '@features/landing';
import { cn } from '@shared/utils';
import { Container, Image } from '@shared/UI';

type Props = {
  description: string;
  title: string;
  image: string;
  subTitle: string;
  criteria: {
    id: number;
    text: string;
  }[];
};

export const HowWeHireSpecialists: FCC<Props> = function HowWeHireSpecialists({
  title,
  description,
  image,
  subTitle,
  criteria,
}) {
  return (
    <section>
      <Container
        className={cn(
          'grid-cols-6 grid md:grid-cols-12 gap-x-8 grid-flow-dense'
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
        <div className='col-span-6'>
          <div className='relative aspect-w-4 aspect-h-3'>
            <Image fill src={image} alt={image} className='object-contain' />
          </div>
        </div>
        <div className='h-6 col-span-6 md:hidden' />
        <div className='col-span-6'>
          <h3 className='font-rock-semibold'>{subTitle}</h3>
          <div className='h-8 md:h-10' />
          <ul className='md:gap-6 gap-4 flex flex-col'>
            {criteria.map(({ id, text }) => (
              <li className='flex gap-6 items-start' key={id}>
                <div className='relative shrink-0 w-6 h-6 bg-bg-inverse-primary/40 rounded-full'>
                  <div className='absolute inset-0 flex justify-center items-center'>
                    <RiCheckLine className='text-md text-content-inverse' />
                  </div>
                </div>
                <div
                  className='font-base'
                  dangerouslySetInnerHTML={{ __html: text }}
                ></div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
      <div className='h-8 md:h-[3.75rem] col-span-6 md:col-span-12' />
    </section>
  );
};
