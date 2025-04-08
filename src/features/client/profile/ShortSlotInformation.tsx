import React from 'react';
import {
  selectPurchaseSlot,
  selectSpecialistSlot,
  selectTimezone,
} from '@entities/models';
import { cn } from '@shared/utils';
import { useAppSelector } from '@shared/hooks';
import { FormattedDate, FormattedTime } from '@shared/UI';

export const ShortSlotInformation: FCC = function ShortSlotInformation({
  className,
}) {
  const timeZone = useAppSelector(selectTimezone);
  const activeSlot = useAppSelector(selectPurchaseSlot) as string;
  const slots = useAppSelector(selectSpecialistSlot);

  const slot = slots.find(({ id }) => id === activeSlot);

  if (!slot) {
    return null;
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <FormattedDate
        timeZone={timeZone}
        date={slot.date}
        day='2-digit'
        month='short'
        className='font-semibold max-md:text-xs whitespace-nowrap capitalize'
      />
      <FormattedTime
        timeZone={timeZone}
        date={slot.date}
        className='max-md:text-xs'
      />
    </div>
  );
};
