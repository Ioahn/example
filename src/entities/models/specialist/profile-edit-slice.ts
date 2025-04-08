import {
  createAction,
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  getSerializedData,
  openEditCalendar,
  updateShortProfileInfo,
} from '@entities/models';
import { TBodyUpdateSpecialistProfile, senseApi } from '@shared/api';
import {
  createLoadingStateEntity,
  serializeAxiosErrors,
  startListening,
} from '@shared/utils';
import {
  PROFILE_EDIT_SLICE_NAME,
  SHORT_PROFILE_SLICE_NAME,
} from '@shared/constants';

const updateProfileLoadingStateEntity = createLoadingStateEntity(
  PROFILE_EDIT_SLICE_NAME,
  { loadingStateName: 'updateProfileLoading' }
);

const initialState = {
  ...updateProfileLoadingStateEntity.getInitialState(),
};

export const sendUpdatedProfileData = createAction<AnyObject>(
  'sendUpdatedProfileData'
);

const updateProfileThunk = createAsyncThunk(
  'updateProfile',
  async ({
    data,
    auth_token,
  }: {
    data: TBodyUpdateSpecialistProfile;
    auth_token: string;
  }) =>
    await senseApi.updateSpecialistProfile(data, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }),
  { serializeError: serializeAxiosErrors }
);

export const profileEditSlice = createSlice({
  name: PROFILE_EDIT_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    updateProfileLoadingStateEntity.reducer(builder, updateProfileThunk);
  },
});

const slice = (state: RootState) => state[profileEditSlice.name];
export const selectProfileLoading = createSelector(
  slice,
  ({ updateProfileLoading }) => updateProfileLoading
);

startListening({
  actionCreator: sendUpdatedProfileData,
  effect: async ({ payload }, { dispatch, getState }) => {
    const state = getState() as RootState;
    const { auth_token } = state[SHORT_PROFILE_SLICE_NAME];

    const data = getSerializedData(
      payload
    ) as unknown as TBodyUpdateSpecialistProfile;

    dispatch(updateProfileThunk({ data, auth_token }));
  },
});

startListening({
  actionCreator: updateProfileThunk.fulfilled,
  effect: (_, { dispatch }) => {
    dispatch(openEditCalendar());
    dispatch(updateShortProfileInfo());
  },
});
