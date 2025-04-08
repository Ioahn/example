import { cn } from '@shared/utils';

type Props = {
  onClick?: (id: string | number) => void;
  id?: string | number;
  disabled?: boolean;
  active?: boolean;
};

export const ScheduleCell: FCC<Props> = ({
  id,
  children,
  className,
  onClick,
  disabled,
  active,
}) => (
  <div
    onClick={() => !disabled && onClick?.(id as number)}
    className={cn(
      'inline-flex cursor-pointer items-center justify-center rounded-xl bg-bg-secondary p-4 outline outline-1 outline-border-primary sm:w-full',
      {
        ['text-content-tertiary']: disabled,
        ['relative before:absolute before:pointer-events-none before:inset-0 before:rounded-xl  before:border-2 before:border-border-active before:outline before:outline-[3px] before:outline-border-primary before:content-[""]']:
          active,
      },
      className
    )}
  >
    {children}
  </div>
);
