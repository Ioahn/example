import { TGender } from '@shared/api';

export const RESET_KEY = 'none';

export const GENDER_OPTIONS = [
  {
    id: 'none',
    value: RESET_KEY,
    label: 'Не важно',
  },
  {
    id: TGender.EMale,
    value: TGender.EMale,
    label: 'Мужской',
  },
  {
    id: TGender.EFemale,
    value: TGender.EFemale,
    label: 'Женский',
  },
];

export const TIME_OPTIONS = [
  {
    id: 'none',
    value: RESET_KEY,
    label: 'Не важно',
  },
  {
    id: 'morning',
    value: 'morning',
    label: 'Утро',
  },
  {
    id: 'daytime',
    value: 'daytime',
    label: 'День',
  },
  {
    id: 'evening',
    value: 'evening',
    label: 'Вечер',
  },
];

export const WEEK_DAY_OPTIONS = [
  {
    id: 'none',
    value: RESET_KEY,
    label: 'Не важно',
  },
  { id: 'понедельник', value: '0', label: 'Пн' },
  { id: 'вторник', value: '1', label: 'Вт' },
  { id: 'среда', value: '2', label: 'Ср' },
  { id: 'четверг', value: '3', label: 'Чт' },
  { id: 'пятница', value: '4', label: 'Пт' },
  { id: 'суббота', value: '5', label: 'Сб' },
  { id: 'воскресенье', value: '6', label: 'Вс' },
];

export const SPECIALIST_AGE_OPTIONS = [
  {
    id: 'none',
    value: RESET_KEY,
    label: 'Не важно',
  },
  { id: '25-35', value: '25-35', label: '25-35' },
  { id: '36-45', value: '36-45', label: '36-45' },
  { id: '45+', value: '45-100', label: '45+' },
];
