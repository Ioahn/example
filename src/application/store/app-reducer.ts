import { routerReducer } from 'connected-next-router';
import { combineReducers } from 'redux';
import {
  allTopicsSlice,
  clientBookingSlice,
  clientPaymentSlice,
  clientProfileEditSlice,
  clientProfileSlice,
  financesSlice,
  notificationSlice,
  phoneAuthenticationSlice,
  privateSpecialistProfileSlice,
  profileEditSlice,
  publicSpecialistProfileSlice,
  selectedTopicsSlice,
  settingsSlice,
  shortProfileSlice,
  specialistCalendarSlice,
  specialistEditCalendarSlice,
  specialistsListSlice,
  uiSlice,
  videoCallSlice,
} from '@entities/models';
import { CHAT_REDUCER, chatReducer } from '@features/chat';
import {
  RECOMMENDED_SPECIALISTS_REDUCER,
  recommendedSpecialistReducer,
  telegramQRSlice,
} from '@features/client';

//TODO сделать менеджер подключения редьюсеров в зависимости от аутентификации
export const appReducer = combineReducers({
  [CHAT_REDUCER]: chatReducer,
  [RECOMMENDED_SPECIALISTS_REDUCER]: recommendedSpecialistReducer,
  [phoneAuthenticationSlice.name]: phoneAuthenticationSlice.reducer,
  [shortProfileSlice.name]: shortProfileSlice.reducer,
  [selectedTopicsSlice.name]: selectedTopicsSlice.reducer,
  [privateSpecialistProfileSlice.name]: privateSpecialistProfileSlice.reducer,
  [publicSpecialistProfileSlice.name]: publicSpecialistProfileSlice.reducer,
  [specialistsListSlice.name]: specialistsListSlice.reducer,
  [allTopicsSlice.name]: allTopicsSlice.reducer,
  [financesSlice.name]: financesSlice.reducer,
  [profileEditSlice.name]: profileEditSlice.reducer,
  [specialistCalendarSlice.name]: specialistCalendarSlice.reducer,
  [specialistEditCalendarSlice.name]: specialistEditCalendarSlice.reducer,
  [settingsSlice.name]: settingsSlice.reducer,
  [clientProfileEditSlice.name]: clientProfileEditSlice.reducer,
  [clientProfileSlice.name]: clientProfileSlice.reducer,
  [clientBookingSlice.name]: clientBookingSlice.reducer,
  [notificationSlice.name]: notificationSlice.reducer,
  [clientPaymentSlice.name]: clientPaymentSlice.reducer,
  [uiSlice.name]: uiSlice.reducer,
  [videoCallSlice.name]: videoCallSlice.reducer,
  [telegramQRSlice.name]: telegramQRSlice.reducer,
  router: routerReducer,
});
