import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useReducer } from 'react';
import { TB2BApplicationRequestSchema, senseApi } from '@shared/api';
import { createLoadingStateEntity } from '@shared/utils';

const SLICE_NAME = 'requestForm';

const loadingRequestForm = createLoadingStateEntity(SLICE_NAME, {
  loadingStateName: 'loadingRequestForm',
  errorStateName: 'errorRequestForm',
});

export const sendRequestThunk = createAsyncThunk(
  'sendRequestThunk',
  async (data: TB2BApplicationRequestSchema) =>
    senseApi.submitB2BApplication(data)
);

const requestFormSlice = createSlice({
  name: SLICE_NAME,
  initialState: loadingRequestForm.getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    loadingRequestForm.reducer(builder, sendRequestThunk);
  },
});

const { reducer } = requestFormSlice;

export const useRequestFormSlice = (): [
  ReturnType<typeof requestFormSlice.getInitialState>,
  AnyFunction,
] => {
  const [state, dispatch] = useReducer(
    reducer,
    requestFormSlice.getInitialState()
  );

  const request = (action: AnyFunction) => action(dispatch, () => state);

  return [state, request];
};
