export const PRICE_OPTIONS = {
  ONE_SESSION: 'one_session_price',
};

export type T_PRICE_OPTION = (typeof PRICE_OPTIONS)[keyof typeof PRICE_OPTIONS];
