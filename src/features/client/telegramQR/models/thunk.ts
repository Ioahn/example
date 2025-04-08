import { createAsyncThunk } from '@reduxjs/toolkit';
import { senseApi } from '@shared/api';

export const getQrAndLinkTelegramThunk = createAsyncThunk(
  'getQrAndLinkTelegramThunk',
  ({ auth_token }: { auth_token: string }) =>
    Promise.all([
      senseApi.getTelegramNotificationQrLink({
        format: 'blob',
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }),
      senseApi.getTelegramNotificationsUrl({
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }),
    ])
);
