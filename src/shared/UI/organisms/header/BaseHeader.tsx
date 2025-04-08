import { BackButton } from '@features/navigation-panel';
import { cn } from '@shared/utils';
import { Container, Image, Link } from '@shared/UI';

export const BaseHeader: FCC = ({ children, className }) => {
  return (
    <header
      className={cn(
        'sticky top-0 z-10 bg-bg-primary/50 pb-2.5 pt-5 backdrop-blur-md max-md:py-4',
        className
      )}
    >
      <Container className='flex items-center justify-between gap-3'>
        <BackButton className='md:hidden' />
        <Link href='/' className='h-4' prefetch={false}>
          <Image
            quality={100}
            alt='SenseA'
            src='/logo.png'
            width={100}
            height={20}
            priority
            className='h-full w-auto sm:block'
          />
        </Link>
        {children}
      </Container>
    </header>
  );
};
