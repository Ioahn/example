import {
  PayloadAction,
  createAction,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { getSpecialistScheduleThunkSSR, openCalendar } from '@entities/models';
import {
  createHydrateEntity,
  createLoadingStateEntity,
  startListening,
} from '@shared/utils';
import {
  SHORT_PROFILE_SLICE_NAME,
  SPECIALIST_EDIT_CALENDAR_NAME,
} from '@shared/constants';
import { getSpecialistScheduleThunk, saveScheduleThunk } from './thunk';

const workingWeekEntity = createEntityAdapter<TWorkingWeek>({
  selectId: ({ id }) => id,
});
const hydrateEntity = createHydrateEntity({
  selectStoreFromHydrate: (payload) => payload[SPECIALIST_EDIT_CALENDAR_NAME],
});

const saveScheduleLoaderEntity = createLoadingStateEntity(
  SPECIALIST_EDIT_CALENDAR_NAME,
  {
    loadingStateName: 'saveScheduleLoader',
    errorStateName: 'errorMessageWhenSaveSchedule',
  }
);

const initialState = {
  editableSlot: '',
  min_hours_to_appoint: 0,
  max_ahead_weeks_available_to_appoint: 0,
  ...workingWeekEntity.getInitialState(),
  ...saveScheduleLoaderEntity.getInitialState(),
};

export const saveSchedule = createAction('saveSchedule');

export const specialistEditCalendarSlice = createSlice({
  name: SPECIALIST_EDIT_CALENDAR_NAME,
  initialState,
  reducers: {
    setWorkingWeek: workingWeekEntity.addMany,
    removeSlot: workingWeekEntity.removeOne,
    editSlot: workingWeekEntity.updateOne,
    setEditableSlot: (state, { payload }: PayloadAction<string>) => {
      state.editableSlot = payload;
    },
    clearSlots: workingWeekEntity.removeAll,
    addSlot: workingWeekEntity.addOne,
    setMinHours: (state, { payload }: PayloadAction<number>) => {
      state.min_hours_to_appoint = payload;
    },
    setMaxAhead: (state, { payload }: PayloadAction<number>) => {
      state.max_ahead_weeks_available_to_appoint = payload;
    },
  },
  extraReducers: (builder) => {
    hydrateEntity.reducer(builder);
    saveScheduleLoaderEntity.reducer(builder, saveScheduleThunk);
  },
});

export const {
  clearSlots,
  setWorkingWeek,
  removeSlot,
  setEditableSlot,
  editSlot,
  setMinHours,
  setMaxAhead,
  addSlot,
} = specialistEditCalendarSlice.actions;

const slice = (state: RootState) => state[SPECIALIST_EDIT_CALENDAR_NAME];

export const selectWorkingWeek =
  workingWeekEntity.getSelectors(slice).selectAll;

export const selectFreeSlot = workingWeekEntity.getSelectors(slice).selectById;

export const selectCalendarSettings = createSelector(
  slice,
  ({ min_hours_to_appoint, max_ahead_weeks_available_to_appoint }) => ({
    min_hours_to_appoint,
    max_ahead_weeks_available_to_appoint,
  })
);
export const selectEditableSlot = createSelector(
  slice,
  ({ editableSlot }) => editableSlot
);

export const editCalendarLoaders = saveScheduleLoaderEntity.getSelectors(slice);

startListening({
  actionCreator: saveSchedule,
  effect: (_, { dispatch, getState }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];
    const workingWeek = selectWorkingWeek(getState());
    const { min_hours_to_appoint, max_ahead_weeks_available_to_appoint } = (
      getState() as RootState
    )[specialistEditCalendarSlice.name];

    dispatch(
      saveScheduleThunk({
        auth_token,
        data: {
          min_hours_to_appoint,
          max_ahead_weeks_available_to_appoint,
          working_week_days_hours: workingWeek,
        },
      })
    );

    dispatch(openCalendar());
  },
});

startListening({
  actionCreator: saveScheduleThunk.fulfilled,
  effect: async (_, { dispatch }) => {
    await dispatch(getSpecialistScheduleThunkSSR());
    dispatch(openCalendar());
  },
});

startListening({
  actionCreator: getSpecialistScheduleThunk.fulfilled,
  effect: async ({ payload }, { dispatch }) => {
    await dispatch(clearSlots());

    const { schedule } = payload.data;

    dispatch(
      setWorkingWeek(
        schedule?.settings?.working_week_days_hours as TWorkingWeek[]
      )
    );

    dispatch(
      setMaxAhead(
        schedule?.settings?.max_ahead_weeks_available_to_appoint as number
      )
    );

    dispatch(setMinHours(schedule?.settings?.min_hours_to_appoint as number));
  },
});

startListening({
  actionCreator: addSlot,
  effect: ({ payload }, { dispatch }) => {
    const { id } = payload;

    dispatch(setEditableSlot(id));
  },
});
