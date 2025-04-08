import { animated } from '@react-spring/web';
import { useState } from 'react';
import { useMount } from 'react-use';
import { setPurchasedSlots } from '@entities/models';
import { ScheduleButton } from '@features/client';
import { TBaseScheduleSlotSchema } from '@shared/api';
import { cn, convertUnixTimeIntl } from '@shared/utils';
import { useAnimatedUnderline, useAppDispatch } from '@shared/hooks';

export const Slots: FCC<{
  slots?: TBaseScheduleSlotSchema[];
}> = ({ slots, className }) => {
  const dispatch = useAppDispatch();
  const [activeElement, setActiveElement] = useState(slots?.[0].id);

  const { renderElements, underlineProps, containerRef } = useAnimatedUnderline(
    {
      activeElement,
      items: slots || [],
    }
  );

  const onSlotSelect = (id: string) => {
    slots && slots.length && dispatch(setPurchasedSlots(id));
    setActiveElement(id);
  };

  useMount(() => {
    slots && slots.length && dispatch(setPurchasedSlots(slots?.[0].id));
  });

  return (
    <div
      className={cn('relative flex gap-4 flex-wrap', className)}
      ref={containerRef}
    >
      {renderElements((slot, ref) => (
        <div
          ref={ref(slot.id)}
          onClick={() => onSlotSelect(slot.id)}
          key={slot.id}
        >
          <ScheduleButton className='min-w-[40px] cursor-pointer select-none rounded-xl'>
            {convertUnixTimeIntl(+slot.slot_date).time}
          </ScheduleButton>
        </div>
      ))}
      {!!slots?.length || !activeElement ? (
        <animated.div
          style={underlineProps}
          className='border-1 pointer-events-none absolute rounded-xl border border-border-active bg-transparent outline outline-[3px] outline-border-primary'
        />
      ) : (
        <p className='text-content-tertiary'>На этот день все занято</p>
      )}
    </div>
  );
};
