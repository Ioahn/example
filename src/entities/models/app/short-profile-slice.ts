import {
  PayloadAction,
  createAction,
  createSelector,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import { sendCarrotEventOnboardingTopicSelectionOpened } from '@shared/externals';
import { push } from 'connected-next-router';
import Cookie from 'js-cookie';
import { always, cond, equals } from 'ramda';
import {
  openCalendar,
  openClientProfileEdit,
  openEditCalendar,
  resetSelectedTopics,
} from '@entities/models';
import { updateClientProfileThunk } from '@entities/models/client/profile-edit-slice';
import { updatePrivateSpecialistProfile } from '@entities/models/specialist';
import { TAccountType, TSpecialistOnboardingStage } from '@shared/api';
import {
  createHydrateEntity,
  createResetEntity,
  createRoutePushAction,
  pathMatcher,
  startListening,
} from '@shared/utils';
import { onMountAppAction } from '@shared/hooks';
import {
  PHONE_AUTHENTICATION_SLICE_NAME,
  SELECTED_TOPICS_SLICE_NAME,
  SHORT_PROFILE_SLICE_NAME,
} from '@shared/constants';
import { getShortProfileInfoThunk } from './thunk';

const hydrateEntity = createHydrateEntity({
  selectStoreFromHydrate: (payload) => payload[SHORT_PROFILE_SLICE_NAME],
});

const initialState: ShortProfileState = {
  id: '',
  last_name: null,
  avatar_url: null,
  first_name: null,
  auth_token: '',
  account_type: null,
  is_onboarding: false,
  onboarding_stage: null,
  has_payment_method: null as unknown as boolean,
  current_area: null,
  is_telegram_notifications_connected: false,
};

const resetEntity = createResetEntity(initialState);
export const clearProfile = createAction('clearProfile');
export const openProfile = createAction('openProfile');
export const updateShortProfileInfo = createAction('updateShortProfileInfo');
export const logout = createAction('logout');
export const setAuthCookies = createAction('setAuthCookies');
export const clearAuthCookies = createAction('clearAuthCookies');

const clientAfterAppMount = createAction('clientAfterAppMount');
const specialistAfterAppMount = createAction('specialistAfterAppMount');
const specialistOnBoarding = createAction('specialistOnBoarding');
const clientOnBoarding = createAction('clientOnBoarding');

export const redirectClientAfterAuth = createAction('redirectClientAfterAuth');

export const redirectSpecialistAfterAuth = createAction(
  'redirectSpecialistAfterAuth'
);

export const openSearchSpecialist = createRoutePushAction(
  'openSearchSpecialist',
  '/client/search-specialist'
);

export const openClientSelectAreaType = createRoutePushAction(
  'openClientTopics',
  '/client/select/area-type'
);

export const openClientTopics = createRoutePushAction(
  'openClientTopics',
  '/client/select/topics'
);

export const openClientRequirement = createRoutePushAction(
  'openClientRequirement',
  '/client/select/requirement'
);

export const openProfileEdit = createRoutePushAction(
  'openProfileEdit',
  '/specialist/profile-edit'
);

export const openClientProfile = createRoutePushAction(
  'openClientProfile',
  '/client/profile'
);
export const openSpecialistProfile = createRoutePushAction(
  'openSpecialistProfile',
  '/specialist/profile'
);

export const shortProfileSlice = createSlice({
  name: SHORT_PROFILE_SLICE_NAME,
  initialState,
  reducers: {
    setProfileState(
      state,
      { payload }: PayloadAction<Partial<ShortProfileState>>
    ) {
      Object.assign(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getShortProfileInfoThunk.fulfilled,
      (state, { payload }) => {
        Object.assign(state, payload.data);
      }
    );

    hydrateEntity.reducer(builder);
    resetEntity.reducer(builder, clearProfile);
  },
});

export const { setProfileState } = shortProfileSlice.actions;

export const selectShortProfile = (state: RootState) =>
  state[shortProfileSlice.name];

export const selectAuthStatus = createSelector(
  selectShortProfile,
  ({ auth_token }) => !!auth_token
);

export const selectProfileData = createSelector(
  selectShortProfile,
  ({
    first_name,
    last_name,
    avatar_url,
    account_type,
    is_onboarding,
    is_telegram_notifications_connected,
    ...rest
  }) => ({
    first_name,
    hasName: !!first_name,
    full_name: `${first_name} ${last_name || ''}`,
    avatar_url: avatar_url || '',
    is_client: (account_type as TAccountType) === TAccountType.EClient,
    is_specialist: (account_type as TAccountType) === TAccountType.ESpecialist,
    account_type,
    is_onboarding,
    onboarding_stage: (rest as Partial<TShirtSpecialistType>).onboarding_stage,
    has_payment_method: (rest as Partial<TShirtClientType>).has_payment_method,
    currentArea: (rest as Partial<TShirtClientType>).current_area,
    is_telegram_notifications_connected,
    id: rest.id,
  })
);

startListening({
  matcher: isAnyOf(
    onMountAppAction,
    updateShortProfileInfo,
    updatePrivateSpecialistProfile.fulfilled
  ),
  effect: async (_, { getState, dispatch }) => {
    const { auth_token, account_type } = getState()[SHORT_PROFILE_SLICE_NAME];

    if (!auth_token) return;

    dispatch(
      getShortProfileInfoThunk({
        account_type: account_type as TAccountType,
        auth_token,
      })
    );
  },
});

startListening({
  actionCreator: onMountAppAction,
  effect: (_, { getState, dispatch }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];
    const hasAuthCookie = Boolean(Cookie.get('auth'));

    if (!auth_token && hasAuthCookie) {
      dispatch(logout());
    }
  },
});

startListening({
  actionCreator: onMountAppAction,
  effect: (_, { getState, dispatch }) => {
    const { auth_token, account_type } = getState()[SHORT_PROFILE_SLICE_NAME];

    if (!auth_token) return;

    if ((account_type as TAccountType) === TAccountType.EClient) {
      dispatch(clientAfterAppMount());
    }

    if ((account_type as TAccountType) === TAccountType.ESpecialist) {
      dispatch(specialistAfterAppMount());
    }
  },
});

startListening({
  actionCreator: clientAfterAppMount,
  effect: async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { is_onboarding } = state[SHORT_PROFILE_SLICE_NAME];
    const { pathname } = state.router.location;

    if (pathname.startsWith('/docs/')) {
      return;
    }

    if (is_onboarding) {
      dispatch(clientOnBoarding());
      return;
    }
  },
});

startListening({
  actionCreator: specialistAfterAppMount,
  effect: async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { is_onboarding } = state[SHORT_PROFILE_SLICE_NAME];
    const { pathname } = state.router.location;

    if (pathname.startsWith('/docs/')) {
      return;
    }

    if (is_onboarding) {
      dispatch(specialistOnBoarding());
      return;
    }
  },
});

startListening({
  actionCreator: redirectClientAfterAuth,
  effect: async (_, { getState, dispatch }) => {
    const state = getState() as RootState;

    const { is_onboarding } = state[SHORT_PROFILE_SLICE_NAME];

    if (is_onboarding) {
      dispatch(clientOnBoarding());
      return;
    }

    dispatch(openProfile());
  },
});

startListening({
  actionCreator: clientOnBoarding,
  effect: async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { first_name } = state[SHORT_PROFILE_SLICE_NAME];
    const hasTopics = !!state[SELECTED_TOPICS_SLICE_NAME].choseTopics.length;
    const { callbackUrl } = state[PHONE_AUTHENTICATION_SLICE_NAME];

    const isBookingCallBack = pathMatcher(
      '/client/profile/booking/*',
      callbackUrl
    );

    if (!first_name) {
      dispatch(openClientProfileEdit());

      return;
    }

    if (isBookingCallBack) {
      dispatch(push(callbackUrl));

      return;
    }

    if (!hasTopics) {
      dispatch(openClientSelectAreaType());

      return;
    }

    if (callbackUrl) {
      dispatch(push(callbackUrl));

      return;
    }

    dispatch(openSearchSpecialist());
  },
});

startListening({
  actionCreator: updateClientProfileThunk.fulfilled,
  effect: async (_, { getState, dispatch, delay }) => {
    const state = getState() as RootState;

    const isPathMatch = pathMatcher(
      '/client/profile-edit',
      state.router.location.pathname
    );

    if (isPathMatch) {
      await delay(300);
      dispatch(clientOnBoarding());

      return;
    }
  },
});

startListening({
  actionCreator: redirectSpecialistAfterAuth,
  effect: (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const { is_onboarding } = state[SHORT_PROFILE_SLICE_NAME];
    const { callbackUrl } = state[PHONE_AUTHENTICATION_SLICE_NAME];

    if (is_onboarding) {
      dispatch(specialistOnBoarding());
      return;
    }

    if (callbackUrl) {
      dispatch(push(callbackUrl));
      return;
    }

    dispatch(openCalendar());
  },
});

startListening({
  actionCreator: specialistOnBoarding,
  effect: (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const { onboarding_stage } = state[
      SHORT_PROFILE_SLICE_NAME
    ] as TShirtSpecialistType;

    const action = cond([
      [
        equals(TSpecialistOnboardingStage.EProfileEdit),
        always(openProfileEdit),
      ],
      [
        equals(TSpecialistOnboardingStage.EFirstScheduleSettings),
        always(openEditCalendar),
      ],
    ])(onboarding_stage as TSpecialistOnboardingStage);

    dispatch(action());
  },
});

startListening({
  predicate: (action, currentState) => {
    const { is_onboarding, account_type } = (currentState as RootState)[
      SHORT_PROFILE_SLICE_NAME
    ];

    return (
      !!is_onboarding &&
      onMountAppAction.match(action) &&
      (account_type as TAccountType) === TAccountType.ESpecialist
    );
  },
  effect: async (_, { dispatch, getState }) => {
    const { location } = getState().router;
    const { auth_token, account_type } = getState()[SHORT_PROFILE_SLICE_NAME];

    const pathes = ['/specialist/profile-edit', '/specialist/calendar/edit'];

    if (
      pathes.some((pathPattern) => pathMatcher(pathPattern, location.pathname))
    ) {
      dispatch(
        getShortProfileInfoThunk({
          auth_token,
          account_type: account_type as TAccountType,
        })
      );
    }
  },
});

startListening({
  actionCreator: openProfile,
  effect: (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { account_type } = state[SHORT_PROFILE_SLICE_NAME];

    if ((account_type as TAccountType) === TAccountType.EClient) {
      dispatch(openClientProfile());
    } else {
      dispatch(openSpecialistProfile());
    }
  },
});

startListening({
  actionCreator: setAuthCookies,
  effect: (_, { getState }) => {
    const { account_type } = getState()[SHORT_PROFILE_SLICE_NAME];
    Cookie.set('account', account_type as TAccountType, { sameSite: 'lax' });
    Cookie.set('auth', 'true', { sameSite: 'lax' });
  },
});

startListening({
  actionCreator: clearAuthCookies,
  effect: () => {
    Object.keys(Cookie.get()).forEach((cookieName) => {
      Cookie.remove(cookieName);
    });
  },
});

startListening({
  actionCreator: logout,
  effect: async (_, { dispatch, delay }) => {
    dispatch(clearAuthCookies());
    dispatch(clearProfile());
    dispatch(resetSelectedTopics());
    localStorage.clear();
    await delay(100);

    //TODO придумать норм способ обнулять стейт всего приложения ( истории изменений не должно быть в редакс плагине )
    location && location.reload();
  },
});

startListening({
  actionCreator: openClientTopics,
  effect: () => {
    sendCarrotEventOnboardingTopicSelectionOpened();
  },
});

startListening({
  actionCreator: onMountAppAction,
  effect: (_, { getState }) => {
    const { location } = getState().router;
    if (location.pathname.startsWith('/client/select/topics')) {
      sendCarrotEventOnboardingTopicSelectionOpened();
    }
  },
});
