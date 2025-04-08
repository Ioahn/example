import {
  createAction,
  createAsyncThunk,
  createSelector,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import { setAreaType } from '@entities/models/client/selected-topics-slice';
import { loadEditSpecialistProfile } from '@entities/models/specialist/private-specialist-profile-slice';
import { TAreaType, TTopicCategoryMapSchema, senseApi } from '@shared/api';
import {
  createHydrateEntity,
  createLoadingStateEntity,
  serializeAxiosErrors,
  startListening,
} from '@shared/utils';
import {
  ALL_TOPICS_SLICE_NAME,
  SELECTED_TOPICS_SLICE_NAME,
} from '@shared/constants';

const hydrateEntity = createHydrateEntity({
  selectStoreFromHydrate: (payload) => payload[ALL_TOPICS_SLICE_NAME],
});

const getTopicsLoaderEntity = createLoadingStateEntity(ALL_TOPICS_SLICE_NAME, {
  loadingStateName: 'getTopicsFromServerLoader',
});

const initialState = {
  topics: [] as TTopicCategoryMapSchema[],
  ...hydrateEntity.getInitialState(),
  ...getTopicsLoaderEntity.getInitialState(),
};

export const openTopicFilter = createAction('getTopicFilter');
export const getTopics = createAction<TAreaType>('getTopics');

export const getTopicsThunk = createAsyncThunk(
  'getTopicsThunk',
  senseApi.getAllTopics,
  { serializeError: serializeAxiosErrors }
);

export const allTopicsSlice = createSlice({
  name: ALL_TOPICS_SLICE_NAME,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTopicsThunk.fulfilled, (state, { payload }) => {
      state.topics = payload.data.topics || [];
    });

    hydrateEntity.reducer(builder, getTopicsThunk);
    getTopicsLoaderEntity.reducer(builder, getTopicsThunk);
  },
});

const slice = (state: RootState) => state[ALL_TOPICS_SLICE_NAME];

export const selectTopics = createSelector(slice, (state) => state.topics);

startListening({
  matcher: isAnyOf(openTopicFilter, loadEditSpecialistProfile),
  effect: async (_, { dispatch, getState }) => {
    const { [SELECTED_TOPICS_SLICE_NAME]: selectedTopic } = getState();

    await dispatch(getTopicsThunk({ area_type: selectedTopic.areaType }));
  },
});

startListening({
  actionCreator: getTopics,
  effect: ({ payload }, { dispatch }) => {
    dispatch(setAreaType(payload));

    dispatch(getTopicsThunk({ area_type: payload }));
  },
});
