import {
  ActionReducerMapBuilder,
  createAction,
  createAsyncThunk,
  isAnyOf,
} from '@reduxjs/toolkit';
import { callFnByPredicates, startListening } from '@shared/utils';
import { SHORT_PROFILE_SLICE_NAME } from '@shared/constants';

type TOption<T extends AnyObject | void> = {
  updateFunction?: (
    state: T,
    updateObj: {
      page_num: number;
      has_more: boolean;
      is_init: boolean;
      [key: string]: string | boolean | number | AnyObject;
    }
  ) => void;
  selectPageState: <P extends AnyObject>(
    state: T,
    arg: P
  ) => { page_num: number; has_more: boolean; is_init: boolean };
  pageSize?: number;
};

const PAGE_SIZE = 10;

/**
 *
 * @param option - обязательный параметр для указания пути к стейту и функции обновления
 */
export const createPageLoaderEntity = <State extends AnyObject | void = void>(
  option: TOption<State>
) => {
  const getInitialState = () => ({
    page_num: 1,
    has_more: true,
    is_init: false,
  });

  const pageSize = option.pageSize || PAGE_SIZE;
  const queue = Promise.resolve();

  const reducer = (
    builder: ActionReducerMapBuilder<AnyObject>,
    {
      nextPageAction,
      prevPageAction,
      fetcherThunk,
      initPageAction,
      fetcherThunkOptions,
    }: {
      /**
       * В экшены можно передавать дополнительные параметры, которые будут переданы в thunk
       */
      initPageAction: ReturnType<typeof createAction>;
      /**
       * В экшены можно передавать дополнительные параметры, которые будут переданы в thunk
       */
      nextPageAction: ReturnType<typeof createAction>;
      /**
       * В экшены можно передавать дополнительные параметры, которые будут переданы в thunk
       */
      prevPageAction: ReturnType<typeof createAction>;
      fetcherThunk: TCommonAction;
      fetcherThunkOptions?: {
        getData?: <T>(args: T) => {
          page_num: number;
          has_more: boolean;
          [key: string]: string | boolean | number | AnyObject;
        };
      };
    }
  ) => {
    const thunkAction = fetcherThunk as ReturnType<typeof createAsyncThunk>;

    builder.addMatcher(thunkAction.fulfilled.match, (state, { payload }) => {
      // back fix непонятно на что опираться
      const { ...rest } = fetcherThunkOptions?.getData
        ? fetcherThunkOptions?.getData(payload as IncompatibleType)
        : (payload as IncompatibleType).data;

      if (option?.updateFunction) {
        option.updateFunction(state as State, {
          ...rest,
          is_init: true,
        });
      } else {
        Object.assign(state, {
          page_num: state.page_num + 1,
          has_more: true,
          is_init: true,
        });
      }
    });

    startListening({
      matcher: isAnyOf(nextPageAction, prevPageAction, initPageAction),
      effect: async (action, { dispatch, getState }) => {
        const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];
        const { payload } = action;

        const { page_num, has_more, is_init } = option.selectPageState(
          getState() as IncompatibleType,
          payload
        );

        const thunk = callFnByPredicates([
          [
            [true, false, false],
            () =>
              thunkAction({
                auth_token,
                page_num,
                page_size: pageSize,
                ...payload,
              }),
          ],
          [
            [false, true, false],
            () =>
              thunkAction({
                auth_token,
                page_num: page_num - 1,
                page_size: pageSize,
                ...payload,
              }),
          ],
          [
            [false, false, true],
            () =>
              thunkAction({
                auth_token,
                page_num: 1,
                page_size: pageSize,
                ...payload,
              }),
          ],
        ])([
          nextPageAction.match(action) && has_more,
          prevPageAction.match(action) && page_num !== 1,
          initPageAction.match(action) && !is_init,
        ]);

        thunk && queue.then(() => dispatch(thunk));
      },
    });
  };

  return { getInitialState, reducer };
};
