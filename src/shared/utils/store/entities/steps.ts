import {
  ActionReducerMapBuilder,
  PayloadAction,
  createAction,
  createSelector,
} from '@reduxjs/toolkit';

export const createStepEntity = () => {
  const getInitialState = () => ({ step: 0 });

  const reducer = (
    builder: ActionReducerMapBuilder<AnyObject>,
    action: TCommonAction
  ) => {
    const commonAction = action as ReturnType<typeof createAction>;

    builder.addMatcher(
      commonAction.match,
      (state, { payload }: PayloadAction<number | string>) => {
        state.step = +payload;
      }
    );
  };

  const getSelectors = <T>(
    slice: (selectState: T) => ReturnType<typeof getInitialState>
  ) => createSelector(slice, ({ step }) => step);

  return { getInitialState, reducer, getSelectors };
};
