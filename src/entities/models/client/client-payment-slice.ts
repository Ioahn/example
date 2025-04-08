import {
  createAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  TClientTransactionEntrySchema,
  TPaymentMethodSchema,
  senseApi,
} from '@shared/api';
import {
  createHydrateEntity,
  createLoadingStateEntity,
  createPageLoaderEntity,
  createRoutePushAction,
  serializeAxiosErrors,
  startListening,
} from '@shared/utils';
import {
  CLIENT_PAYMENTS_SLICE_NAME,
  SHORT_PROFILE_SLICE_NAME,
} from '@shared/constants';

export const hydrateEntity = createHydrateEntity({
  selectStoreFromHydrate: (payload) => payload[CLIENT_PAYMENTS_SLICE_NAME],
});

export const paymentLoadingStateEntity = createLoadingStateEntity(
  CLIENT_PAYMENTS_SLICE_NAME,
  {
    loadingStateName: 'paymentLoadingState',
    errorStateName: 'paymentErrorMessage',
  }
);

export const deletePaymentLoadingStateEntity = createLoadingStateEntity(
  CLIENT_PAYMENTS_SLICE_NAME,
  {
    loadingStateName: 'deletePaymentLoadingState',
    errorStateName: 'deletePaymentErrorMessage',
  }
);

export const paymentPageEntity = createPageLoaderEntity({
  pageSize: 50,
  selectPageState: (state: AnyObject) => state[CLIENT_PAYMENTS_SLICE_NAME],
  updateFunction: (state, updateObj) => {
    Object.assign(state, {
      page_num: state.page_num + 1,
      has_more: !!((updateObj.transactions as AnyArray) || []).length,
      is_init: updateObj.is_init,
    });
  },
});

export const transactionEntity =
  createEntityAdapter<TClientTransactionEntrySchema>({
    sortComparer: (transaction1, transaction2) =>
      transaction2.date - transaction1.date,
  });

const initialState = {
  payment_method: null as Maybe<TPaymentMethodSchema>,
  ...paymentPageEntity.getInitialState(),
  ...transactionEntity.getInitialState(),
  ...hydrateEntity.getInitialState(),
  ...paymentLoadingStateEntity.getInitialState(),
  ...deletePaymentLoadingStateEntity.getInitialState(),
};

export const openPayments = createRoutePushAction(
  'openPayments',
  '/client/profile/payments'
);

export const initTransactions = createAction('initTransactions');
export const nextTransactions = createAction('nextTransactions');
export const prevTransactions = createAction('prevTransactions');

export const getClientTransactionsThunk = createAsyncThunk(
  'getClientTransactionsThunk',
  ({
    auth_token,
    page_num,
    page_size,
  }: {
    auth_token: string;
    page_num: number;
    page_size: number;
  }) =>
    senseApi.getClientTransactions(
      { page_num, page_size },
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    ),
  { serializeError: serializeAxiosErrors }
);

export const getClientPaymentMethodThunk = createAsyncThunk(
  'getClientPaymentMethodThunk',
  ({ auth_token }: { auth_token: string }) =>
    senseApi.getPaymentMethod({
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }),
  { serializeError: serializeAxiosErrors }
);

export const deletePaymentMethodThunk = createAsyncThunk(
  'getClientPaymentMethodThunk',
  ({ auth_token }: { auth_token: string }) =>
    senseApi.deletePaymentMethod({
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }),
  { serializeError: serializeAxiosErrors }
);

export const getClientTransactionsThunkSSR = createAsyncThunk(
  'getClientTransactionsThunkSSR',
  async (_, { getState, dispatch }) => {
    const { auth_token } = (getState() as RootState)[SHORT_PROFILE_SLICE_NAME];

    await dispatch(
      getClientTransactionsThunk({ auth_token, page_num: 1, page_size: 10 })
    ).unwrap();
  },
  { serializeError: serializeAxiosErrors }
);
export const getClientPaymentMethodThunkSSR = createAsyncThunk(
  'getClientPaymentMethodThunkSSR',
  async (_, { getState, dispatch }) => {
    const { auth_token } = (getState() as RootState)[SHORT_PROFILE_SLICE_NAME];

    await dispatch(getClientPaymentMethodThunk({ auth_token })).unwrap();
  },
  { serializeError: serializeAxiosErrors }
);

export const clientPaymentSlice = createSlice({
  name: CLIENT_PAYMENTS_SLICE_NAME,
  initialState,
  reducers: {
    removePaymentMethod: (state) => {
      state.payment_method = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClientTransactionsThunk.fulfilled, (state, { payload }) => {
        transactionEntity.addMany(state, payload.data?.transactions || []);
      })
      .addCase(getClientPaymentMethodThunk.fulfilled, (state, { payload }) => {
        state.payment_method = payload.data;
      });

    paymentPageEntity.reducer(builder, {
      nextPageAction: nextTransactions,
      prevPageAction: prevTransactions,
      initPageAction: initTransactions,
      fetcherThunk: getClientTransactionsThunk,
    });
    deletePaymentLoadingStateEntity.reducer(builder, deletePaymentMethodThunk);
    paymentLoadingStateEntity.reducer(builder, getClientTransactionsThunk);
    hydrateEntity.reducer(builder, getClientTransactionsThunkSSR);
    hydrateEntity.reducer(builder, getClientPaymentMethodThunkSSR);
  },
});

export const { removePaymentMethod } = clientPaymentSlice.actions;

const slice = (state: RootState) => state[CLIENT_PAYMENTS_SLICE_NAME];

export const selectAllClientTransactions =
  transactionEntity.getSelectors(slice).selectAll;

export const selectClientPayments = createSelector(
  slice,
  ({ payment_method }) => payment_method
);

export const selectPaymentLoaders =
  paymentLoadingStateEntity.getSelectors(slice);

startListening({
  actionCreator: removePaymentMethod,
  effect: (_, { dispatch, getState }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];

    dispatch(deletePaymentMethodThunk({ auth_token }));
  },
});
