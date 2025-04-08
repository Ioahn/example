import { GregorianCalendar } from '@internationalized/date';
import { useMemo, useState } from 'react';
import { DateFormatter, useDateFormatter } from 'react-aria';
import {
  RiArrowDropLeftLine,
  RiArrowDropRightLine,
  RiArrowLeftDoubleLine,
  RiArrowRightDoubleLine,
} from 'react-icons/ri';
import { useMedia } from 'react-use';
import { selectScheduler, selectTimezone } from '@entities/models';
import { ExpandableBlock } from '@features/specialist';
import { TScheduleSlotSchema, TWeekDayScheduleSlotsSchema } from '@shared/api';
import { fl } from '@shared/utils';
import { useAppSelector } from '@shared/hooks';
import { Button, Card, Collapse } from '@shared/UI';
import { ScheduleColumn } from './ScheduleColumn';
import { ScheduleHeader } from './ScheduleHeader';

export const useCalendar = (
  schedules: TWeekDayScheduleSlotsSchema[],
  timeZone: string
) => {
  const [weekCount, setWeekCount] = useState(0);

  const schedulesWithTimeZone = useMemo(() => {
    let toYesterday: TScheduleSlotSchema[] = [];
    let today: TScheduleSlotSchema[] = [];
    let toNextDay: TScheduleSlotSchema[] = [];

    const schedulesTimeZone = schedules.reduce(
      (
        res: TWeekDayScheduleSlotsSchema[],
        day: TWeekDayScheduleSlotsSchema
      ) => {
        const currentDate = new Date(
          new Date(day.date * 1000).toLocaleString('en', {
            timeZone: 'UTC',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        );

        if (toNextDay.length) {
          today = today.concat(toNextDay);

          toNextDay = [];
        }

        day.slots?.forEach((slot) => {
          const slotDateWithTimeZone = new Date(
            new Date(slot.slot_date * 1000).toLocaleString('en', {
              timeZone,
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })
          );

          if (currentDate > slotDateWithTimeZone) {
            toYesterday.push(slot);

            return;
          }

          if (currentDate < slotDateWithTimeZone) {
            toNextDay.push(slot);

            return;
          }

          today.push(slot);
        });

        if (toYesterday.length) {
          const prevDay = res.pop();
          if (prevDay) {
            prevDay.slots = prevDay.slots?.concat(toYesterday);
            res.push(prevDay);
          } else {
            res.push({
              date: toYesterday?.at(0)?.slot_date as number,
              slots: toYesterday,
            });
          }

          toYesterday = [];
        }

        res.push(Object.assign({}, day, { slots: today }));

        today = [];

        return res;
      },
      []
    );

    if (toNextDay.length > 0) {
      schedulesTimeZone.push({
        date: toNextDay?.at(0)?.slot_date as number,
        slots: toNextDay,
      });
    }

    return schedulesTimeZone;
  }, [schedules, timeZone]);

  const week = useMemo(
    () => schedulesWithTimeZone.slice(weekCount, weekCount + 7),
    [weekCount, schedulesWithTimeZone]
  );

  return {
    week,
    nextDay: () =>
      setWeekCount((state) =>
        schedulesWithTimeZone[state + 8] ? state + 1 : state
      ),
    pastDay: () =>
      setWeekCount((state) =>
        schedulesWithTimeZone[state - 1] ? state - 1 : 0
      ),
    nextWeek: () =>
      setWeekCount((state) =>
        schedulesWithTimeZone[state + 14]
          ? state + 7
          : schedulesWithTimeZone.length - 7
      ),
    pastWeek: () =>
      setWeekCount((state) =>
        schedulesWithTimeZone[state - 7] ? state - 7 : 0
      ),
  };
};
export const WeekView = () => {
  const timeZone = useAppSelector(selectTimezone);
  const schedules = useAppSelector(selectScheduler);
  const isDesktop = useMedia('(min-width: 640px)', false);

  const month = useDateFormatter({
    month: 'long',
    timeZone,
    calendar: typeof GregorianCalendar,
  });

  const year = useDateFormatter({
    year: 'numeric',
    timeZone,
    calendar: typeof GregorianCalendar,
  });

  const weekDay = useDateFormatter({
    weekday: 'long',
    timeZone,
    calendar: typeof GregorianCalendar,
  });

  const { week, nextDay, pastDay, nextWeek, pastWeek } = useCalendar(
    schedules,
    timeZone
  );

  // TODO нужно отработать случай когда schedules []
  if (week.length === 0) {
    return null;
  }

  if (isDesktop) {
    return (
      <DesktopView
        timeZone={timeZone}
        month={month}
        year={year}
        week={week}
        nextWeek={nextWeek}
        pastWeek={pastWeek}
        pastDay={pastDay}
        nextDay={nextDay}
      />
    );
  }

  return (
    <MobileView
      timeZone={timeZone}
      weekDay={weekDay}
      week={week}
      nextWeek={nextWeek}
      pastWeek={pastWeek}
      month={month}
    />
  );
};

type ViewProps = {
  month: DateFormatter;
  year: DateFormatter;
  weekDay: DateFormatter;
  pastWeek?: () => void;
  nextWeek?: () => void;
  pastDay: () => void;
  nextDay: () => void;
  week: TWeekDayScheduleSlotsSchema[];
  timeZone: string;
};

const DesktopView: FCC<Omit<ViewProps, 'weekDay'>> = ({
  month,
  week,
  year,
  pastWeek,
  nextWeek,
  nextDay,
  pastDay,
  timeZone,
}) => (
  <>
    <div className='mb-2 flex items-center justify-between max-md:hidden'>
      <p className='flex gap-2 font-semibold'>
        {fl(month.format(new Date(week[0].date * 1000)))}
        <span className='text-content-accent'>
          {year.format(new Date(week[0].date * 1000))}
        </span>
      </p>
      <div className='flex gap-2'>
        <Button
          variant='secondary'
          size='icon-sm'
          className='rounded-full p-2'
          startIcon={<RiArrowLeftDoubleLine />}
          onPress={pastWeek}
        />
        <Button
          variant='secondary'
          size='icon-sm'
          className='rounded-full'
          startIcon={<RiArrowDropLeftLine className='text-md' />}
          onPress={pastDay}
        />
        <Button
          variant='secondary'
          size='icon-sm'
          className='rounded-full'
          startIcon={<RiArrowDropRightLine className='text-md' />}
          onPress={nextDay}
        />
        <Button
          variant='secondary'
          size='icon-sm'
          className='rounded-full p-2'
          startIcon={<RiArrowRightDoubleLine />}
          onPress={nextWeek}
        />
      </div>
    </div>
    <Card
      size='clear'
      className='overflow-hidden pt-0 outline outline-1 outline-border-primary'
    >
      <div className='-mx-6'>
        <div className='grid grid-cols-7 items-center border-t-4  bg-white outline outline-1 outline-border-primary'>
          {week.map((day) => (
            <ScheduleHeader
              key={day.date}
              date={day.date}
              active={!!day?.slots?.some(({ client }) => !!client)}
            />
          ))}
        </div>
        <Collapse isOpen>
          <div className='grid grid-cols-7'>
            {week.map((day) => (
              <ScheduleColumn
                slots={day.slots}
                key={day.date}
                timeZone={timeZone}
              />
            ))}
          </div>
        </Collapse>
      </div>
    </Card>
  </>
);

const MobileView: FCC<
  Pick<
    ViewProps,
    'timeZone' | 'weekDay' | 'week' | 'nextWeek' | 'pastWeek' | 'month'
  >
> = ({ week, weekDay, month, timeZone, pastWeek, nextWeek }) => {
  const dateFormatter = useDateFormatter({
    day: 'numeric',
    month: 'numeric',
    timeZone: 'UTC',
    calendar: typeof GregorianCalendar,
  });

  const formatDay = (date: number) =>
    `${fl(weekDay.format(new Date(date * 1000)))} ${dateFormatter.format(
      new Date(date * 1000)
    )}`;

  return (
    <div className='flex flex-col gap-2 md:hidden'>
      <div className='flex justify-between my-4 items-center'>
        <Button
          variant='secondary'
          size='icon-sm'
          className='rounded-full p-2'
          startIcon={<RiArrowLeftDoubleLine className='text-md' />}
          onPress={pastWeek}
        />
        <p>{fl(month.format(new Date(week[0].date * 1000)))}</p>
        <Button
          variant='secondary'
          size='icon-sm'
          className='rounded-full p-2'
          startIcon={<RiArrowRightDoubleLine className='text-md' />}
          onPress={nextWeek}
        />
      </div>
      {week.map((day) => (
        <ExpandableBlock title={formatDay(day.date)} key={day.date}>
          <ScheduleColumn slots={day.slots} timeZone={timeZone} />
        </ExpandableBlock>
      ))}
    </div>
  );
};
