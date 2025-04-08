import { cn } from '@shared/utils';

export const Dot: FCC = ({ className }) => (
  <div
    className={cn(
      'absolute right-[-0.25rem] top-[-0.25rem] h-[1rem] w-[1rem] rounded-full border border-[3px] border-bg-primary bg-content-accent-vivid  outline-border-primary',
      className
    )}
  />
);
