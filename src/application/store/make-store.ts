import { configureStore } from '@reduxjs/toolkit';
import {
  createRouterMiddleware,
  initialRouterState,
} from 'connected-next-router';
import {
  nextReduxCookieMiddleware,
  wrapMakeStore,
} from 'next-redux-cookie-wrapper';
import { Context } from 'next-redux-wrapper';
import Router from 'next/router';
import { GetServerSidePropsContext } from 'next/types';
import {
  authenticationWatcherMiddleware,
  listenerMiddleware,
  logger,
  metricsMiddleware,
} from '@shared/utils';
import { appReducer } from './app-reducer';
import { modelsToPersist } from './models-to-persist';

export const makeStore = wrapMakeStore((ctx: Context) => {
  const asPath =
    (ctx as GetServerSidePropsContext).resolvedUrl || Router.router?.asPath;

  return configureStore({
    preloadedState: {
      router: initialRouterState(asPath),
    },
    reducer: appReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      })
        .prepend(listenerMiddleware)
        .prepend(
          nextReduxCookieMiddleware({
            subtrees: modelsToPersist,
            sameSite: 'lax',
          })
        )
        .prepend(logger)
        .prepend(createRouterMiddleware())
        .prepend(authenticationWatcherMiddleware)
        .prepend(metricsMiddleware),
  });
});
