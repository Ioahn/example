import {
  PayloadAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { sendCarrotEventSpecialistProfileViewed } from '@shared/externals';
import {
  TAreaType,
  TSpecialistProfileResponseSchema,
  senseApi,
} from '@shared/api';
import {
  createHydrateEntity,
  createLoadingStateEntity,
  createRoutePushAction,
  serializeAxiosErrors,
  startListening,
} from '@shared/utils';
import { onMountAppAction } from '@shared/hooks';
import {
  PUBLIC_SPECIALIST_PROFILE_SLICE_NAME,
  SHORT_PROFILE_SLICE_NAME,
} from '@shared/constants';

const hydrateEntity = createHydrateEntity({
  selectStoreFromHydrate: (payload) =>
    payload[PUBLIC_SPECIALIST_PROFILE_SLICE_NAME],
});

const getSpecialistProfileLoaderStateEntity = createLoadingStateEntity(
  PUBLIC_SPECIALIST_PROFILE_SLICE_NAME,
  {
    loadingStateName: 'getSpecialistProfileLoader',
    errorStateName: 'errorMessageWhenGetSpecialistProfile',
  }
);

const initialState = {
  specialist: null as Maybe<TSpecialistProfileResponseSchema>,
  ...hydrateEntity.getInitialState(),
  ...getSpecialistProfileLoaderStateEntity.getInitialState(),
};

export const openPublicSpecialistProfile = createRoutePushAction<string>(
  'openPublicSpecialistProfile',
  (id) => `/client/search-specialist/profile/${id}`
);

export const openPublicSpecialistProfileFromSearch = createRoutePushAction<{
  id: string;
  area: TAreaType;
}>(
  'openPublicSpecialistProfileFromSearch',
  ({ id }) => `/client/search-specialist/profile/${id}?source=search`
);

export const getSpecialistsProfileThunk = createAsyncThunk(
  'getSpecialistProfile',
  async ({
    id,
    auth_token,
    area_type,
  }: {
    id: string;
    auth_token: string;
    area_type: TAreaType;
  }) => {
    return await senseApi.getSpecialistProfile(
      id,
      { area_type },
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    );
  },
  { serializeError: serializeAxiosErrors }
);

export const getSpecialistsProfileThunkSSR = createAsyncThunk(
  'getSpecialistProfileSSR',
  async (
    { id, areaType }: { id: string; areaType?: TAreaType | null },
    { getState, dispatch }
  ) => {
    const state = getState() as RootState;
    const { auth_token } = state[SHORT_PROFILE_SLICE_NAME];

    return await dispatch(
      getSpecialistsProfileThunk({
        id,
        auth_token,
        area_type: areaType as TAreaType,
      })
    ).unwrap();
  },
  { serializeError: serializeAxiosErrors }
);

export const publicSpecialistProfileSlice = createSlice({
  name: PUBLIC_SPECIALIST_PROFILE_SLICE_NAME,
  initialState,
  reducers: {
    setSpecialist: (
      state,
      action: PayloadAction<TSpecialistProfileResponseSchema>
    ) => {
      state.specialist = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getSpecialistsProfileThunk.fulfilled,
      (state, { payload }) => {
        state.specialist = payload.data;
      }
    );

    hydrateEntity.reducer(builder, getSpecialistsProfileThunkSSR);
    getSpecialistProfileLoaderStateEntity.reducer(
      builder,
      getSpecialistsProfileThunk
    );
  },
});

const { name } = publicSpecialistProfileSlice;

const selectSelf = (state: RootState) => state[name];

export const selectSpecialist = createSelector(
  selectSelf,
  ({ specialist }) => specialist
);

export const selectSpecialistSlot = createSelector(
  selectSelf,
  ({ specialist }) =>
    specialist?.slots?.map(({ slot_date, ...rest }) => ({
      date: slot_date,
      ...rest,
    })) || []
);

startListening({
  actionCreator: openPublicSpecialistProfile,
  effect: (_, { getState }) => {
    const { specialist } = getState()[name];

    if (!specialist?.id) {
      return;
    }
    sendCarrotEventSpecialistProfileViewed({
      specialistId: specialist?.id,
      specialistName: `${specialist?.first_name || ''} ${specialist?.last_name || ''}`,
    });
  },
});

startListening({
  actionCreator: onMountAppAction,
  effect: (_, { getState }) => {
    const { location } = getState().router;
    const { specialist } = getState()[name];

    if (!specialist?.id) {
      return;
    }

    if (location.pathname.startsWith('/client/search-specialist/profile')) {
      sendCarrotEventSpecialistProfileViewed({
        specialistId: specialist?.id,
        specialistName: `${specialist?.first_name || ''} ${specialist?.last_name || ''}`,
      });
    }
  },
});
