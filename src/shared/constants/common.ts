import { TAreaType } from '@shared/api';

export const WORKING_AREA_SPECIALIZATION = {
  [TAreaType.ECoaching]: 'Коуч',
  [TAreaType.EPsychotherapy]: 'Психотерапевт',
};

export const WORKING_AREA_DICT = {
  [TAreaType.ECoaching]: 'Коучинг',
  [TAreaType.EPsychotherapy]: 'Психотерапия',
};

export const TIMEZONES = [
  { timezone: 'UTC', ru_label: 'Всемирное координированное время (UTC)' },
  { timezone: 'Europe/London', ru_label: 'Лондон' },
  { timezone: 'Europe/Paris', ru_label: 'Париж' },
  { timezone: 'Europe/Moscow', ru_label: 'Москва' },
  { timezone: 'Asia/Dubai', ru_label: 'Самара, Волгоград' },
  { timezone: 'Asia/Karachi', ru_label: 'Екатеринбург' },
  { timezone: 'Asia/Almaty', ru_label: 'Алматы' },
  { timezone: 'Asia/Bangkok', ru_label: 'Красноярск' },
  { timezone: 'Asia/Shanghai', ru_label: 'Иркутск' },
  { timezone: 'Asia/Tokyo', ru_label: 'Якутск' },
  { timezone: 'Australia/Sydney', ru_label: 'Владивосток' },
  { timezone: 'Pacific/Noumea', ru_label: 'Нумеа' },
  { timezone: 'Pacific/Auckland', ru_label: 'Окленд, Веллингтон' },
  { timezone: 'Atlantic/Azores', ru_label: 'Азорские острова' },
  { timezone: 'Atlantic/South_Georgia', ru_label: 'Южная Георгия' },
  { timezone: 'America/Sao_Paulo', ru_label: 'Бразилиа' },
  { timezone: 'America/Santo_Domingo', ru_label: 'Санто-Доминго' },
  { timezone: 'America/New_York', ru_label: 'Восточное время (США)' },
  { timezone: 'America/Chicago', ru_label: 'Центральное время (США)' },
  { timezone: 'America/Denver', ru_label: 'Денвер' },
  { timezone: 'America/Los_Angeles', ru_label: 'Калифорния (США)' },
  { timezone: 'America/Anchorage', ru_label: 'Анкоридж' },
  { timezone: 'Pacific/Honolulu', ru_label: 'Гавайи' },
  { timezone: 'Pacific/Pago_Pago', ru_label: 'Паго-Паго' },
  { timezone: 'Etc/GMT+12', ru_label: 'Киритимати (остров)' },
];
