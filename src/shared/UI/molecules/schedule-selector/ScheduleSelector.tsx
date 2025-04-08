import { fromAbsolute } from '@internationalized/date';
import { groupBy, toPairs } from 'ramda';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useDateFormatter } from 'react-aria';
import { Item } from 'react-stately';
import { cn } from '@shared/utils';
import { AnimatedList, Button, FormattedDate, FormattedTime } from '@shared/UI';

type Schedule = { id: string; date: number };

type Props = {
  schedule: Schedule[];
  timeZone: string;
  onSelect: (slotId: Maybe<string>) => void;
  defaultActiveTime?: string;
};

const SlotButton: FCC = function SlotButton({ className, children, ...rest }) {
  return (
    <div
      {...rest}
      className={cn(
        'flex flex-col items-center justify-center md:p-3 p-2 outline outline-1 outline-border-primary',
        className
      )}
    >
      {children}
    </div>
  );
};

export const EmptySchedule: FCC = function EmptySchedule({ className }) {
  return (
    <div className={className}>
      <p className='mb-4 mt-8'>
        Нет свободных дат. Пожалуйста,{' '}
        <Button
          className='text-content-accent inline-block'
          variant='clear'
          onPress={() => carrotquest.open()}
        >
          свяжитесь с нами
        </Button>
        {', '}
        чтобы обсудить все возможные варианты.
      </p>
    </div>
  );
};

const useSlotSchedule = (schedule: Schedule[], timeZone: string) => {
  const dayFormatter = useDateFormatter({ dateStyle: 'full' });

  const getDate = useCallback(
    (date: number) => fromAbsolute(date * 1000, timeZone),
    [timeZone]
  );

  return useMemo(() => {
    const groupByDay = groupBy((item: Schedule) =>
      dayFormatter.format(getDate(item.date).toDate())
    );

    const transformGroups = (schedule: Schedule[]) => {
      const grouped = groupByDay(schedule);
      const entity = new Map<string, Schedule[]>();
      const ids: { id: string; date: number }[] = [];

      toPairs(grouped).forEach(([day, slots = []]) => {
        entity.set(day, slots);
        ids.push({ id: day, date: slots[0].date });
      });

      return { ids, entity };
    };

    return transformGroups(schedule);
  }, [dayFormatter, getDate, schedule]);
};

const useDefaultDate = (
  schedule: Schedule[],
  timeZone: string,
  defaultActiveTime?: string
) => {
  const dayFormatter = useDateFormatter({ dateStyle: 'full' });

  const getDate = useCallback(
    (date: number) =>
      dayFormatter.format(fromAbsolute(date * 1000, timeZone).toDate()),
    [dayFormatter, timeZone]
  );

  const slot = schedule.find((slot) => slot.id === defaultActiveTime);

  if (!defaultActiveTime || !slot) {
    return [getDate(schedule[0].date), schedule[0].id];
  }

  return [getDate(slot.date), slot.id];
};

export const ScheduleSelector: FCC<Props> = function ScheduleSelector({
  className,
  schedule,
  timeZone,
  onSelect,
  defaultActiveTime,
}) {
  const dates = useSlotSchedule(schedule, timeZone);
  const [defaultDate, defaultSlot] = useDefaultDate(
    schedule,
    timeZone,
    defaultActiveTime
  );

  const [activeDate, setActiveDate] = useState(defaultDate);
  const [activeTime, setActiveTime] = useState(defaultSlot);

  const slots = useMemo(
    () => dates.entity.get(activeDate) || [],
    [dates.entity, activeDate]
  );

  useEffect(() => {
    onSelect(activeTime);
  }, [activeTime, onSelect]);

  if (schedule.length === 0) {
    return <EmptySchedule className={className} />;
  }

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <div className='flex flex-col gap-3'>
        <p className='font-bold max-md:text-xs'>Доступные даты</p>

        <AnimatedList
          items={dates.ids}
          defaultSelectedKeys={[activeDate]}
          onSelectionChange={([key]) => {
            setActiveDate(key as string);
            const [firstTime] = dates.entity.get(key as string) || [];

            setActiveTime(firstTime.id);
          }}
          underlineClassName='animated-underline'
        >
          {({ id, date }) => (
            <Item key={id} textValue={id}>
              <SlotButton className='rounded-xl w-20'>
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
              </SlotButton>
            </Item>
          )}
        </AnimatedList>
      </div>
      <div className='flex flex-col gap-2'>
        <p className='font-bold max-md:text-xs'>Доступное время</p>

        <div>
          {slots.length > 0 ? (
            <AnimatedList
              items={slots}
              defaultSelectedKeys={[defaultSlot]}
              selectedKeys={[activeTime]}
              onSelectionChange={([key]) => setActiveTime(key as string)}
              underlineClassName='animated-underline'
            >
              {(slot) => (
                <Item key={slot.id} textValue={slot.id}>
                  <SlotButton className='cursor-pointer select-none rounded-xl w-20'>
                    <FormattedTime
                      timeZone={timeZone}
                      date={slot.date}
                      className='max-md:text-xs'
                    />
                  </SlotButton>
                </Item>
              )}
            </AnimatedList>
          ) : (
            <p className='text-content-tertiary'>На этот день все занято</p>
          )}
        </div>
      </div>
    </div>
  );
};
