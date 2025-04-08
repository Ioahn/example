import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useReducer } from 'react';
import { TBodySubscribeOnNewsletter, senseApi } from '@shared/api';
import { createLoadingStateEntity } from '@shared/utils';

const SLICE_NAME = 'subscribeForm';

const loadingRequestForm = createLoadingStateEntity(SLICE_NAME, {
  loadingStateName: 'loadingSubscribeForm',
  errorStateName: 'errorSubscribeForm',
});

export const sendSubscribeThunk = createAsyncThunk(
  'sendSubscribeThunk',
  async (data: TBodySubscribeOnNewsletter) =>
    senseApi.subscribeOnNewsletter(data)
);

const subscribeSlice = createSlice({
  name: SLICE_NAME,
  initialState: loadingRequestForm.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    loadingRequestForm.reducer(builder, sendSubscribeThunk);
  },
});

const { reducer } = subscribeSlice;

export const useSubscribeFormSlice = (): [
  ReturnType<typeof subscribeSlice.getInitialState>,
  AnyFunction,
] => {
  const [state, dispatch] = useReducer(
    reducer,
    subscribeSlice.getInitialState()
  );

  const request = (action: AnyFunction) => action(dispatch, () => state);

  return [state, request];
};
