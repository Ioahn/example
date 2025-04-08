import { getLocalTimeZone } from '@internationalized/date';
import {
  PayloadAction,
  createAction,
  createSelector,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import {
  getClientProfileSettingsThunk,
  getSpecialistProfileSettingsThunk,
  updateClientTimeZone,
  updateSpecialistProfileSettingsThunk,
  updateSpecialistTimeZone,
} from '@entities/models';
import { TAccountType, TGender } from '@shared/api';
import {
  createHydrateEntity,
  createRoutePushAction,
  startListening,
} from '@shared/utils';
import {
  SETTINGS_SLICE_NAME,
  SHORT_PROFILE_SLICE_NAME,
} from '@shared/constants';

const hydrateEntity = createHydrateEntity({
  selectStoreFromHydrate: (payload) => payload[SETTINGS_SLICE_NAME],
});

const initialState = {
  timeZone: '',
  email: '',
  phone_number: '',
  gender: null as Maybe<TGender>,
  birth_year: '',
};

export const openSettings = createRoutePushAction<TAccountType>(
  'openSettings',
  (account_type) => `/${account_type}/profile/settings`
);

export const applySettings = createAction<{
  email: string;
  time_zone: string;
  notifications?: Record<string, boolean>;
}>('applySettings');

export const updateTimezone = createAction<string>('updateTimezone');
export const getSettings = createAction('getSettings');

export const settingsSlice = createSlice({
  name: SETTINGS_SLICE_NAME,
  initialState,
  reducers: {
    setTimezone(state, { payload }: PayloadAction<string>) {
      state.timeZone = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        getSpecialistProfileSettingsThunk.fulfilled,
        getClientProfileSettingsThunk.fulfilled,
        updateSpecialistProfileSettingsThunk.fulfilled
      ),
      (state, { payload }) => {
        state.timeZone = payload.data.settings.timezone as string;
        state.email = payload.data.email as unknown as string;
        state.phone_number = payload.data.phone_number as unknown as string;
      }
    );

    hydrateEntity.reducer(builder);
  },
});

export const { setTimezone } = settingsSlice.actions;

const slice = (state: RootState) => state[settingsSlice.name];

export const selectTimezone = createSelector(
  slice,
  ({ timeZone }) => timeZone || getLocalTimeZone()
);

export const selectSettings = createSelector(
  slice,
  ({ email, phone_number, birth_year, gender }) => ({
    email,
    phone_number,
    birth_year,
    gender,
  })
);

startListening({
  actionCreator: updateTimezone,
  effect: async ({ payload }, { dispatch, getState }) => {
    dispatch(setTimezone(payload));
    const { auth_token, account_type } = getState()[SHORT_PROFILE_SLICE_NAME];

    if (account_type === TAccountType.ESpecialist) {
      await dispatch(
        updateSpecialistTimeZone({ auth_token, timezone: payload })
      ).unwrap();
    }

    if (account_type === TAccountType.EClient) {
      await dispatch(
        updateClientTimeZone({ auth_token, timezone: payload })
      ).unwrap();
    }
  },
});

startListening({
  actionCreator: getSettings,
  effect: (_, { getState, dispatch }) => {
    const { auth_token, account_type } = getState()[SHORT_PROFILE_SLICE_NAME];

    if (!auth_token) {
      return;
    }

    if ((account_type as TAccountType) === TAccountType.ESpecialist) {
      dispatch(getSpecialistProfileSettingsThunk(auth_token));
    }

    if ((account_type as TAccountType) === TAccountType.EClient) {
      dispatch(getClientProfileSettingsThunk(auth_token));
    }
  },
});

startListening({
  actionCreator: applySettings,
  effect: async ({ payload }, { getState, dispatch }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];

    const { data } = await dispatch(
      updateSpecialistProfileSettingsThunk({
        email: payload.email,
        timezone: payload.time_zone,
        auth_token,
      })
    ).unwrap();

    dispatch(setTimezone(data.settings.timezone as string));
  },
});
