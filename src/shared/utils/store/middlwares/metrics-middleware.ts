import { createAction } from '@reduxjs/toolkit';
import process from 'process';
import { Middleware } from 'redux';

export const reachGoalAction = createAction<string>('reachGoalAction');

export const metricsMiddleware: Middleware = () => {
  const yaReachGoal = (action: string) =>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    global?.window?.ym?.(
      process.env.NEXT_PUBLIC_YA_METRIKA_APP_ID,
      'reachGoal',
      action
    );

  return (next) => (action) => {
    if (process.env.NEXT_PUBLIC_YA_METRIKA_APP_ID) {
      if (reachGoalAction.match(action)) {
        yaReachGoal(action.payload);
      }
    }

    return next(action);
  };
};
