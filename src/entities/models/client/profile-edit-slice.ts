import {
  createAction,
  createAsyncThunk,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import { updateShortProfileInfo } from '@entities/models';
import {
  TBodyUpdateClientSettings,
  TBodyUploadClientAvatar,
  senseApi,
} from '@shared/api';
import {
  createLoadingStateEntity,
  createRoutePushAction,
  serializeAxiosErrors,
  startListening,
} from '@shared/utils';
import {
  CLIENT_PROFILE_EDIT_SLICE_NAME,
  SHORT_PROFILE_SLICE_NAME,
} from '@shared/constants';

const updateProfileLoadingStateEntity = createLoadingStateEntity(
  CLIENT_PROFILE_EDIT_SLICE_NAME,
  {
    loadingStateName: 'updateProfileLoading',
  }
);

const uploadAvatarLoadingStateEntity = createLoadingStateEntity(
  CLIENT_PROFILE_EDIT_SLICE_NAME,
  {
    loadingStateName: 'uploadAvatarLoading',
  }
);

const initialState = {
  ...updateProfileLoadingStateEntity.getInitialState(),
  ...uploadAvatarLoadingStateEntity.getInitialState(),
};

export const updateClientProfileThunk = createAsyncThunk(
  'updateClientProfileThunk',
  async ({
    data,
    auth_token,
  }: {
    data: Partial<TBodyUpdateClientSettings>;
    auth_token: string;
  }) =>
    await senseApi.updateClientSettings(data as TBodyUpdateClientSettings, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }),
  { serializeError: serializeAxiosErrors }
);

const uploadClientAvatarThunk = createAsyncThunk(
  'uploadClientAvatarThunk',
  async ({
    data,
    auth_token,
  }: {
    data: TBodyUploadClientAvatar;
    auth_token: string;
  }) =>
    await senseApi.uploadClientAvatar(data, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }),
  { serializeError: serializeAxiosErrors }
);

const removeClientAvatarThunk = createAsyncThunk(
  'removeClientAvatarThunk',
  async ({ auth_token }: { auth_token: string }) =>
    await senseApi.deleteClientAvatar({
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }),
  { serializeError: serializeAxiosErrors }
);

export const openClientProfileEdit = createRoutePushAction(
  'openClientProfileEdit',
  '/client/profile-edit'
);

export const sendClientUpdatedProfileData = createAction<AnyObject>(
  'sendClientUpdatedProfileData'
);
export const uploadClientAvatar = createAction<AnyObject>('uploadClientAvatar');
export const removeClientAvatar = createAction('removeClientAvatar');

export const clientProfileEditSlice = createSlice({
  name: CLIENT_PROFILE_EDIT_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    updateProfileLoadingStateEntity.reducer(builder, updateClientProfileThunk);
    uploadAvatarLoadingStateEntity.reducer(builder, uploadClientAvatarThunk);
  },
});
const slice = (state: RootState) => state[CLIENT_PROFILE_EDIT_SLICE_NAME];

export const selectUpdateProfileLoadingState =
  updateProfileLoadingStateEntity.getSelectors(slice);

export const selectUploadClientAvatarLoadingState =
  uploadAvatarLoadingStateEntity.getSelectors(slice);

startListening({
  actionCreator: sendClientUpdatedProfileData,
  effect: async ({ payload }, { dispatch, getState }) => {
    const state = getState() as RootState;
    const { auth_token } = state[SHORT_PROFILE_SLICE_NAME];
    const topic_ids =
      payload.topics?.map(({ value }: { value: string }) => value) || [];

    const gender =
      payload.gender && payload.gender !== 'none' ? payload.gender : null;

    const data = {
      ...payload,
      gender,
      topic_ids,
    } as TBodyUpdateClientSettings;

    dispatch(
      updateClientProfileThunk({
        data,
        auth_token,
      })
    );
  },
});

startListening({
  actionCreator: uploadClientAvatar,
  effect: async ({ payload }, { dispatch, getState }) => {
    const state = getState() as RootState;
    const { auth_token } = state[SHORT_PROFILE_SLICE_NAME];

    const data = {
      file: payload,
    } as TBodyUploadClientAvatar;

    dispatch(
      uploadClientAvatarThunk({
        data,
        auth_token,
      })
    );
  },
});

startListening({
  actionCreator: removeClientAvatar,
  effect: async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const { auth_token } = state[SHORT_PROFILE_SLICE_NAME];

    dispatch(
      removeClientAvatarThunk({
        auth_token,
      })
    );
  },
});

startListening({
  matcher: isAnyOf(
    updateClientProfileThunk.fulfilled,
    uploadClientAvatarThunk.fulfilled
  ),
  effect: async (_, { dispatch }) => {
    dispatch(updateShortProfileInfo());
  },
});
