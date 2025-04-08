import { GregorianCalendar } from '@internationalized/date';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { DateFormatter, useDateFormatter } from 'react-aria';
import {
  RiArrowDropLeftLine,
  RiArrowDropRightLine,
  RiArrowLeftDoubleLine,
  RiArrowRightDoubleLine,
} from 'react-icons/ri';
import { useMedia } from 'react-use';
import {
  changeClientSlotTime,
  moveSessionClientStateLoaderSelector,
  selectClientSpecialist,
  selectTimezone,
} from '@entities/models';
import {
  ExpandableBlock,
  ScheduleCell,
  SelectTimeZone,
  useCalendar,
} from '@features/specialist';
import { ScheduleHeader } from '@features/specialist/calendar/components/ScheduleHeader';
import { TWeekDayScheduleSlotsSchema } from '@shared/api';
import { convertUnixTimeIntl, fl } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, Card, Collapse } from '@shared/UI';

export const ClientPostponeView = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [activeSlot, setActiveSlot] = useState('');
  const timeZone = useAppSelector(selectTimezone);
  const specialist = useAppSelector(selectClientSpecialist);
  const { moveSessionClientStateLoader } = useAppSelector(
    moveSessionClientStateLoaderSelector
  );
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
    specialist?.schedule_slots.for_single as TWeekDayScheduleSlotsSchema[],
    timeZone
  );

  return (
    <Card variant='secondary' className='flex flex-col gap-4'>
      <div className='flex justify-between flex-wrap'>
        <h1 className='font-semibold sm:text-md'>Расписание</h1>
        <div className='max-md:hidden'>
          <SelectTimeZone />
        </div>
      </div>
      <div>
        {isDesktop ? (
          <DesktopView
            timeZone={timeZone}
            month={month}
            year={year}
            week={week}
            nextWeek={nextWeek}
            pastWeek={pastWeek}
            pastDay={pastDay}
            nextDay={nextDay}
            selectedSlot={activeSlot}
            selectSlot={setActiveSlot}
          />
        ) : (
          <MobileView
            timeZone={timeZone}
            weekDay={weekDay}
            week={week}
            selectedSlot={activeSlot}
            selectSlot={setActiveSlot}
          />
        )}
      </div>
      <div>
        <Button
          fullWidth
          onPress={() => {
            dispatch(
              changeClientSlotTime({
                new_specialist_slot_id: activeSlot,
                session_id: router.query.slotId as string,
              })
            );
          }}
          loaderState={moveSessionClientStateLoader}
        >
          Продолжить
        </Button>
      </div>
      <div className='text-center'>
        Не нашли подходящего времени?{' '}
        <Button
          className='text-content-accent inline-block'
          variant='clear'
          onPress={() => carrotquest.open()}
        >
          Напишите нам
        </Button>
      </div>
    </Card>
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
  selectSlot: (arg: string) => void;
  selectedSlot: string;
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
  selectSlot,
  selectedSlot,
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
              active={!!day?.slots?.length}
            />
          ))}
        </div>
        <Collapse isOpen>
          <div className='grid grid-cols-7'>
            {week.map((day) => (
              <div
                className='flex gap-2 p-2 max-md:flex-wrap sm:flex-col'
                key={day.date}
              >
                {day?.slots?.map((slot) => (
                  <ScheduleCell
                    key={slot.id}
                    onClick={() => selectSlot(slot.id)}
                    active={selectedSlot === slot.id}
                  >
                    <span>
                      {convertUnixTimeIntl(+slot.slot_date, timeZone).time}
                    </span>
                  </ScheduleCell>
                ))}
              </div>
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
    'timeZone' | 'weekDay' | 'week' | 'selectedSlot' | 'selectSlot'
  >
> = ({ week, weekDay, timeZone, selectSlot, selectedSlot }) => (
  <div className='flex flex-col gap-2'>
    {week.map((day) => (
      <ExpandableBlock
        title={fl(weekDay.format(new Date(day.date * 1000)))}
        key={day.date}
      >
        <div className='flex gap-2 p-2 max-md:flex-wrap sm:flex-col'>
          {day?.slots?.map((slot) => (
            <ScheduleCell
              key={slot.id}
              onClick={() => selectSlot(slot.id)}
              active={selectedSlot === slot.id}
            >
              <span>{convertUnixTimeIntl(+slot.slot_date, timeZone).time}</span>
            </ScheduleCell>
          ))}
        </div>
      </ExpandableBlock>
    ))}
  </div>
);
