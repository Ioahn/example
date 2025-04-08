import {
  createAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { TSpecialistSearchEntrySchema } from '@shared/api';
import {
  createHydrateEntity,
  createLoadingStateEntity,
  createPageLoaderEntity,
  createResetEntity,
} from '@shared/utils';
import {
  RECOMMENDED_SPECIALISTS_REDUCER,
  SPECIALISTS_SLICE,
} from './constants';
import { getSpecialistsListThunk, getSpecialistsListThunkSSR } from './thunk';
import { TFilters } from './types';

export const initSpecialistsPage = createAction<TFilters>(
  'initSpecialistsPage'
);
export const nextSpecialistsPage = createAction<TFilters>(
  'nextSpecialistsPage'
);
export const prevSpecialistsPage = createAction<TFilters>(
  'prevSpecialistsPage'
);

export const specialistPageLoaderEntity = createPageLoaderEntity({
  selectPageState: (state: AnyObject) =>
    state[RECOMMENDED_SPECIALISTS_REDUCER][SPECIALISTS_SLICE],
});

export const specialistsLoadingState = createLoadingStateEntity(
  SPECIALISTS_SLICE,
  {
    loadingStateName: 'loadingState',
    errorStateName: 'errorMessage',
  }
);

export const specialistsEntityAdapter =
  createEntityAdapter<TSpecialistSearchEntrySchema>({
    selectId: (specialist) => specialist.id,
  });

const hydrateEntity = createHydrateEntity({
  selectStoreFromHydrate: (payload) => {
    return payload[RECOMMENDED_SPECIALISTS_REDUCER]?.[SPECIALISTS_SLICE] || {};
  },
});

const initialState = {
  ...specialistsLoadingState.getInitialState(),
  ...specialistsEntityAdapter.getInitialState(),
  ...specialistPageLoaderEntity.getInitialState(),
};

const resetEntity = createResetEntity(initialState);

export const resetSpecialists = createAction('resetSpecialists');

export const recommendedSpecialistSlice = createSlice({
  name: SPECIALISTS_SLICE,
  initialState: { ...initialState, ...hydrateEntity.getInitialState() },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSpecialistsListThunk.fulfilled, (state, { payload }) => {
      const { specialists: specialistList = [] } = payload.data;

      specialistsEntityAdapter.addMany(state, specialistList);
    });

    hydrateEntity.reducer(builder, getSpecialistsListThunkSSR);
    resetEntity.reducer(builder, resetSpecialists);

    specialistPageLoaderEntity.reducer(builder, {
      initPageAction: initSpecialistsPage,
      prevPageAction: prevSpecialistsPage,
      nextPageAction: nextSpecialistsPage,
      fetcherThunk: getSpecialistsListThunk,
    });
  },
});
