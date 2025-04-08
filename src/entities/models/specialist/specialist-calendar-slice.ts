import {
  createAction,
  createSelector,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import {
  TNextSessionSchema,
  TScheduleSettingsSchema,
  TWeekDayScheduleSlotsSchema,
} from '@shared/api';
import { createHydrateEntity, startListening } from '@shared/utils';
import {
  SHORT_PROFILE_SLICE_NAME,
  SPECIALIST_CALENDAR_NAME,
} from '@shared/constants';
import {
  excludeSlotThunk,
  getSpecialistScheduleThunk,
  getSpecialistScheduleThunkSSR,
  unexcludeSlotThunk,
  updateSlotDateThunk,
} from './thunk';

export const excludeSlot = createAction<string>('excludeSlot');
export const unexcludeSlot = createAction<string>('unexcludeSlot');
export const updateSlotOnce = createAction<{
  id: string;
  newData: number;
}>('updateSlotOnce');

const hydrateEntity = createHydrateEntity({
  selectStoreFromHydrate: (payload) => payload[SPECIALIST_CALENDAR_NAME],
});

const initialState: {
  settings: TScheduleSettingsSchema;
  all_schedule_slots: TWeekDayScheduleSlotsSchema[];
  next_session: Maybe<TNextSessionSchema>;
} = {
  all_schedule_slots: [],
  settings: {},
  next_session: null,
  ...hydrateEntity.getInitialState(),
};

export const specialistCalendarSlice = createSlice({
  name: SPECIALIST_CALENDAR_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getSpecialistScheduleThunk.fulfilled,
      (state, { payload }) => {
        const { schedule, next_session } = payload.data;

        state.all_schedule_slots = schedule.all_schedule_slots || [];
        state.settings = schedule.settings as TScheduleSettingsSchema;
        state.next_session = next_session || null;
      }
    );

    hydrateEntity.reducer(builder, getSpecialistScheduleThunkSSR);
  },
});

const slice = (state: RootState) => state[SPECIALIST_CALENDAR_NAME];

export const selectScheduler = createSelector(
  slice,
  ({ all_schedule_slots }) => all_schedule_slots
);

export const selectSpecialistNextSession = createSelector(
  slice,
  ({ next_session }) => next_session
);

export const selectSchedule = createSelector(
  selectScheduler,
  (_: unknown, id: string) => id,
  (schedules, searchingId) => {
    const day = schedules.find(({ slots }) =>
      slots?.some(({ id }) => id === searchingId)
    );

    if (!day) return null;

    return (day as TWeekDayScheduleSlotsSchema).slots?.find(
      ({ id }) => id === searchingId
    );
  }
);

startListening({
  actionCreator: updateSlotOnce,
  effect: ({ payload }, { dispatch, getState }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];

    dispatch(
      updateSlotDateThunk({
        new_slot_date: payload.newData,
        slot_id: payload.id,
        auth_token,
      })
    );
  },
});

startListening({
  actionCreator: excludeSlot,
  effect: ({ payload }, { dispatch, getState }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];

    dispatch(excludeSlotThunk({ slot_ids: [payload], auth_token }));
  },
});

startListening({
  actionCreator: unexcludeSlot,
  effect: ({ payload }, { dispatch, getState }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];

    dispatch(unexcludeSlotThunk({ slot_ids: [payload], auth_token }));
  },
});

startListening({
  matcher: isAnyOf(
    excludeSlotThunk.fulfilled,
    unexcludeSlotThunk.fulfilled,
    updateSlotDateThunk.fulfilled
  ),
  effect: (_, { dispatch }) => {
    dispatch(getSpecialistScheduleThunkSSR());
  },
});
