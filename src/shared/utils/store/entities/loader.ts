import { isSSR } from '@react-spring/shared';
import {
  ActionReducerMapBuilder,
  SerializedError,
  createAction,
  createAsyncThunk,
  createSelector,
  isAnyOf,
  isAsyncThunkAction,
} from '@reduxjs/toolkit';
import { startListening } from '@shared/utils';
import { LOADING_STATES } from '@shared/constants';

type Options<T extends string, B extends string> = {
  loadingStateName?: T;
  errorStateName?: B;
  allowedStates?: Exclude<LOADING_STATES, LOADING_STATES.IDLE>[];
  persist?: boolean;
};

type LoadingStateEntity<
  TLoadingStateName extends string,
  TErrorStateName extends string,
> = {
  [K in TLoadingStateName]: LOADING_STATES;
} & {
  [K in TErrorStateName]: null | string;
};

export const createLoadingStateEntity = <T extends string, B extends string>(
  storeName: string,
  options?: Options<T, B>
) => {
  const defaultOptions = {
    loadingStateName: 'loadingState',
    errorStateName: 'errorMessage',
    allowedStates: [
      LOADING_STATES.LOADING,
      LOADING_STATES.SUCCESS,
      LOADING_STATES.REJECTED,
    ],
    persist: false,
  };

  const entityOptions = Object.assign({}, defaultOptions, options);

  const resetLoadingStateAction = createAction(
    `resetLoadingState/${storeName}/${entityOptions.loadingStateName}`
  );
  const clearErrorAction = createAction(
    `clearErrorAction/${storeName}/${entityOptions.errorStateName}`
  );

  const getInitialState = () =>
    ({
      [entityOptions.loadingStateName]: LOADING_STATES.IDLE,
      [entityOptions.errorStateName]: null,
    }) as LoadingStateEntity<T, B>;

  const reducer = (
    builder: ActionReducerMapBuilder<AnyObject>,
    action: TCommonAction
  ) => {
    if (!isAsyncThunkAction(action)) {
      return;
    }

    const thunkAction = action as ReturnType<typeof createAsyncThunk>;

    entityOptions.allowedStates?.forEach((state) => {
      if (state === LOADING_STATES.LOADING) {
        builder.addMatcher(thunkAction.pending.match, (state) => {
          state[entityOptions.loadingStateName] = LOADING_STATES.LOADING;
        });
      }

      if (state === LOADING_STATES.SUCCESS) {
        builder.addMatcher(thunkAction.fulfilled.match, (state) => {
          state[entityOptions.loadingStateName] = LOADING_STATES.SUCCESS;
        });
      }

      if (state === LOADING_STATES.REJECTED) {
        builder.addMatcher(
          thunkAction.rejected.match,
          (state, action: AnyObject) => {
            const { error } = action as { error: SerializedError };

            state[entityOptions.loadingStateName] = LOADING_STATES.REJECTED;

            state[entityOptions.errorStateName] =
              error?.detail || error?.message || 'Упс, что-то пошло не так.';
          }
        );
      }
    });

    builder.addMatcher(resetLoadingStateAction.match, (state) => {
      state[entityOptions.loadingStateName] = LOADING_STATES.IDLE;
    });

    builder.addMatcher(clearErrorAction.match, (state) => {
      state[entityOptions.errorStateName] = null;
    });

    if (!entityOptions.persist) {
      startListening({
        matcher: isAnyOf(thunkAction.rejected, thunkAction.fulfilled),
        effect: async (_, { dispatch, delay }) => {
          if (!isSSR()) {
            await delay(3000);
          }

          dispatch(resetLoadingStateAction());
        },
      });
    }
  };

  const getSelectors = <S>(
    slice: (selectState: S) => ReturnType<typeof getInitialState>
  ) =>
    createSelector(
      slice,
      (state) =>
        ({
          [entityOptions.loadingStateName]:
            state[entityOptions.loadingStateName],
          [entityOptions.errorStateName]: state[entityOptions.errorStateName],
        }) as LoadingStateEntity<T, B>
    );

  return {
    getInitialState,
    reducer,
    getSelectors,
    resetLoadingStateAction,
    clearErrorAction,
  };
};
