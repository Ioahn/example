import {
  PayloadAction,
  createAction,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { getClientProfileSettingsThunk } from '@entities/models';
import { TAreaType } from '@shared/api';
import { createHydrateEntity, createResetEntity } from '@shared/utils';
import { SELECTED_TOPICS_SLICE_NAME } from '@shared/constants';

const hydrateEntity = createHydrateEntity({
  selectStoreFromHydrate: (payload) => payload[SELECTED_TOPICS_SLICE_NAME],
});

const initialState = {
  choseTopics: [] as string[],
  gender: null as Maybe<string>,
  time: null as Maybe<string>,
  areaType: TAreaType.EPsychotherapy,
  minPrice: null as Maybe<number>,
  maxPrice: null as Maybe<number>,
  ageRange: null as Maybe<string>,
  weekDays: null as Maybe<string>,
};

const resetEntity = createResetEntity(initialState);

export const resetSelectedTopics = createAction('resetTopics');

export const selectedTopicsSlice = createSlice({
  name: SELECTED_TOPICS_SLICE_NAME,
  initialState,
  reducers: {
    chooseTopic(state, { payload }: PayloadAction<string[]>) {
      state.choseTopics = payload;
    },
    setAreaType: (state, { payload }: PayloadAction<TAreaType>) => {
      state.areaType = payload;
    },
    emptyTopics: (state) => {
      state.choseTopics = [];
    },
    updateRequirements: (
      state,
      { payload }: PayloadAction<Partial<typeof initialState>>
    ) => {
      Object.assign(state, payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getClientProfileSettingsThunk.fulfilled,
      (state, { payload }) => {
        const chosenTopics = payload.data.topics
          .filter(({ is_chosen }) => is_chosen)
          .map(({ id }) => id);

        if (chosenTopics.length !== 0) {
          state.choseTopics = chosenTopics;
        }
      }
    );

    resetEntity.reducer(builder, resetSelectedTopics);
    hydrateEntity.reducer(builder);
  },
});

export const { chooseTopic, setAreaType, updateRequirements, emptyTopics } =
  selectedTopicsSlice.actions;

export const selectChoseTopics = (state: RootState) =>
  state[selectedTopicsSlice.name];

export const selectMarkedTopicsIds = createSelector(
  selectChoseTopics,
  ({ choseTopics }) => choseTopics
);

export const selectRequirements = createSelector(
  selectChoseTopics,
  ({ gender, time, areaType, minPrice, maxPrice, weekDays, ageRange }) => ({
    gender,
    time,
    areaType,
    minPrice,
    maxPrice,
    weekDays,
    ageRange,
  })
);
