import { combineReducers } from 'redux';
import { specialistFilterSlice } from './filter-slice';
import { recommendedSpecialistSlice } from './specialists-slice';

export const recommendedSpecialistReducer = combineReducers({
  [recommendedSpecialistSlice.name]: recommendedSpecialistSlice.reducer,
  [specialistFilterSlice.name]: specialistFilterSlice.reducer,
});
