import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  openClientBooking,
  openClientProfile,
  openSearchSpecialist,
} from '@entities/models';
import { updateFilters } from '@features/client';
import {
  TAreaType,
  TBodyCancelSession,
  TBodyMoveSession,
  TClientMainCabResponseSchema,
  TClientSettingsResponseSchema,
  senseApi,
} from '@shared/api';
import {
  createHydrateEntity,
  createLoadingStateEntity,
  createRoutePushAction,
  serializeAxiosErrors,
  startListening,
} from '@shared/utils';
import {
  CLIENT_BOOKING_SLICE_NAME,
  CLIENT_PAYMENTS_SLICE_NAME,
  CLIENT_PROFILE_SLICE_NAME,
  PUBLIC_SPECIALIST_PROFILE_SLICE_NAME,
  SHORT_PROFILE_SLICE_NAME,
} from '@shared/constants';
import { getClientProfileSettingsThunk } from '../app';

const hydrateEntity = createHydrateEntity({
  selectStoreFromHydrate: (payload) => payload[CLIENT_PAYMENTS_SLICE_NAME],
});

const loaderEntity = createLoadingStateEntity(CLIENT_PROFILE_SLICE_NAME, {
  loadingStateName: 'clientProfileLoaderState',
  errorStateName: 'clientProfileErrorMessage',
});

const moveSessionClientStateLoaderEntity = createLoadingStateEntity(
  CLIENT_PROFILE_SLICE_NAME,
  {
    loadingStateName: 'moveSessionClientStateLoader',
    errorStateName: 'moveSessionClientErrorMessage',
  }
);

const initialState = {
  client: null as Maybe<TClientMainCabResponseSchema>,
  setting: {} as TClientSettingsResponseSchema,
  ...hydrateEntity.getInitialState(),
  ...loaderEntity.getInitialState(),
  ...moveSessionClientStateLoaderEntity.getInitialState(),
};

export const loadClientProfileData = createAction('loadClientProfileData');
export const changeClientSlotTime = createAction<TBodyMoveSession>(
  'loadClientProfileData'
);
export const cancelClientSlotTime = createAction<string>(
  'cancelClientSlotTime'
);

export const planningSession = createAction('planningSession');
export const openClientPostponeSchedule = createRoutePushAction<string>(
  'openClientPostponeSchedule',
  (id) => `/client/profile/postpone/${id}`
);

export const getClientProfileThunkSSR = createAsyncThunk(
  'getClientProfileThunkSSR',
  async (_, { dispatch, getState }) => {
    const { auth_token } = (getState() as RootState)[SHORT_PROFILE_SLICE_NAME];

    return dispatch(getClientProfileThunk({ auth_token })).unwrap();
  },
  { serializeError: serializeAxiosErrors }
);

export const getClientProfileThunk = createAsyncThunk(
  'getClientProfileThunk',
  ({ auth_token }: { auth_token: string }) =>
    senseApi.getClientMainCabinetPage({
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }),
  { serializeError: serializeAxiosErrors }
);

export const moveSessionTimeThunk = createAsyncThunk(
  'moveSessionTimeThunk',
  ({
    auth_token,
    session_id,
    new_specialist_slot_id,
  }: { auth_token: string } & TBodyMoveSession) =>
    senseApi.moveSession(
      { session_id, new_specialist_slot_id },
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    ),
  { serializeError: serializeAxiosErrors }
);

export const cancelSessionTimeThunk = createAsyncThunk(
  'cancelSessionTimeThunk',
  ({ auth_token, ...rest }: TBodyCancelSession & { auth_token: string }) =>
    senseApi.cancelSession(rest, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }),
  { serializeError: serializeAxiosErrors }
);

export const getClientProfileSettingsThunkSSR = createAsyncThunk(
  'getClientProfileSettingsThunkSSR',
  async (_, { getState, dispatch }) => {
    const { auth_token } = (getState() as RootState)[SHORT_PROFILE_SLICE_NAME];

    await dispatch(getClientProfileSettingsThunk(auth_token));
  },
  { serializeError: serializeAxiosErrors }
);

export const clientProfileSlice = createSlice({
  name: CLIENT_PROFILE_SLICE_NAME,
  initialState,
  reducers: {
    removeFutureSession: (state, { payload }: PayloadAction<string>) => {
      if (state?.client?.scheduled_future_sessions) {
        state.client.scheduled_future_sessions =
          state.client.scheduled_future_sessions.filter(
            ({ id }) => id !== payload
          );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClientProfileThunk.fulfilled, (state, { payload }) => {
        state.client = payload.data;
      })
      .addCase(
        getClientProfileSettingsThunk.fulfilled,
        (state, { payload }) => {
          state.setting = payload.data;
        }
      );

    hydrateEntity.reducer(builder, getClientProfileThunkSSR);
    hydrateEntity.reducer(builder, getClientProfileSettingsThunkSSR);
    loaderEntity.reducer(builder, getClientProfileThunk);
    moveSessionClientStateLoaderEntity.reducer(builder, moveSessionTimeThunk);
  },
});

export const { removeFutureSession } = clientProfileSlice.actions;
const slice = (state: RootState) => state[CLIENT_PROFILE_SLICE_NAME];

export const selectClientProfile = createSelector(
  slice,
  ({ client }) => client
);

export const selectClientProfileSetting = createSelector(
  slice,
  ({ setting }) => setting
);

export const selectClientSpecialist = createSelector(
  slice,
  ({ client }) => client?.specialist
);

export const selectClientSpecialistFullName = createSelector(
  slice,
  ({ client }) => {
    const specialist = client?.specialist;

    return `${specialist?.first_name || ''} ${specialist?.last_name || ''}`;
  }
);

export const selectClientSpecialistSlot = createSelector(
  slice,
  ({ client }) =>
    client?.specialist?.slots?.map(({ slot_date, ...rest }) => ({
      date: slot_date,
      ...rest,
    })) || []
);

export const selectClientProduct = createSelector(
  (state: RootState) => state[PUBLIC_SPECIALIST_PROFILE_SLICE_NAME].specialist,
  (_: RootState, activeArea: TAreaType) => activeArea,
  (specialist, activeArea) => specialist?.price_options?.[activeArea]
);

export const clientProfileLoaderSelector = loaderEntity.getSelectors(slice);
export const moveSessionClientStateLoaderSelector =
  moveSessionClientStateLoaderEntity.getSelectors(slice);

startListening({
  actionCreator: loadClientProfileData,
  effect: (_, { dispatch, getState }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];

    dispatch(getClientProfileThunk({ auth_token }));
  },
});

startListening({
  actionCreator: changeClientSlotTime,
  effect: ({ payload }, { dispatch, getState }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];

    dispatch(moveSessionTimeThunk({ auth_token, ...payload }));
  },
});

startListening({
  actionCreator: moveSessionTimeThunk.fulfilled,
  effect: (_, { dispatch }) => {
    dispatch(openClientProfile());
  },
});

startListening({
  actionCreator: cancelSessionTimeThunk.fulfilled,
  effect: (_, { dispatch }) => {
    dispatch(openClientProfile());
  },
});

startListening({
  actionCreator: cancelClientSlotTime,
  effect: async ({ payload }, { getState, dispatch }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];

    dispatch(cancelSessionTimeThunk({ session_id: payload, auth_token }));
    dispatch(removeFutureSession(payload));
  },
});

startListening({
  actionCreator: planningSession,
  effect: (_, { getState, dispatch }) => {
    const specialist = selectClientSpecialist(getState());
    const { activeArea } = getState()[CLIENT_BOOKING_SLICE_NAME];

    if (specialist) {
      dispatch(
        openClientBooking({ id: specialist.id, areaType: activeArea || null })
      );
      return;
    }

    dispatch(openSearchSpecialist());
  },
});

startListening({
  actionCreator: getClientProfileSettingsThunk.fulfilled,
  effect: ({ payload }, { getState, dispatch }) => {
    const chosenTopics = payload.data.topics
      .filter(({ is_chosen }) => is_chosen)
      .map(({ id }) => id);

    dispatch(
      updateFilters({
        chosenTopics,
      })
    );
  },
});
