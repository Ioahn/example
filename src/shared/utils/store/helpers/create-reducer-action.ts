import { AnyAction, Reducer, combineReducers } from '@reduxjs/toolkit';

type ReducerMap = {
  [key: string]: Reducer<AnyObject, AnyAction>;
};

export const createReducerManager = (initialReducers: ReducerMap) => {
  const reducers = { ...initialReducers };
  let combinedReducer = combineReducers(reducers);

  return {
    reduce: (state: AnyObject, action: AnyAction) =>
      combinedReducer(state, action),

    add: (key: string, reducer: Reducer) => {
      if (!reducers[key]) {
        reducers[key] = reducer;
        combinedReducer = combineReducers(reducers);
      }
    },

    remove: (key: string) => {
      if (reducers[key]) {
        delete reducers[key];

        combinedReducer = combineReducers(reducers);
      }
    },
  };
};
