import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { getSerializedData } from '@entities/models';
import {
  TBodyUpdateSpecialistProfile,
  TSpecialistProfileCurrentStateSchema,
  TSpecialistProfileUpdateResponseSchema,
  senseApi,
} from '@shared/api';
import {
  createHydrateEntity,
  createLoadingStateEntity,
  serializeAxiosErrors,
  startListening,
} from '@shared/utils';
import {
  PRIVATE_SPECIALIST_PROFILE_NAME,
  SHORT_PROFILE_SLICE_NAME,
} from '@shared/constants';

const hydrateEntity = createHydrateEntity({
  selectStoreFromHydrate: (payload) => payload[PRIVATE_SPECIALIST_PROFILE_NAME],
});

const getSpecialistProfileLoaderStateEntity = createLoadingStateEntity(
  PRIVATE_SPECIALIST_PROFILE_NAME,
  {
    loadingStateName: 'getSpecialistProfileLoader',
    errorStateName: 'errorMessageWhenGetSpecialistProfile',
  }
);

const updateSpecialistProfileLoaderStateEntity = createLoadingStateEntity(
  PRIVATE_SPECIALIST_PROFILE_NAME,
  {
    loadingStateName: 'updateSpecialistProfileLoader',
    errorStateName: 'errorMessageWhenUpdateSpecialistProfile',
  }
);

const initialState = {
  specialist: {} as TSpecialistProfileUpdateResponseSchema,
  ...getSpecialistProfileLoaderStateEntity.getInitialState(),
  ...updateSpecialistProfileLoaderStateEntity.getInitialState(),
  ...hydrateEntity.getInitialState(),
};

export const loadEditSpecialistProfile = createAction(
  'loadEditSpecialistProfile'
);

export const updatePrivateProfile = createAction<AnyObject>(
  'updatePrivateProfile'
);

export const getPrivateSpecialistProfile = createAsyncThunk(
  'getPrivateSpecialistProfile',
  async (auth_token: string) => {
    return await senseApi.getSpecialistProfileForUpdate({
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    });
  },
  { serializeError: serializeAxiosErrors }
);

export const updatePrivateSpecialistProfile = createAsyncThunk(
  'updatePrivateSpecialistProfile',
  async ({
    auth_token,
    data,
  }: {
    auth_token: string;
    data: TBodyUpdateSpecialistProfile;
  }) => {
    return await senseApi.updateSpecialistProfile(data, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    });
  },
  { serializeError: serializeAxiosErrors }
);

export const getSpecialistsPrivateProfileThunkSSR = createAsyncThunk(
  'getSpecialistsPrivateProfileThunkSSR',
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { auth_token } = state[SHORT_PROFILE_SLICE_NAME];

    return await dispatch(getPrivateSpecialistProfile(auth_token)).unwrap();
  },
  { serializeError: serializeAxiosErrors }
);

export const privateSpecialistProfileSlice = createSlice({
  name: PRIVATE_SPECIALIST_PROFILE_NAME,
  initialState,
  reducers: {
    setSpecialist: (
      state,
      action: PayloadAction<TSpecialistProfileUpdateResponseSchema>
    ) => {
      state.specialist = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getPrivateSpecialistProfile.fulfilled,
      (state, { payload }) => {
        state.specialist = payload.data;
      }
    );

    hydrateEntity.reducer(builder, getSpecialistsPrivateProfileThunkSSR);
    getSpecialistProfileLoaderStateEntity.reducer(
      builder,
      getPrivateSpecialistProfile
    );
    updateSpecialistProfileLoaderStateEntity.reducer(
      builder,
      updatePrivateSpecialistProfile
    );
  },
});

const { name } = privateSpecialistProfileSlice;

const slice = (state: RootState) => state[name];

export const selectSpecialistPrivateState = createSelector(
  slice,
  ({ specialist }) =>
    (specialist.current_profile_state as TSpecialistProfileCurrentStateSchema) ||
    {}
);

export const selectApprovalMessage = createSelector(
  slice,
  ({ specialist }) =>
    (specialist.disapproval_recommendation as Maybe<string>) ||
    specialist.has_approval_waiting_changes
);

export const selectSpecialistLoaders = createSelector(
  getSpecialistProfileLoaderStateEntity.getSelectors(slice),
  updateSpecialistProfileLoaderStateEntity.getSelectors(slice),
  (getLoaders, updateLoaders) => ({
    ...getLoaders,
    ...updateLoaders,
  })
);

export const selectSpecialistUpdatedData = createSelector(
  slice,
  ({ specialist }) => specialist.update_form_data
);

startListening({
  actionCreator: updatePrivateSpecialistProfile.fulfilled,
  effect: (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { auth_token } = state[SHORT_PROFILE_SLICE_NAME];

    dispatch(getPrivateSpecialistProfile(auth_token));
  },
});

startListening({
  actionCreator: updatePrivateProfile,
  effect: async ({ payload }, { dispatch, getState }) => {
    const state = getState() as RootState;
    const { auth_token } = state[SHORT_PROFILE_SLICE_NAME];

    const data = getSerializedData(
      payload
    ) as unknown as TBodyUpdateSpecialistProfile;

    dispatch(updatePrivateSpecialistProfile({ auth_token, data }));
  },
});
