import { createAction } from '@reduxjs/toolkit';
import { prefetch, push } from 'connected-next-router';
import { startListening } from '@shared/utils';

type Effect = Parameters<typeof startListening>[0]['effect'];

export const createRoutePushAction = <T = undefined>(
  actionName: string,
  path: string | ((arg: T) => string),
  callBack?: Effect
) => {
  const action = createAction<T>(actionName);

  startListening({
    actionCreator: action,
    effect: (_, api) => {
      api.dispatch(
        typeof path === 'function' ? push(path(_.payload)) : push(path)
      );

      callBack?.(_, api);
    },
  });

  return action;
};

export const createRoutePrefetchAction = <T = undefined>(
  actionName: string,
  path: string,
  callBack?: Effect
) => {
  const action = createAction<T>(actionName);

  startListening({
    actionCreator: action,
    effect: async (_, api) => {
      api.dispatch(prefetch(path));

      callBack?.(_, api);
    },
  });

  return action;
};
