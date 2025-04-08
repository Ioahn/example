import { ReactElement } from 'react';
import { cn } from '@shared/utils';
import { Container, Image, Link } from '@shared/UI';

type Props = {
  title?: string;
  variant?: 'primary' | 'secondary';
  elements?: () => ReactElement;
  noShadow?: boolean;
};

export const HeaderWithOverlay: FCC<Props> = ({
  elements,
  className,
  title,
  variant = 'primary',
  noShadow,
}) => {
  return (
    <header
      className={cn('pt-4 group', `header-with-overlay-${variant}`, className)}
    >
      <Container>
        <div
          className={cn(
            'flex min-h-[3.5rem] group-[.header-with-overlay-secondary]:bg-bg-secondary/50 group-[.header-with-overlay-secondary]:backdrop-blur-lg items-center group-[.header-with-overlay-primary]:justify-between gap-3 rounded-2xl group-[.header-with-overlay-primary]:bg-bg-secondary pl-8 pr-2 py-2 shadow-sm',
            { ['shadow-none']: noShadow }
          )}
        >
          <Link href='/' className='h-4 flex-shrink-0'>
            <div className='relative w-[117px] h-[19px]'>
              <Image
                width={100}
                quality={100}
                height={20}
                alt='SenseA'
                src='/logo.png'
                priority
                className='object-cover'
              />
            </div>
          </Link>
          {title && <span className='text-xs m-auto'>{title}</span>}
          {elements && elements()}
        </div>
      </Container>
    </header>
  );
};
