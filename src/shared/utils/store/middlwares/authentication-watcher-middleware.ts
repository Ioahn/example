import { SerializedError, isRejected } from '@reduxjs/toolkit';
import { HttpStatusCode } from 'axios';
import { Middleware } from 'redux';

export const authenticationWatcherMiddleware: Middleware =
  ({ dispatch }) =>
  (next) =>
  (action) => {
    if (isRejected(action)) {
      const { error } = action as { error: SerializedError };

      if (error.status === HttpStatusCode.Unauthorized && process.browser) {
        dispatch({ type: 'logout' });
      }

      if (error.status === HttpStatusCode.InternalServerError) {
        error.message = 'Сервис временно недоступен, попробуйте снова';
      }
    }

    return next(action);
  };
