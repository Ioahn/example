type TShirtSpecialistType = {
  account_type: Maybe<import('@shared/api').TAccountType.ESpecialist>;
} & import('@shared/api').TShortSpecialistInfoResponseSchema;

type TShirtClientType = {
  account_type: Maybe<import('@shared/api').TAccountType.EClient>;
} & import('@shared/api').TShortClientInfoResponseSchema;

type ShortProfileState = Pick<
  import('@shared/api').TSuccessfulAuthenticationResponseSchema,
  'auth_token'
> &
  (TShirtSpecialistType | TShirtClientType) & {
    current_area: Maybe<import('@shared/api').TAreaType>;
  };
