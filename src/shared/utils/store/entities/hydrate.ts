import {
  ActionReducerMapBuilder,
  PayloadAction,
  isAnyOf,
} from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export const createHydrateEntity = (options: {
  selectStoreFromHydrate: (payload: AnyObject) => AnyObject;
}) => {
  const getInitialState = () => ({
    __ssr: false,
  });

  const reducer = <
    T extends
      ActionReducerMapBuilder<AnyObject> = ActionReducerMapBuilder<AnyObject>,
  >(
    builder: T,
    ...actions: TCommonAction[]
  ): T => {
    actions.length &&
      builder.addMatcher(
        isAnyOf(...actions.map((action) => action.fulfilled || action)),
        (state) => {
          state.__ssr = true;
        }
      );

    builder.addMatcher(
      ({ type }) => HYDRATE === type,
      (state, action: PayloadAction<AnyObject>) => {
        const stateFromServer = options.selectStoreFromHydrate(action.payload);

        if (!stateFromServer?.__ssr) {
          Object.assign(state, stateFromServer);
        }
      }
    );

    return builder;
  };

  return { getInitialState, reducer };
};
