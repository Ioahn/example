import { GregorianCalendar } from '@internationalized/date';
import { DateFormatter, useDateFormatter } from 'react-aria';
import {
  RiArrowDropLeftLine,
  RiArrowDropRightLine,
  RiArrowLeftDoubleLine,
  RiArrowRightDoubleLine,
} from 'react-icons/ri';
import { useMedia } from 'react-use';
import {
  selectPurchaseSlot,
  selectSpecialist,
  selectTimezone,
  setPurchasedSlots,
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

export const OneSessionPriseOptionView = () => {
  const dispatch = useAppDispatch();
  const activeSlot = useAppSelector(selectPurchaseSlot) as string;
  const timeZone = useAppSelector(selectTimezone);
  const specialist = useAppSelector(selectSpecialist);
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
            selectSlot={(slot) => dispatch(setPurchasedSlots(slot))}
          />
        ) : (
          <MobileView
            timeZone={timeZone}
            weekDay={weekDay}
            week={week}
            month={month}
            nextWeek={nextWeek}
            pastWeek={pastWeek}
            selectedSlot={activeSlot}
            selectSlot={(slot) => dispatch(setPurchasedSlots(slot))}
          />
        )}
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
    | 'timeZone'
    | 'month'
    | 'weekDay'
    | 'week'
    | 'pastWeek'
    | 'nextWeek'
    | 'selectedSlot'
    | 'selectSlot'
  >
> = ({
  week,
  month,
  weekDay,
  timeZone,
  pastWeek,
  nextWeek,
  selectSlot,
  selectedSlot,
}) => (
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
      <ExpandableBlock
        title={
          fl(weekDay.format(new Date(day.date * 1000))) +
          ', ' +
          convertUnixTimeIntl(day.date, timeZone).date
        }
        key={day.date}
      >
        <div className='flex gap-2 p-2 max-md:flex-wrap sm:flex-col'>
          {day?.slots?.map((slot) => (
            <ScheduleCell
              key={slot.id}
              onClick={() => selectSlot(slot.id)}
              active={selectedSlot === slot.id}
              className='flex flex-col gap-2'
            >
              <span>{convertUnixTimeIntl(+slot.slot_date, timeZone).time}</span>
            </ScheduleCell>
          ))}
        </div>
      </ExpandableBlock>
    ))}
  </div>
);
