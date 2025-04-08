import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import {
  sendCarrotEventFilterApplied,
  sendCarrotEventSpecialistSearchPageViewed,
} from '@shared/externals';
import { selectShortProfile } from '@entities/models/app';
import {
  chooseTopic,
  selectChoseTopics,
  updateRequirements,
} from '@entities/models/client/selected-topics-slice';
import {
  TAreaType,
  TGender,
  TSpecialistSearchEntrySchema,
  senseApi,
} from '@shared/api';
import {
  createHydrateEntity,
  serializeAxiosErrors,
  startListening,
} from '@shared/utils';
import {
  SELECTED_TOPICS_SLICE_NAME,
  SHORT_PROFILE_SLICE_NAME,
  SPECIALIST_LIST_SLICE_NAME,
} from '@shared/constants';

const specialists = createEntityAdapter<TSpecialistSearchEntrySchema>({
  selectId: (specialist) => specialist.id,
});

const hydrateEntity = createHydrateEntity({
  selectStoreFromHydrate: (payload) => payload[SPECIALIST_LIST_SLICE_NAME],
});

const initialState = {
  page_num: 1,
  has_more: true,
  ...specialists.getInitialState(),
  ...hydrateEntity.getInitialState(),
};
export const applyFilter = createAction<{
  choseTopics: string[];
  area_type: TAreaType;
  gender: Maybe<string>;
  time: Maybe<string>;
  minPrice: Maybe<number>;
  maxPrice: Maybe<number>;
  ageRange: Maybe<string>;
  weekDays: Maybe<string>;
}>('applyFilter');

export const getSpecialistsListThunk = createAsyncThunk(
  'getSpecialistList',
  async ({
    page_num,
    auth_token,
    choseTopics,
    gender,
    day_times,
    area_type,
    max_price,
    min_price,
    age_ranges,
    week_days,
  }: {
    page_num: number;
    auth_token: string;
    choseTopics: string[];
    gender?: TGender;
    day_times?: null;
    area_type?: TAreaType;
    max_price?: null;
    min_price?: null;
    age_ranges?: null;
    week_days?: null;
  }) => {
    return await senseApi.searchSpecialists(
      {
        topic_ids: choseTopics.join(',') as unknown as undefined,
        page_num,
        gender,
        day_times,
        area_type,
        min_price,
        max_price,
        week_days,
        age_ranges,
      },
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    );
  },
  { serializeError: serializeAxiosErrors }
);

export const getSpecialistsListThunkSSR = createAsyncThunk(
  'getSpecialistListSSR',
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { auth_token } = state[SHORT_PROFILE_SLICE_NAME];
    const {
      choseTopics,
      gender,
      time,
      areaType,
      maxPrice,
      minPrice,
      weekDays,
      ageRange,
    } = state[SELECTED_TOPICS_SLICE_NAME];
    const { page_num } = state[SPECIALIST_LIST_SLICE_NAME];

    return await dispatch(
      getSpecialistsListThunk({
        auth_token,
        choseTopics,
        page_num,
        gender: gender as TGender,
        max_price: maxPrice as null,
        day_times: time as null,
        area_type: areaType,
        age_ranges: ageRange as null,
        min_price: minPrice as null,
        week_days: weekDays as null,
      })
    );
  },
  { serializeError: serializeAxiosErrors }
);

export const specialistsListSlice = createSlice({
  name: SPECIALIST_LIST_SLICE_NAME,
  initialState,
  reducers: {
    specialistNextPage(state) {
      state.page_num += 1;
    },
    restorePage(state) {
      state.page_num = 1;
      state.has_more = true;
    },
    setHasMore(state, { payload }: PayloadAction<boolean>) {
      state.has_more = payload;
    },
    addSpecialists: specialists.addMany,
    clearSpecialist: specialists.removeAll,
  },
  extraReducers: (builder) => {
    hydrateEntity.reducer(builder, getSpecialistsListThunkSSR);
  },
});

export const {
  addSpecialists,
  setHasMore,
  specialistNextPage,
  clearSpecialist,
  restorePage,
} = specialistsListSlice.actions;

//selectors
const selectSpecialistsList = (state: RootState) =>
  state[SPECIALIST_LIST_SLICE_NAME];

export const selectSpecialists = specialists.getSelectors(
  selectSpecialistsList
).selectAll;

//TODO сделать обертку для createSelector для ленивой инициализации
export const selectShowNotification = createSelector(
  selectChoseTopics,
  selectShortProfile,
  ({ choseTopics }, { is_onboarding }) => !!choseTopics.length && is_onboarding
);

startListening({
  actionCreator: getSpecialistsListThunk.fulfilled,
  effect: ({ payload }, { dispatch }) => {
    const { data } = payload;

    if (data.specialists) {
      dispatch(addSpecialists(data.specialists));
    }

    if (data.specialists?.length === 0) {
      dispatch(setHasMore(false));
    }
  },
});

startListening({
  actionCreator: getSpecialistsListThunk.fulfilled,
  effect: (_, { getState }) => {
    const state = getState() as RootState;
    const { choseTopics } = state[SELECTED_TOPICS_SLICE_NAME];
    const { page_num } = state[SPECIALIST_LIST_SLICE_NAME];
    sendCarrotEventSpecialistSearchPageViewed({
      filters: {
        topics: choseTopics,
        // Add here more filters
      },
      page_num: page_num,
    });
  },
});

startListening({
  actionCreator: specialistNextPage,
  effect: async (_, { dispatch, getState }) => {
    const state = getState() as RootState;
    const { has_more, page_num } = state[SPECIALIST_LIST_SLICE_NAME];
    const { auth_token } = state[SHORT_PROFILE_SLICE_NAME];
    const { choseTopics, areaType, ...rest } =
      state[SELECTED_TOPICS_SLICE_NAME];

    if (has_more) {
      dispatch(
        getSpecialistsListThunk({
          auth_token,
          page_num: page_num,
          choseTopics,
          gender: rest.gender as TGender,
          max_price: rest.maxPrice as null,
          day_times: rest.time as null,
          area_type: areaType,
          age_ranges: rest.ageRange as null,
          min_price: rest.minPrice as null,
          week_days: rest.weekDays as null,
        })
      );
    }
  },
});

startListening({
  actionCreator: applyFilter,
  effect: async ({ payload }, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { auth_token } = state[SHORT_PROFILE_SLICE_NAME];
    const { choseTopics, area_type, ...rest } = payload;

    dispatch(chooseTopic(choseTopics));
    dispatch(updateRequirements(rest));

    dispatch(clearSpecialist());
    dispatch(restorePage());

    sendCarrotEventFilterApplied({
      topics: choseTopics,
      gender: rest.gender,
      time: rest.time,
      maxPrice: rest.maxPrice,
      minPrice: rest.minPrice,
    });

    dispatch(
      getSpecialistsListThunk({
        auth_token,
        page_num: 1,
        choseTopics,
        gender: rest.gender as TGender,
        max_price: rest.maxPrice as null,
        day_times: rest.time as null,
        area_type,
        age_ranges: rest.ageRange as null,
        min_price: rest.minPrice as null,
        week_days: rest.weekDays as null,
      })
    );
  },
});
