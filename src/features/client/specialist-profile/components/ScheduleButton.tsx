import { cn } from '@shared/utils';

type Props = {
  variant?: 'primary';
};

export const ScheduleButton: FCC<Props> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <div
      {...rest}
      className={cn(
        'flex flex-col items-center justify-center p-3 outline outline-1 outline-border-primary',
        className
      )}
    >
      {children}
    </div>
  );
};
