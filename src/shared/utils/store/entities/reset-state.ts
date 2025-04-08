import { ActionReducerMapBuilder } from '@reduxjs/toolkit';

export const createResetEntity = <T extends AnyObject>(resetState: T) => {
  const reducer = (
    builder: ActionReducerMapBuilder<AnyObject>,
    action: TCommonAction
  ) => {
    builder.addMatcher(
      ({ type }) => action.type === type,
      (state) => {
        Object.assign(state, resetState);
      }
    );
  };

  return { reducer };
};
