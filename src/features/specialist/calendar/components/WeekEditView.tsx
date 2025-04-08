import {
  CalendarDateTime,
  Time,
  getDayOfWeek,
  toTime,
  toTimeZone,
  toZoned,
} from '@internationalized/date';
import { times } from 'ramda';
import { Key, useCallback, useMemo, useState } from 'react';
import { useLocale } from 'react-aria';
import {
  RiAddFill,
  RiDeleteBinLine,
  RiInformationFill,
  RiTimeLine,
} from 'react-icons/ri';
import { Item } from 'react-stately';
import { useMedia } from 'react-use';
import { v4 } from 'uuid';
import {
  addSlot,
  clearSlots,
  editSlot,
  removeSlot,
  selectCalendarSettings,
  selectEditableSlot,
  selectTimezone,
  setEditableSlot,
  setMaxAhead,
  setMinHours,
} from '@entities/models';
import { ExpandableBlock } from '@features/specialist';
import { TWeekDay } from '@shared/api';
import { cn, getTimezoneOffset } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import {
  Button,
  Card,
  Collapse,
  MenuButton,
  MenuListItem,
  Select,
  TimeField,
  TooltipTrigger,
} from '@shared/UI';
import { ScheduleCell } from './ScheduleCell';

type Props = {
  settings?: TWorkingWeek[];
  timeZone: string;
};

type TDay = {
  hour: number;
  minute: number;
  id: string;
  week_day: TWeekDay;
  has_existing_sessions?: boolean;
};

export type TDaySlot = {
  day_name: string;
  slots: TDay[];
};

const cmpFn = (
  { hour: hour1, minute: minute1 }: TDay,
  { hour: hour2, minute: minute2 }: TDay
) => {
  const a = new Time(hour1, minute1);
  const b = new Time(hour2, minute2);

  return a.compare(b);
};

export const WEEK_NAME_LIST = {
  ПН: 'Понедельник',
  ВТ: 'Вторник',
  СР: 'Среда',
  ЧТ: 'Четверг',
  ПТ: 'Пятница',
  СБ: 'Суббота',
  ВС: 'Воскресенье',
};
const shortWeekNameList = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'] as const;

const createStartDay = () => {
  const d = new Date();

  return toZoned(
    new CalendarDateTime(
      d.getFullYear(),
      d.getMonth() + 1,
      d.getDate() - d.getDay() + 1,
      0,
      0
    ),
    'UTC'
  );
};

export const useCalendarEdit = (settings: TWorkingWeek[] = []) => {
  const timeZone = useAppSelector(selectTimezone);
  const { locale } = useLocale();

  return useMemo(() => {
    const daySlots = times(
      (weekDay) => ({
        day_name: shortWeekNameList[weekDay],
        slots: [] as TDay[],
      }),
      7
    );

    settings.forEach(({ week_day, hour, minute, ...rest }) => {
      const startDay = createStartDay();

      const day = startDay.add({
        days: week_day,
        hours: hour,
        minutes: minute,
      });

      const timeZoneDay = toTimeZone(day, timeZone);
      const weekDay = getDayOfWeek(timeZoneDay, locale);
      const time = toTime(timeZoneDay);

      daySlots[weekDay].slots.push({
        ...rest,
        hour: time.hour,
        minute: time.minute,
        week_day: weekDay,
      });
    });

    daySlots.forEach(({ slots }) => slots.sort(cmpFn));

    return daySlots;
  }, [settings, timeZone, locale]);
};

const SlotWithMenu: FCC<{ time: TDay }> = ({ time, children }) => {
  const editableSlot = useAppSelector(selectEditableSlot);
  const timeZone = useAppSelector(selectTimezone);
  const dispatch = useAppDispatch();
  const onSelect = useCallback(
    (key: Key) => {
      if (key === 'delete') {
        dispatch(removeSlot(time.id));
      }

      if (key === 'change_time') {
        dispatch(setEditableSlot(time.id));
      }
    },
    [dispatch, time.id]
  );

  const [newTime, setNewTime] = useState<Maybe<AnyObject>>(null);

  const menu = useMemo(
    () => [
      {
        id: 'change_time',
        with_client: false,
        text: 'Изменить время',
        icon: <RiTimeLine />,
      },
      {
        id: 'delete',
        with_client: false,
        text: 'Удалить слот',
        icon: <RiDeleteBinLine />,
        className: 'text-content-accent-vivid',
      },
    ],
    []
  );

  const onChangeTime = useCallback(
    (changebleTime: { minute: number; hour: number }) => {
      if (!changebleTime) {
        return;
      }
      const { minute, hour } = changebleTime;

      const offset = getTimezoneOffset(timeZone);
      let utcHour = hour - offset.hours;
      let utcMinute = minute - offset.minutes;
      let week_day = time.week_day;

      if (hour - offset.hours < 0) {
        utcHour = 24 - Math.abs(hour - offset.hours);
        week_day = week_day === 0 ? 6 : week_day - 1;
      }

      if (hour - offset.hours > 24) {
        utcHour = Math.abs(hour - offset.hours) % 24;
        week_day = week_day === 6 ? 0 : week_day + 1;
      }

      if (minute - offset.minutes < 0) {
        utcMinute = 60 - Math.abs(minute - offset.minutes);
        utcHour = utcHour - 1 < 0 ? 23 : utcHour - 1;

        if (utcHour === 23) {
          week_day = week_day === 0 ? 6 : week_day - 1;
        }
      }

      if (minute - offset.minutes > 60) {
        utcMinute = Math.abs(minute - offset.minutes) % 60;
        utcHour = utcHour + 1 > 6 ? 0 : utcHour + 1;
        week_day = utcHour + 1 > 6 && week_day === 6 ? 0 : week_day + 1;

        if (utcHour === 0) {
          week_day = week_day === 6 ? 0 : week_day + 1;
        }
      }

      setNewTime({
        hour: utcHour,
        minute: utcMinute,
        week_day,
      });
    },
    [time.week_day, timeZone]
  );

  const onBlurHandler = () => {
    if (newTime) {
      dispatch(
        editSlot({
          id: time.id,
          changes: newTime as unknown as Partial<TWorkingWeek>,
        })
      );
    }

    dispatch(setEditableSlot(''));
    setNewTime(null);
  };

  if (editableSlot === time.id) {
    const { hour, minute } = time;

    return (
      <ScheduleCell className='relative before:absolute before:inset-0 before:rounded-xl before:border before:border-2 before:border-border-active before:outline before:outline-[3px] before:outline-border-primary before:content-[""]'>
        <TimeField
          aria-label={new Time(+hour, +minute).toString()}
          autoFocus
          placeholderValue={new Time(+hour, +minute)}
          defaultValue={new Time(+hour, +minute)}
          onBlur={onBlurHandler}
          onKeyDown={(event) => event.key === 'Enter' && onBlurHandler()}
          /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
          // @ts-expect-error
          onChange={onChangeTime}
        />
      </ScheduleCell>
    );
  }

  return (
    <MenuButton
      label={children}
      items={menu}
      buttonProps={{
        variant: 'clear',
        fullWidth: true,
        className:
          'before:content-[""] relative before:absolute before:inset-0 aria-expanded:before:rounded-xl aria-expanded:before:border aria-expanded:before:border-2 aria-expanded:before:border-border-active aria-expanded:before:outline-[3px] aria-expanded:before:outline before:outline-border-primary',
      }}
      onAction={onSelect}
    >
      {({ id, text, icon, className }) => (
        <Item key={id} textValue={text}>
          <MenuListItem text={text} icon={icon} className={className} />
        </Item>
      )}
    </MenuButton>
  );
};

export const WeekEditView = ({ settings, timeZone }: Props) => {
  const weekWithTimezone = useCalendarEdit(settings || []);
  const dispatch = useAppDispatch();
  const isDesktop = useMedia('(min-width: 640px)', false);
  const { locale } = useLocale();

  const addNewSlot = useCallback(
    (week: number | string) => {
      const startDay = createStartDay();
      const { hours, minutes } = getTimezoneOffset(timeZone);

      const UTCDay = toTimeZone(startDay, 'UTC').add({
        days: +week,
        hours: -hours,
        minutes: -minutes,
      });

      const weekDay = getDayOfWeek(UTCDay, locale);
      const time = toTime(UTCDay);

      dispatch(
        addSlot({
          id: v4(),
          week_day: weekDay,
          hour: time.hour,
          minute: time.minute,
        })
      );
    },
    [dispatch, locale, timeZone]
  );

  if (isDesktop) {
    return (
      <DesktopView
        timeZone={timeZone}
        weekWithTimezone={weekWithTimezone}
        addNewSlot={addNewSlot}
      />
    );
  }

  return (
    <MobileView
      timeZone={timeZone}
      weekWithTimezone={weekWithTimezone}
      addNewSlot={addNewSlot}
    />
  );
};

const RepeatForWeeksSelect = () => {
  const { max_ahead_weeks_available_to_appoint } = useAppSelector(
    selectCalendarSettings
  );
  const dispatch = useAppDispatch();

  const options = useMemo(
    () => [
      {
        value: '1',
        label: '1 неделю',
      },
      {
        value: '2',
        label: '2 недели',
      },
      {
        value: '3',
        label: '3 недели',
      },
      {
        value: '4',
        label: '4 недели',
      },
    ],
    []
  );

  return (
    <div className='flex items-center gap-1 max-md:justify-between'>
      <span className='text-xs'>Повторить на</span>
      <TooltipTrigger
        triggerElement={
          <RiInformationFill className='fill-content-accent text-md' />
        }
      >
        <div className='max-w-3xl p-2 rounded bg-content-inverse shadow-popover'>
          Ваше расписание будет доступно для клиента на выбранное количество
          недель вперед
        </div>
      </TooltipTrigger>
      <Select
        items={options}
        selectedKey={max_ahead_weeks_available_to_appoint.toString()}
        defaultSelectedKey={max_ahead_weeks_available_to_appoint.toString()}
        buttonClassName='text-base h-full font-bold bg-transparent p-1 rounded-xl aria-pressed:bg-bg-tertiary max-md:text-xs'
        variant='clear'
        onSelectionChange={(key) => dispatch(setMaxAhead(+(key as string)))}
      >
        {(item) => (
          <Item key={item.value} textValue={item.value}>
            {item.label}
          </Item>
        )}
      </Select>
    </div>
  );
};

const AvailableSelect = () => {
  const { min_hours_to_appoint } = useAppSelector(selectCalendarSettings);
  const dispatch = useAppDispatch();
  const options = useMemo(
    () => [
      {
        value: '8',
        label: '8 часов',
      },
      {
        value: '12',
        label: '12 часов',
      },
      {
        value: '24',
        label: '24 часа',
      },
    ],
    []
  );

  return (
    <div className='flex items-center gap-1  max-md:justify-between'>
      <span className='text-xs'>Разрешить планирование на</span>
      <TooltipTrigger
        triggerElement={
          <RiInformationFill className='fill-content-accent text-md' />
        }
      >
        <div className='max-w-3xl rounded bg-content-inverse px-1 py-0.5 shadow-popover'>
          Ваше время остается доступным для записи, если до ее начала больше
          часов, чем указано Вами
        </div>
      </TooltipTrigger>
      <Select
        items={options}
        selectedKey={min_hours_to_appoint.toString()}
        defaultSelectedKey={min_hours_to_appoint.toString()}
        buttonClassName='text-base h-full font-bold bg-transparent p-1 rounded-xl aria-pressed:bg-bg-tertiary max-md:text-xs'
        variant='clear'
        onSelectionChange={(key) => dispatch(setMinHours(+(key as string)))}
      >
        {(item) => (
          <Item key={item.value} textValue={item.value}>
            {item.label}
          </Item>
        )}
      </Select>
    </div>
  );
};

const ClearAll = () => {
  const dispatch = useAppDispatch();

  return (
    <Button
      variant='clear'
      endIcon={<RiDeleteBinLine className='text-md' />}
      className='font-semibold text-content-error text-sm'
      onPress={() => dispatch(clearSlots())}
    >
      Очистить все
    </Button>
  );
};

type TView = {
  weekWithTimezone: TDaySlot[];
  timeZone: string;
  addNewSlot?: (id: string | number) => void;
};

const DesktopView: FCC<TView> = ({ weekWithTimezone, addNewSlot }) => (
  <div className='smax-md:hidden'>
    <div className='mb-5 flex items-center'>
      <RepeatForWeeksSelect />
      <AvailableSelect />
      <ClearAll />
    </div>
    <Card
      size='clear'
      className='overflow-hidden p-2 outline outline-1 outline-border-primary'
    >
      <div className='grid grid-cols-7 items-center bg-white'></div>
      <Collapse isOpen>
        <div className='grid grid-cols-7 gap-2'>
          {weekWithTimezone.map(({ day_name, slots }) => (
            <ScheduleCell
              key={day_name}
              className={cn('border-t-4', {
                ['border-t-content-accent']: slots.length,
              })}
            >
              <span className='text-xs font-semibold'>{day_name}</span>
            </ScheduleCell>
          ))}
          {weekWithTimezone.map(({ day_name }, i) => (
            <ScheduleCell id={i} key={day_name + 'plus'} onClick={addNewSlot}>
              <span className='text-md font-semibold'>{<RiAddFill />}</span>
            </ScheduleCell>
          ))}
          {weekWithTimezone.map(({ day_name, slots }) => (
            <div key={day_name + 'column'} className='flex flex-col gap-2'>
              {slots.map((time) => (
                <SlotWithMenu key={time.id} time={time}>
                  <ScheduleCell>
                    <span>
                      {time.hour.toString().padStart(2, '0')}:
                      {time.minute.toString().padStart(2, '0')}
                    </span>
                  </ScheduleCell>
                </SlotWithMenu>
              ))}
            </div>
          ))}
        </div>
      </Collapse>
    </Card>
  </div>
);

const MobileView: FCC<TView> = ({ weekWithTimezone, addNewSlot }) => (
  <div className='flex flex-col gap-8 md:hidden'>
    <div className='flex flex-col gap-4'>
      <RepeatForWeeksSelect />
      <AvailableSelect />
      <ClearAll />
    </div>
    <div className='flex flex-col gap-2'>
      {weekWithTimezone.map(({ day_name, slots }, i) => (
        <ExpandableBlock
          title={WEEK_NAME_LIST[day_name as (typeof shortWeekNameList)[number]]}
          key={day_name}
        >
          <div className='mb-4 mt-1 flex flex-wrap gap-2 px-[1px] py-2'>
            {slots.map((time) => (
              <SlotWithMenu key={time.id} time={time}>
                <ScheduleCell>
                  <span>
                    {time.hour.toString().padStart(2, '0')}:
                    {time.minute.toString().padStart(2, '0')}
                  </span>
                </ScheduleCell>
              </SlotWithMenu>
            ))}
          </div>
          <ScheduleCell id={i} onClick={addNewSlot}>
            <span className='text-md font-semibold'>{<RiAddFill />}</span>
          </ScheduleCell>
        </ExpandableBlock>
      ))}
    </div>
  </div>
);
