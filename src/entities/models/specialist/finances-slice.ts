import {
  createAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  TSpecialistFinanceOperationSchema,
  TSpecialistStatsResponseSchema,
  senseApi,
} from '@shared/api';
import {
  createHydrateEntity,
  serializeAxiosErrors,
  startListening,
} from '@shared/utils';
import {
  SHORT_PROFILE_SLICE_NAME,
  SPECIALIST_FINANCE,
} from '@shared/constants';

const FINANCE_OPERATIONS_SIZE = 10;

const operationEntityAdapter =
  createEntityAdapter<TSpecialistFinanceOperationSchema>({
    selectId: ({ id }) => id,
  });

const hydrateEntity = createHydrateEntity({
  selectStoreFromHydrate: (payload) => payload[SPECIALIST_FINANCE],
});

const initialState = {
  finances: {
    stats: {} as TSpecialistStatsResponseSchema,
  },
  operations: {
    page_num: 1,
    has_more: true,
    ...operationEntityAdapter.getInitialState(),
  },
  ...hydrateEntity.getInitialState(),
};
export const updateFinances = createAction('updateFinances');

export const getFinancesThunkSSR = createAsyncThunk(
  'getFinancesThunkSSR',
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { auth_token } = state[SHORT_PROFILE_SLICE_NAME];

    return await Promise.all([
      senseApi.getFinancesData({
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }),
      senseApi.getFinancesOperations(
        {
          page_num: 1,
          page_size: FINANCE_OPERATIONS_SIZE,
        },
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        }
      ),
    ]);
  },
  { serializeError: serializeAxiosErrors }
);

export const getFinancesThunk = createAsyncThunk(
  'getFinancesThunk',
  (auth_token: string) =>
    senseApi.getFinancesData({
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }),
  { serializeError: serializeAxiosErrors }
);

export const getFinancesOperation = createAsyncThunk(
  'getFinancesOperation',
  ({
    auth_token,
    page_num = 1,
    page_size = FINANCE_OPERATIONS_SIZE,
  }: {
    auth_token: string;
    page_num?: number;
    page_size?: number;
  }) =>
    senseApi.getFinancesOperations(
      {
        page_num,
        page_size,
      },
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    ),
  { serializeError: serializeAxiosErrors }
);

export const financesSlice = createSlice({
  name: SPECIALIST_FINANCE,
  initialState,
  reducers: {
    nextPage: (state) => {
      state.operations.page_num += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFinancesThunk.fulfilled, (state, { payload }) => {
        state.finances.stats = payload.data.stats;
      })
      .addCase(getFinancesOperation.fulfilled, (state, { payload }) => {
        if (payload.data.operations?.length === 0) {
          state.operations.has_more = false;
        }

        operationEntityAdapter.addMany(
          state.operations,
          payload.data.operations as TSpecialistFinanceOperationSchema[]
        );
      })
      .addCase(getFinancesThunkSSR.fulfilled, (state, { payload }) => {
        const [finances, operations] = payload;
        state.finances.stats = finances.data.stats;

        operations.data.operations &&
          operationEntityAdapter.setMany(
            state.operations,
            operations.data.operations
          );
      });

    hydrateEntity.reducer(builder, getFinancesThunkSSR);
  },
});

export const { nextPage } = financesSlice.actions;

const self = (state: RootState) => state[financesSlice.name];

export const selectFinance = createSelector(self, ({ finances }) => finances);

export const selectOperations = operationEntityAdapter.getSelectors(
  (state: RootState) => state[financesSlice.name].operations
).selectAll;

startListening({
  actionCreator: nextPage,
  effect: (_, { dispatch, getState }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];
    const { operations } = getState()[financesSlice.name];

    if (operations.has_more) {
      dispatch(
        getFinancesOperation({ auth_token, page_num: operations.page_num })
      );
    }
  },
});

startListening({
  actionCreator: updateFinances,
  effect: (_, { dispatch, getState }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];

    dispatch(getFinancesThunk(auth_token));
  },
});
