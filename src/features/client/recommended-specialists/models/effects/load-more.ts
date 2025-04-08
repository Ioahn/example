import { createAction } from '@reduxjs/toolkit';
import { sendCarrotEventSpecialistSearchPageViewed } from '@shared/externals';
import { startListening } from '@shared/utils';
import {
  getSpecialistsListThunk,
  initSpecialistsPage,
  nextSpecialistsPage,
  selectFilters,
  selectSpecialistPageState,
} from '../slices';

export const loadMoreSpecialists = createAction('loadMoreSpecialists');

startListening({
  actionCreator: loadMoreSpecialists,
  effect: (_, { getState, dispatch }) => {
    const {
      minPrice,
      maxPrice,
      chosenTopics,
      weekDays,
      ageRange,
      areaType,
      gender,
      time,
    } = selectFilters(getState());
    const { is_init } = selectSpecialistPageState(getState());

    let action;

    if (!is_init) {
      action = initSpecialistsPage;
    } else {
      action = nextSpecialistsPage;
    }

    dispatch(
      action({
        choseTopics: chosenTopics,
        max_price: maxPrice,
        min_price: minPrice,
        gender,
        day_times: time,
        area_type: areaType,
        age_ranges: ageRange,
        week_days: weekDays,
      })
    );
  },
});

startListening({
  actionCreator: getSpecialistsListThunk.fulfilled,
  effect: (_, { getState }) => {
    const state = getState() as RootState;
    const { chosenTopics } = selectFilters(state);
    const { page_num } = selectSpecialistPageState(state);

    sendCarrotEventSpecialistSearchPageViewed({
      filters: {
        topics: chosenTopics,
      },
      page_num: page_num,
    });
  },
});
