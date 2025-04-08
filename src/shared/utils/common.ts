export const isDev = () => process.env.NODE_ENV === 'development';

export const isProduction = () =>
  process.env.NEXT_PUBLIC_ENVIRONMENT === 'production';

export const safe = <T = never>(value: T) => value as NonNullable<T>;

export const isReduxWrapperLogsDisable = () =>
  isDev() || Boolean(process.env.NEXT_DISABLE_REDUX_LOGS);
