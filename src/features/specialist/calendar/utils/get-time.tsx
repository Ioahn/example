import { TWeekDay } from '@shared/api';
import { getTimezoneOffset } from '@shared/utils';

type TDay = {
  hour: number;
  minute: number;
  id: string;
  week_day: TWeekDay;
  has_existing_sessions?: boolean;
};

export const getTime = (time: TDay, timezone: string) => {
  const offset = getTimezoneOffset(timezone);
  const hours =
    time.hour + offset.hours < 0 || time.hour + offset.hours >= 24
      ? Math.abs(24 - Math.abs(time.hour + offset.hours))
      : time.hour + offset.hours;

  const minutes =
    time.minute + offset.minutes >= 60
      ? 60 - Math.abs(time.minute + offset.minutes)
      : time.minute + offset.minutes;

  return {
    hours: hours.toString().padStart(2, '0'),
    minutes: minutes.toString().padStart(2, '0'),
  };
};
