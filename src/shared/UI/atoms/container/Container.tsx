import { cn } from '@shared/utils';

type Props = {
  type?: 'default' | 'landing';
};

export const Container: FCC<Props> = ({
  children,
  className,
  type = 'default',
}) => (
  <div
    className={cn('container mx-auto px-4', className, {
      ['max-w-[76rem]']: type === 'landing',
    })}
  >
    {children}
  </div>
);
