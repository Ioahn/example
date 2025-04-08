import {
  TypedAddListener,
  TypedStartListening,
  addListener,
  createListenerMiddleware,
} from '@reduxjs/toolkit';
import { SSE } from '@shared/utils';

const extra = {
  sse: (auth_token: string) => SSE.init(auth_token),
};

export type TExtra = typeof extra;

const middleware = createListenerMiddleware({
  extra,
});
// { startListening, middleware: listenerMiddleware }
export const startListening = middleware.startListening as TypedStartListening<
  RootState,
  AppDispatch,
  typeof extra
>;

export const listenerMiddleware = middleware.middleware;

export const addAppListener = addListener as TypedAddListener<
  RootState,
  AppDispatch,
  typeof extra
>;
