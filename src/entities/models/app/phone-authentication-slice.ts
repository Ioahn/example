import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSelector,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import {
  sendCarrotEventAuthSmsSent,
  sendCarrotEventAuthenticated,
  sendCarrotEventLoginClicked,
} from '@shared/externals';
import { AxiosPromise } from 'axios';
import {
  getSettings,
  getShortProfileInfoThunk,
  redirectClientAfterAuth,
  redirectSpecialistAfterAuth,
  setAuthCookies,
  setProfileState,
} from '@entities/models';
import {
  TAccountType,
  TBodyAuthenticateBySmsCode,
  TBodySendAuthenticationSmsCode,
  TSuccessfulAuthenticationResponseSchema,
  senseApi,
} from '@shared/api';
import {
  commonErrorProperties,
  createHydrateEntity,
  createLoadingStateEntity,
  createRoutePushAction,
  createStepEntity,
  serializeAxiosErrors,
  startListening,
} from '@shared/utils';
import {
  PHONE_AUTHENTICATION_SLICE_NAME,
  SHORT_PROFILE_SLICE_NAME,
} from '@shared/constants';

const hydrateEntity = createHydrateEntity({
  selectStoreFromHydrate: (payload) => payload[PHONE_AUTHENTICATION_SLICE_NAME],
});

const stepEntity = createStepEntity();
const authByPhoneLoadingEntity = createLoadingStateEntity(
  PHONE_AUTHENTICATION_SLICE_NAME,
  {
    loadingStateName: 'authByPhoneLoading',
    errorStateName: 'errorMessageWhenSendPhone',
  }
);
const sendCodeFromSmsLoadingEntity = createLoadingStateEntity(
  PHONE_AUTHENTICATION_SLICE_NAME,
  {
    loadingStateName: 'sendCodeFromSmsLoading',
    errorStateName: 'errorMessageWhenSendSms',
  }
);

const initialState = {
  phone_number: '',
  account_type: TAccountType.EClient,
  code: '',
  callbackUrl: '',
  ...hydrateEntity.getInitialState(),
  ...stepEntity.getInitialState(),
  ...authByPhoneLoadingEntity.getInitialState(),
  ...sendCodeFromSmsLoadingEntity.getInitialState(),
};

export const setAuthStep = createAction<string | number>('setAuthStep');
export const sendSmsCode = createAction<string>('sendSmsCode');
export const sendPhoneAgain = createAction('sendPhoneAgain');
export const changeAreaAuth = createAction<TAccountType>('changeAreaAuth');
export const openPhoneAuthentication = createRoutePushAction<TAccountType>(
  'openPhoneAuthentication',
  (area) => `/auth?account=${area}`
);

const sendPhoneNumberThunk = createAsyncThunk<
  AxiosPromise,
  TBodySendAuthenticationSmsCode
>(
  'sendPhoneNumberThunk',
  async ({ phone_number, account_type }) => {
    return await senseApi.sendAuthenticationSmsCode({
      phone_number,
      account_type,
    });
  },
  { serializeError: serializeAxiosErrors }
);

export const sendCodeFromSmsThunk = createAsyncThunk<
  AxiosPromise<TSuccessfulAuthenticationResponseSchema>,
  TBodyAuthenticateBySmsCode
>(
  'sendCodeFromSmsThunk',
  async ({ phone_number, code, account_type }) =>
    await senseApi.authenticateBySmsCode({
      phone_number,
      code,
      account_type,
    }),
  {
    serializeError: (value) =>
      serializeAxiosErrors(
        value,
        commonErrorProperties.filter(({ key }) => key !== 'status')
      ),
  }
);

export const phoneAuthenticationSlice = createSlice({
  name: PHONE_AUTHENTICATION_SLICE_NAME,
  initialState,
  reducers: {
    setPhoneNumber: (state, { payload }: PayloadAction<string>) => {
      state.phone_number = payload;
    },
    setAccountType(state, { payload }: PayloadAction<TAccountType>) {
      state.account_type = payload;
    },
    setCallbackUrl(state, { payload }: PayloadAction<string>) {
      state.callbackUrl = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(sendPhoneNumberThunk.fulfilled, (state) => {
      state.step = 1;
    });

    hydrateEntity.reducer(builder, setAccountType);
    stepEntity.reducer(builder, setAuthStep);
    authByPhoneLoadingEntity.reducer(builder, sendPhoneNumberThunk);
    sendCodeFromSmsLoadingEntity.reducer(builder, sendCodeFromSmsThunk);
  },
});

const { name } = phoneAuthenticationSlice;

export const { setPhoneNumber, setAccountType, setCallbackUrl } =
  phoneAuthenticationSlice.actions;

const slice = (state: RootState) => state[PHONE_AUTHENTICATION_SLICE_NAME];
export const selectPhoneAuthStep = stepEntity.getSelectors(slice);
export const selectAccountType = createSelector(
  slice,
  (state) => state.account_type
);

export const selectAuthByPhoneLoaderState =
  authByPhoneLoadingEntity.getSelectors(slice);
export const selectCodeFromSmsLoaderState =
  sendCodeFromSmsLoadingEntity.getSelectors(slice);

startListening({
  actionCreator: changeAreaAuth,
  effect: ({ payload: areaType }, { dispatch }) => {
    dispatch(setAccountType(areaType));
    dispatch(openPhoneAuthentication(areaType));
  },
});

startListening({
  matcher: isAnyOf(sendPhoneAgain, setPhoneNumber),
  effect: (_, { dispatch, getState }) => {
    const { phone_number, account_type } = getState()[name];

    dispatch(
      sendPhoneNumberThunk({
        phone_number,
        account_type,
      })
    );
  },
});

startListening({
  actionCreator: sendSmsCode,
  effect: ({ payload }, { dispatch, getState }) => {
    const { phone_number, account_type } = getState()[name];

    dispatch(
      sendCodeFromSmsThunk({
        phone_number,
        account_type,
        code: payload,
      })
    );
  },
});

startListening({
  actionCreator: sendCodeFromSmsThunk.fulfilled,
  effect: async ({ payload }, { dispatch, getState, delay }) => {
    const { account_type } = getState()[name];
    const { data } = await payload;
    const { auth_token } = data;

    dispatch(setProfileState({ auth_token, account_type }));
    dispatch(setAuthCookies());
    await dispatch(getShortProfileInfoThunk({ auth_token, account_type }));
    dispatch(getSettings());
    await delay(300);

    if ((account_type as TAccountType) === TAccountType.EClient) {
      dispatch(redirectClientAfterAuth());
    } else {
      dispatch(redirectSpecialistAfterAuth());
    }
  },
});

startListening({
  actionCreator: sendCodeFromSmsThunk.fulfilled,
  effect: async ({ payload }, { getState, delay }) => {
    const { data } = await payload;
    const { auth_token } = data;

    try {
      await delay(1000);

      const { data } = await senseApi.getCarrotUserHash({
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      });

      const { id: accountId } = getState()[SHORT_PROFILE_SLICE_NAME];

      carrotquest?.auth(accountId, data.user_hash);

      await senseApi.setCarrotClientUid(
        {
          carrot_client_uid: carrotquest.data.user.id,
        },
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        }
      );

      sendCarrotEventAuthenticated();
    } catch (err) {
      throw err;
    }
  },
});

startListening({
  actionCreator: sendPhoneNumberThunk.fulfilled,
  effect: async (_, { getState }) => {
    const { account_type } = getState()[PHONE_AUTHENTICATION_SLICE_NAME];
    sendCarrotEventAuthSmsSent({ accountType: account_type });
  },
});

startListening({
  actionCreator: openPhoneAuthentication,
  effect: () => {
    sendCarrotEventLoginClicked();
  },
});
