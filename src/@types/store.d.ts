type AppStore = ReturnType<typeof import('@app/store').makeStore>;
type RootState = ReturnType<AppStore['getState']>;
type AppDispatch = (typeof AppStore)['dispatch'];
type AppThunk<ReturnType = void> = import('@reduxjs/toolkit').ThunkAction<
  ReturnType,
  RootState,
  unknown,
  import('@reduxjs/toolkit').Action
>;
