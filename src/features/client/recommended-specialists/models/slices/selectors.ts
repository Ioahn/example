import { createSelector } from '@reduxjs/toolkit';
import {
  RECOMMENDED_SPECIALISTS_REDUCER,
  SPECIALISTS_FILTER_SLICE,
  SPECIALISTS_SLICE,
} from './constants';
import {
  specialistsEntityAdapter,
  specialistsLoadingState,
} from './specialists-slice';

const specialistsSlice = (state: RootState) =>
  state[RECOMMENDED_SPECIALISTS_REDUCER][SPECIALISTS_SLICE];

const specialistFilterSlice = (state: RootState) =>
  state[RECOMMENDED_SPECIALISTS_REDUCER][SPECIALISTS_FILTER_SLICE];

export const selectAllSpecialist = createSelector(
  specialistsSlice,
  specialistsEntityAdapter.getSelectors().selectAll
);

export const selectFilters = createSelector(
  specialistFilterSlice,
  (state) => state
);

export const selectSpecialistsLoaderState =
  specialistsLoadingState.getSelectors;

export const selectSpecialistPageState = createSelector(
  specialistsSlice,
  ({ is_init, has_more, page_num }) => ({ is_init, has_more, page_num })
);
