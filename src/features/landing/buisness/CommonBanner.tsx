import { ParsedText } from '@features/landing';
import { cn } from '@shared/utils';
import { Button, Container, Image } from '@shared/UI';

type Props = {
  title: string;
  image: string;
  quote?: {
    description?: string;
    author?: string;
    subtitle?: string;
  };
  button: {
    href: string;
    text: string;
  };
};

export const CommonBanner: FCC<Props> = function BusinessBanner({
  className,
  title,
  quote,
  image,
  button,
}) {
  return (
    <section>
      <div className='h-8 md:h-[3.75rem]' />
      <Container
        className={cn('flex flex-col md:flex-row', className)}
        type='landing'
      >
        <div className='md:w-3/5'>
          <h1 className='font-universe-semibold z-10 relative'>
            <ParsedText className='max-md:text-center'>{title}</ParsedText>
          </h1>

          <div className='h-4 md:h-[3.75rem]' />

          <div className='flex flex-col md:gap-8 gap-4 z-10 relative'>
            {quote?.description && (
              <div className='font-rock'>
                <ParsedText className='max-md:text-center'>
                  {quote.description}
                </ParsedText>
              </div>
            )}

            <div className='relative w-full aspect-w-5 aspect-h-7  md:w-2/5 md:hidden -my-8'>
              <Image
                src={image}
                alt='Rossohin'
                width={500}
                height={700}
                className='object-contain'
                loading='eager'
              />
            </div>

            {quote?.author && (
              <span className='self-start font-base-semibold '>
                {quote.author}
              </span>
            )}

            {quote?.subtitle && (
              <ParsedText className='font-base'>{quote.subtitle}</ParsedText>
            )}
          </div>

          <div className='h-8 md:h-[3.75rem]' />

          <Button
            className='max-md:w-full max-md:max-w-none'
            href={button.href}
            as='link'
          >
            {button.text}
          </Button>
        </div>
        <div className='relative md:w-2/5 max-md:hidden'>
          <div className='absolute w-full inset-0'>
            <Image
              src={image}
              alt='Rossohin'
              width={500}
              height={700}
              className='object-contain'
              loading='eager'
            />
          </div>
        </div>
      </Container>
      <div className='h-8 md:h-[3.75rem]' />
    </section>
  );
};
