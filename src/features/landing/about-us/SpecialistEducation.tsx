import { ParsedText } from '@features/landing';
import { cn } from '@shared/utils';
import { Button, Container, Image } from '@shared/UI';

type Props = {
  title: string;
  description: string;
  programs: {
    id: number;
    title: string;
    list: {
      id: number;
      text: string;
      image: string;
    }[];
    aboutProgramUrl: string;
  }[];
};

export const SpecialistEducation: FCC<Props> = function SpecialistEducation({
  className,
  description,
  title,
  programs,
}) {
  return (
    <section>
      <Container
        className={cn('flex flex-col gap-6', className)}
        type='landing'
      >
        <div className='h-6' />
        <h2 className='font-galaxy-semibold text-center'>{title}</h2>
        <ParsedText className='font-rock text-center'>{description}</ParsedText>
        <div className='grid grid-cols-2'>
          {programs.map(({ id, title, list, aboutProgramUrl }) => (
            <div
              key={id}
              className='col-span-2 md:col-span-1 flex flex-col gap-4'
            >
              <div className='pt-12'>
                <ParsedText className='font-rock-semibold'>{title}</ParsedText>
              </div>
              <div>
                <ul className='gap-6 flex flex-col pt-4'>
                  {list.map(({ id, text, image }) => (
                    <li className='flex gap-4 items-start' key={id}>
                      <Image
                        className='shrink-0'
                        width={24}
                        height={24}
                        src={image}
                        alt={text}
                      />
                      <ParsedText className='font-base'>{text}</ParsedText>
                    </li>
                  ))}
                </ul>
              </div>
              <Button
                className='max-md:max-w-none max-md:w-full mt-2'
                as='link'
                href={aboutProgramUrl}
              >
                О программе
              </Button>
            </div>
          ))}
        </div>
        <div className='h-6' />
      </Container>
    </section>
  );
};
