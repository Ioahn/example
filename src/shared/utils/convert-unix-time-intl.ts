import { fromDate } from '@internationalized/date';

export const convertUnixTimeIntl = (unixTime: number, timeZone?: string) => {
  const date = new Date(unixTime * 1000);

  const optionsDate: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    timeZone,
  };
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    timeZone,
  };

  const formatterDate = new Intl.DateTimeFormat('ru-RU', optionsDate);
  const formatterTime = new Intl.DateTimeFormat('ru-RU', optionsTime);

  const shortDays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

  return {
    dayOfWeek: shortDays[date.getDay()],
    date: formatterDate.format(date),
    time: formatterTime.format(date),
  };
};

export const getTimezoneOffset = (timezone: string) => {
  const { offset } = fromDate(new Date(), timezone);

  const hours = Math.floor(offset / 3600000);
  const minutes = Math.floor((offset % 3600000) / 60000);

  return { hours, minutes };
};
