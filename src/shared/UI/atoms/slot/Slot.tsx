import React, { ReactNode } from 'react';
import { cn } from '@shared/utils';
import { FormattedDate } from '@shared/UI';

type SlotProps = {
  timeZone: string;
  date: number;
  description?: ReactNode;
};

export function Slot({
  className,
  timeZone,
  date,
  description,
}: CommonProps<SlotProps>) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center md:p-3 p-2 outline outline-1 rounded-xl w-20 outline-border-primary',
        className
      )}
    >
      <FormattedDate
        timeZone={timeZone}
        date={date as number}
        weekday='short'
        className='text-xs text-content-secondary uppercase'
      />
      <FormattedDate
        timeZone={timeZone}
        date={date as number}
        day='2-digit'
        month='short'
        className='max-md:text-xs whitespace-nowrap capitalize'
      />
      {description}
    </div>
  );
}
