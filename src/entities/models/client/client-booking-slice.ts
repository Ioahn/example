import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSelector,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import {
  sendCarrotEventPromocodeUsed,
  sendCarrotEventSpecialistSlotSelected,
} from '@shared/externals';
import { push } from 'connected-next-router';
import { compose, isNotNil, last, zip } from 'ramda';
import { setTimeout } from 'worker-timers';
import { getClientProfileThunk } from '@entities/models';
import {
  openPublicSpecialistProfileFromSearch,
  selectSpecialist,
} from '@entities/models/client/public-specialist-profile-slice';
import {
  TAreaType,
  TBodyApplyPromocode,
  TBodyGetPaymentUrlForProductPurchase,
  TBodyPayForProductBySavedPaymentMethod,
  TPurchaseStateResponseSchema,
  TSessionsProductSchema,
  TSpecialistProfileResponseSchema,
  senseApi,
} from '@shared/api';
import {
  createHydrateEntity,
  createLoadingStateEntity,
  createRoutePushAction,
  reachGoalAction,
  serializeAxiosErrors,
  startListening,
} from '@shared/utils';
import {
  CLIENT_BOOKING_SLICE_NAME,
  CLIENT_PROFILE_SLICE_NAME,
  PRICE_OPTIONS,
  PUBLIC_SPECIALIST_PROFILE_SLICE_NAME,
  SHORT_PROFILE_SLICE_NAME,
} from '@shared/constants';

const hydrateEntity = createHydrateEntity({
  selectStoreFromHydrate: (payload) => payload[CLIENT_BOOKING_SLICE_NAME],
});

const loadStateEntity = createLoadingStateEntity(CLIENT_BOOKING_SLICE_NAME, {
  loadingStateName: 'paymentLoadingState',
  errorStateName: 'paymentErrorMessage',
});

const promoCodeLoadStateEntity = createLoadingStateEntity(
  CLIENT_BOOKING_SLICE_NAME,
  {
    loadingStateName: 'promoCodeLoadingState',
    errorStateName: 'promoCodeErrorMessage',
    persist: true,
  }
);

const orderCheckLoadingStateEntity = createLoadingStateEntity(
  CLIENT_BOOKING_SLICE_NAME,
  {
    loadingStateName: 'orderCheckLoadingState',
    errorStateName: 'orderCheckErrorMessage',
    persist: true,
  }
);

const initialState = {
  activeArea: null as Maybe<TAreaType>,
  activeTab: PRICE_OPTIONS.ONE_SESSION,
  slots: null as Maybe<string | string[]>,
  sessionsAtWeek: 1,
  agreement: true,
  promocode: null as Maybe<string>,
  promocode_session: null as Maybe<TSessionsProductSchema>,
  orderState: null as Maybe<TPurchaseStateResponseSchema>,
  ...hydrateEntity.getInitialState(),
  ...loadStateEntity.getInitialState(),
  ...promoCodeLoadStateEntity.getInitialState(),
  ...orderCheckLoadingStateEntity.getInitialState(),
};

export const openClientBooking = createAction<{
  id: string;
  areaType?: TAreaType | null;
}>('openClientBooking');
export const openClientInvoice = createAction<{
  id: string;
  areaType: TAreaType;
}>('openClientInvoice');
export const openFailedPaymentPage = createRoutePushAction(
  'openFailedPaymentPage',
  '/payment/failure'
);

export const buyProductByUrl = createAction('buyProductByUrl');
export const addNewPaymentMethod = createAction('addNewPaymentMethod');
export const buyProductBySavedMethod = createAction('buyProductBySavedMethod');
export const checkOrderStatus = createAction('checkOrderStatus');

export const applyPromoCodeThunk = createAsyncThunk(
  'applyPromoCodeThunk',
  ({
    auth_token,
    ...rest
  }: TBodyApplyPromocode & {
    auth_token: string;
  }) =>
    senseApi.applyPromocode(rest, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    })
);

const buyProductByUrlThunk = createAsyncThunk(
  'buyProductByUrlThunk',
  ({
    auth_token,
    ...rest
  }: TBodyGetPaymentUrlForProductPurchase & {
    auth_token: string;
  }) =>
    senseApi.getPaymentUrlForProductPurchase(rest, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }),
  { serializeError: serializeAxiosErrors }
);

const addNewPaymentMethodThunk = createAsyncThunk(
  'addNewPaymentMethodThunk',
  ({ auth_token }: { auth_token: string }) =>
    senseApi.getClientPaymentMethodCreationLink({
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }),
  { serializeError: serializeAxiosErrors }
);

export const checkOrderStatusThunk = createAsyncThunk(
  'checkOrderStatus',
  async (
    {
      order_id,
      try_number = 0,
    }: {
      order_id: string;
      try_number?: number;
    },
    { rejectWithValue }
  ) => {
    const response = await senseApi.getOrderState(
      { order_id },
      {
        headers: {
          'x-try-number': try_number,
        },
      }
    );

    if (response.status === 202) {
      return rejectWithValue('Too early');
    }

    return response;
  },
  { serializeError: serializeAxiosErrors }
);

const buyProductBySavedMethodThunk = createAsyncThunk(
  'buyProductBySavedMethodThunk',
  ({
    auth_token,
    ...rest
  }: TBodyPayForProductBySavedPaymentMethod & {
    auth_token: string;
  }) =>
    senseApi.payForProductBySavedPaymentMethod(rest, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }),
  { serializeError: serializeAxiosErrors }
);

export const clientBookingSlice = createSlice({
  name: CLIENT_BOOKING_SLICE_NAME,
  initialState,
  reducers: {
    setPromoCode: (state, { payload }: PayloadAction<string>) => {
      state.promocode = payload;
    },
    setClientActiveArea: (state, { payload }: PayloadAction<TAreaType>) => {
      state.activeArea = payload;
    },
    setClientActivePriceTab: (
      state,
      { payload }: PayloadAction<keyof typeof PRICE_OPTIONS>
    ) => {
      state.activeTab = payload;
    },
    setPurchasedSlots: (
      state,
      { payload }: PayloadAction<Maybe<string | string[]>>
    ) => {
      state.slots = payload;
    },
    setSessionsAtWeek: (state, { payload }: PayloadAction<number>) => {
      state.sessionsAtWeek = payload;
    },
    setAgreement: (state, { payload }: PayloadAction<boolean>) => {
      state.agreement = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClientProfileThunk.fulfilled, (state, { payload }) => {
        state.activeArea =
          payload?.data?.specialist?.working_areas[0] ||
          TAreaType.EPsychotherapy;
      })
      .addCase(applyPromoCodeThunk.fulfilled, (state, { payload }) => {
        state.promocode_session = payload.data;
      })
      .addCase(checkOrderStatusThunk.fulfilled, (state, { payload }) => {
        state.orderState = payload.data;
      });

    hydrateEntity.reducer(builder);
    loadStateEntity.reducer(builder, buyProductByUrlThunk);
    loadStateEntity.reducer(builder, buyProductBySavedMethodThunk);
    loadStateEntity.reducer(builder, addNewPaymentMethodThunk);
    promoCodeLoadStateEntity.reducer(builder, applyPromoCodeThunk);
    orderCheckLoadingStateEntity.reducer(builder, checkOrderStatusThunk);
  },
});

export const {
  setClientActiveArea,
  setClientActivePriceTab,
  setPurchasedSlots,
  setSessionsAtWeek,
  setAgreement,
  setPromoCode,
} = clientBookingSlice.actions;

export const { resetLoadingStateAction: resetPromoCodeLoadingState } =
  promoCodeLoadStateEntity;

export const { resetLoadingStateAction: resetOrderCheckLoadingState } =
  orderCheckLoadingStateEntity;

const slice = (state: RootState) => state[CLIENT_BOOKING_SLICE_NAME];

export const selectClientProfileTab = createSelector(
  slice,
  ({ activeTab }) => activeTab
);

export const selectSessionAtWeek = createSelector(
  slice,
  ({ sessionsAtWeek }) => sessionsAtWeek
);

export const selectClientProfileArea = createSelector(
  slice,
  ({ activeArea }) => activeArea
);

export const selectAgreement = createSelector(
  slice,
  ({ agreement }) => agreement
);

export const selectPurchaseSlot = createSelector(slice, ({ slots }) => slots);
export const selectPromocodeSession = createSelector(
  slice,
  ({ promocode_session }) => promocode_session
);

export const selectPurchaseSlotWithDate = createSelector(
  selectPurchaseSlot,
  selectSpecialist,
  (purchaseSlots, specialist) => {
    if (!specialist || !purchaseSlots) {
      return null;
    }

    const purchaseSlot = Array.isArray(purchaseSlots)
      ? purchaseSlots[0]
      : purchaseSlots;

    const { slots = [] } = specialist;

    return slots.find((slot) => slot.id === purchaseSlot);
  }
);

export const selectPurchasedSlotsStatus = createSelector(slice, ({ slots }) =>
  Array.isArray(slots) ? !!slots.length : !!slots
);

export const selectPaymentProcessLoadingState =
  loadStateEntity.getSelectors(slice);

export const selectPrice = createSelector(
  slice,
  selectSpecialist,
  ({ activeArea, promocode_session }, specialist) => {
    if (!specialist || !activeArea) {
      return null;
    }
    const { price_options } = specialist;

    return promocode_session ?? price_options[activeArea];
  }
);

export const selectOrderState = createSelector(
  slice,
  ({ orderState }) => orderState
);

export const selectPromoCodeLoadingState =
  promoCodeLoadStateEntity.getSelectors(slice);

export const selectOrderCheckLoadingState =
  orderCheckLoadingStateEntity.getSelectors(slice);

startListening({
  actionCreator: buyProductByUrl,
  effect: (_, { dispatch, getState }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];
    const { slots, activeArea, agreement, promocode, promocode_session } =
      getState()[CLIENT_BOOKING_SLICE_NAME];

    const { specialist } = getState()[PUBLIC_SPECIALIST_PROFILE_SLICE_NAME];

    const { id, price_options } =
      specialist as NonNullable<TSpecialistProfileResponseSchema>;

    if (!activeArea) {
      return;
    }

    const product = promocode_session ?? price_options[activeArea];

    dispatch(
      buyProductByUrlThunk({
        save_card: agreement,
        auth_token,
        specialist_id: id as string,
        slot_id: slots as string,
        product_id: product.id,
        promocode,
      })
    );
  },
});

startListening({
  actionCreator: buyProductBySavedMethod,
  effect: (_, { dispatch, getState }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];
    const { slots, activeArea, promocode_session, promocode } =
      getState()[CLIENT_BOOKING_SLICE_NAME];

    const { specialist } = getState()[PUBLIC_SPECIALIST_PROFILE_SLICE_NAME];

    const { id, price_options } =
      specialist as NonNullable<TSpecialistProfileResponseSchema>;

    if (!activeArea) {
      return;
    }

    const product = promocode_session ?? price_options[activeArea];

    dispatch(
      buyProductBySavedMethodThunk({
        auth_token,
        specialist_id: id as string,
        slot_id: slots as string,
        product_id: product.id,
        promocode,
      })
    );
  },
});

startListening({
  actionCreator: addNewPaymentMethod,
  effect: (_, { dispatch, getState }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];

    dispatch(
      addNewPaymentMethodThunk({
        auth_token,
      })
    );
  },
});

startListening({
  actionCreator: buyProductByUrlThunk.fulfilled,
  effect: async ({ payload }) => {
    const { payment_url } = payload.data;
    location.href = payment_url;
  },
});

startListening({
  actionCreator: addNewPaymentMethodThunk.fulfilled,
  effect: async ({ payload }) => {
    const { form_url } = payload.data;
    location.href = form_url;
  },
});

startListening({
  actionCreator: buyProductBySavedMethodThunk.fulfilled,
  effect: async ({ payload }, { dispatch, delay }) => {
    const { redirect_url } = payload.data;
    await delay(300);

    dispatch(push(redirect_url));
  },
});

startListening({
  actionCreator: checkOrderStatus,
  effect: async (_, { getState, dispatch }) => {
    const { router } = getState() as RootState;
    const params = new URLSearchParams(router.location.search);
    const order_id = params.get('orderId') as string;

    dispatch(checkOrderStatusThunk({ order_id }));
  },
});

startListening({
  actionCreator: setPromoCode,
  effect: async (_, { getState, dispatch }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];
    const { promocode, activeArea } = getState()[CLIENT_BOOKING_SLICE_NAME];
    const { specialist } = getState()[PUBLIC_SPECIALIST_PROFILE_SLICE_NAME];

    if (!activeArea) {
      return;
    }

    const { price_options } =
      specialist as NonNullable<TSpecialistProfileResponseSchema>;

    dispatch(
      applyPromoCodeThunk({
        auth_token,
        promocode_code: promocode as string,
        product_id: price_options[activeArea].id,
      })
    );
  },
});

startListening({
  actionCreator: applyPromoCodeThunk.fulfilled,
  effect: async (_, { getState }) => {
    const { promocode, activeArea } = getState()[CLIENT_BOOKING_SLICE_NAME];
    const { specialist } = getState()[PUBLIC_SPECIALIST_PROFILE_SLICE_NAME];

    if (!activeArea) {
      return;
    }

    sendCarrotEventPromocodeUsed({
      promocode: promocode as string,
      area: activeArea,
      specialistId: specialist?.id as string,
      specialistName: `${specialist?.first_name} ${specialist?.last_name}`,
    });
  },
});

startListening({
  actionCreator: checkOrderStatusThunk.rejected,
  effect: async ({ payload, meta }, { dispatch, delay }) => {
    if (payload === 'Too early') {
      setTimeout(
        () =>
          dispatch(
            checkOrderStatusThunk({
              ...meta.arg,
              try_number: (meta.arg.try_number || 0) + 1,
            })
          ),
        ((meta.arg.try_number || 0) + 1) * 1_000
      );
      return;
    }

    await delay(3000);

    dispatch(openFailedPaymentPage());
  },
});

startListening({
  actionCreator: openClientBooking,
  effect: ({ payload }, { dispatch, getState }) => {
    const { slots, activeTab } = getState()[CLIENT_BOOKING_SLICE_NAME];

    const searchParams = new URLSearchParams();

    zip(
      ['option', 'id', 'area'],
      [
        activeTab,
        Array.isArray(slots) ? slots.join(',') : slots,
        payload.areaType,
      ]
    )
      .filter(compose(isNotNil, last))
      .forEach(([key, value]) => searchParams.set(key, value as string));

    dispatch(
      push(`/client/profile/booking/${payload.id}?${searchParams.toString()}`)
    );
  },
});

startListening({
  actionCreator: openClientInvoice,
  effect: ({ payload }, { dispatch, getState }) => {
    const { slots, activeTab } = getState()[CLIENT_BOOKING_SLICE_NAME];

    const searchParams = new URLSearchParams();

    const specialistId = payload.id;
    const activeArea = payload.areaType;

    zip(
      ['option', 'id', 'area'],
      [activeTab, Array.isArray(slots) ? slots.join(',') : slots, activeArea]
    )
      .filter(compose(isNotNil, last))
      .forEach(([key, value]) => searchParams.set(key, value as string));

    dispatch(
      push(`/client/profile/invoice/${specialistId}?${searchParams.toString()}`)
    );
  },
});

startListening({
  actionCreator: openClientInvoice,
  effect: (_, { getState }) => {
    const { specialist } = getState()[PUBLIC_SPECIALIST_PROFILE_SLICE_NAME];

    const { slots, activeArea } = getState()[CLIENT_BOOKING_SLICE_NAME];
    if (!specialist || !slots || !specialist.slots) {
      return;
    }

    const purchaseSlot = Array.isArray(slots) ? slots[0] : slots;

    const selectedSlot = specialist.slots.find(
      (slot) => slot.id === purchaseSlot
    );

    if (!selectedSlot) {
      return;
    }

    const { location } = getState().router;

    sendCarrotEventSpecialistSlotSelected({
      specialistId: specialist.id as string,
      specialistName: `${specialist?.first_name || ''} ${specialist?.last_name || ''}`,
      slotId: slots as string,
      slotDateTimeUtc: new Date(
        selectedSlot.slot_date * 1000
      ).toISOString() as string,
      onPageUrl: location.pathname,
      area: activeArea as string,
    });
  },
});

startListening({
  actionCreator: checkOrderStatusThunk.fulfilled,
  effect: async ({ payload }, { dispatch, delay }) => {
    await delay(3000);

    const { metrika_goal_name } = payload?.data || {};

    if (metrika_goal_name) {
      dispatch(reachGoalAction(metrika_goal_name));
    }
  },
});

startListening({
  matcher: isAnyOf(setClientActiveArea, setPurchasedSlots),
  effect: async (_, { getState }) => {
    if (!window) {
      return;
    }

    const state = getState();
    const { specialist } = state[PUBLIC_SPECIALIST_PROFILE_SLICE_NAME];
    const { slots, activeTab, activeArea } = state[CLIENT_BOOKING_SLICE_NAME];
    const { client } = state[CLIENT_PROFILE_SLICE_NAME];
    const { router } = state;

    const specialistId = specialist?.id || client?.specialist?.id;

    // TODO придумать решение в проверкой роута
    if (
      !router.location.pathname.startsWith(
        `/client/profile/booking/${specialistId}`
      )
    ) {
      return;
    }

    const url = new URL(window.location.href);

    url.pathname = `/client/profile/booking/${specialistId}`;
    const searchParams = new URLSearchParams();

    zip(
      ['option', 'id', 'area'],
      [activeTab, Array.isArray(slots) ? slots.join(',') : slots, activeArea]
    )
      .filter(compose(isNotNil, last))
      .forEach(([key, value]) => searchParams.set(key, value as string));

    url.search = searchParams.toString();

    console.log(window.history);

    window.history.replaceState(null, '', url.toString());
  },
});

startListening({
  actionCreator: openPublicSpecialistProfileFromSearch,
  effect: ({ payload }, { dispatch }) => {
    dispatch(setClientActiveArea(payload.area));
  },
});
