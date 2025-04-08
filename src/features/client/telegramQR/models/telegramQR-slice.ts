import { createAction, createSelector, createSlice } from '@reduxjs/toolkit';
import { createLoadingStateEntity, startListening } from '@shared/utils';
import { SHORT_PROFILE_SLICE_NAME } from '@shared/constants';
import { getQrAndLinkTelegramThunk } from './thunk';

const TELEGRAM_QR_SLICE = 'telegramQRSlice';

export const getTelegramQRCode = createAction('getTelegramQRCode');

const telegramLoaderStateEntity = createLoadingStateEntity(TELEGRAM_QR_SLICE, {
  loadingStateName: 'telegramLoaderState',
  errorStateName: 'telegramLoaderStateError',
  persist: true,
});

const initialState = {
  qrCodeLink: '',
  urlLink: '',
  ...telegramLoaderStateEntity.getInitialState(),
};

export const telegramQRSlice = createSlice({
  name: TELEGRAM_QR_SLICE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getQrAndLinkTelegramThunk.fulfilled,
      (state, { payload }) => {
        const [qr, link] = payload;

        state.qrCodeLink = URL.createObjectURL(qr.data);
        state.urlLink = link.data.telegram_url;
      }
    );
    telegramLoaderStateEntity.reducer(builder, getQrAndLinkTelegramThunk);
  },
});

export const selectTelegramQRSlices = (state: RootState) =>
  state[TELEGRAM_QR_SLICE];

export const selectQrCodeAndUrlTelegram = createSelector(
  selectTelegramQRSlices,
  ({ qrCodeLink, urlLink }) => ({
    qrCodeLink,
    urlLink,
  })
);

export const selectTelegramQRLoadingStates =
  telegramLoaderStateEntity.getSelectors(selectTelegramQRSlices);

startListening({
  actionCreator: getTelegramQRCode,
  effect: async (_, { getState, dispatch }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];

    dispatch(getQrAndLinkTelegramThunk({ auth_token }));
  },
});
