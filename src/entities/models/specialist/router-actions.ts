import { createRoutePushAction } from '@shared/utils';

export const openFinances = createRoutePushAction(
  'openFinances',
  '/specialist/finance'
);

export const openCalendar = createRoutePushAction(
  'openCalendar',
  '/specialist/calendar'
);

export const openEditCalendar = createRoutePushAction(
  'openEditCalendar',
  '/specialist/calendar/edit'
);
