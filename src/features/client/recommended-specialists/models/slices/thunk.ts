import { createAsyncThunk } from '@reduxjs/toolkit';
import { selectFilters } from '@features/client';
import { senseApi } from '@shared/api';
import { serializeAxiosErrors } from '@shared/utils';
import { SHORT_PROFILE_SLICE_NAME } from '@shared/constants';
import { TFilters } from './types';

export const getSpecialistsListThunk = createAsyncThunk(
  'getSpecialistsListThunk',
  async ({
    auth_token,
    choseTopics,
    ...rest
  }: TFilters & { auth_token: string; page_num?: number }) => {
    return await senseApi.searchSpecialists(
      {
        topic_ids: choseTopics.join(',') as unknown as undefined,
        ...rest,
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
      chosenTopics,
      gender,
      time,
      areaType,
      maxPrice,
      minPrice,
      weekDays,
      ageRange,
    } = selectFilters(state);

    await dispatch(
      getSpecialistsListThunk({
        auth_token,
        choseTopics: chosenTopics,
        page_num: 1,
        gender,
        max_price: maxPrice,
        day_times: time,
        area_type: areaType,
        age_ranges: ageRange,
        min_price: minPrice,
        week_days: weekDays,
      })
    );
  },
  { serializeError: serializeAxiosErrors }
);
