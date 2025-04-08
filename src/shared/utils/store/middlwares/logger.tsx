import { Middleware } from 'redux';

export const logger: Middleware = () => (next) => (action) => {
  if (action.meta?.requestStatus === 'rejected') {
    import('@sentry/nextjs').then((sentry) =>
      sentry.captureException(action.meta.error)
    );
  }

  return next(action);
};
