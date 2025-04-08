import { PayloadAction, createAction, createSlice } from '@reduxjs/toolkit';
import { TAreaType } from '@shared/api';
import { createResetEntity } from '@shared/utils';
import { SPECIALISTS_FILTER_SLICE } from './constants';
import { TFilterInitialState } from './types';

const initialState: TFilterInitialState = {
  chosenTopics: [],
  gender: null,
  time: null,
  areaType: TAreaType.EPsychotherapy,
  minPrice: null,
  maxPrice: null,
  ageRange: null,
  weekDays: null,
};

const resetEntity = createResetEntity(initialState);

export const resetFilters = createAction('resetTopics');

export const specialistFilterSlice = createSlice({
  name: SPECIALISTS_FILTER_SLICE,
  initialState,
  reducers: {
    updateFilters: (
      state,
      { payload }: PayloadAction<Partial<TFilterInitialState>>
    ) => {
      Object.assign(state, payload);
    },
  },
  extraReducers: (builder) => {
    resetEntity.reducer(builder, resetFilters);
  },
});

export const { updateFilters } = specialistFilterSlice.actions;
