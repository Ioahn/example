import { createAsyncThunk } from '@reduxjs/toolkit';
import { TAccountType, senseApi } from '@shared/api';
import { serializeAxiosErrors } from '@shared/utils';

export const updateSpecialistProfileSettingsThunk = createAsyncThunk(
  'updateSpecialistProfileSettings',
  ({
    auth_token,
    timezone,
    email,
    notifications,
  }: {
    auth_token: string;
    timezone: string;
    email?: string;
    notifications?: Record<string, boolean>;
  }) =>
    senseApi.updateSpecialistSettings(
      {
        ...(email ? { email: email as unknown as null } : {}),
        settings: { timezone, notifications },
      },
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    ),
  { serializeError: serializeAxiosErrors }
);

export const updateSpecialistTimeZone = createAsyncThunk(
  'updateSpecialistTimeZoneThunk',
  ({ auth_token, timezone }: { auth_token: string; timezone: string }) =>
    senseApi.updateSpecialistTimezone(
      { timezone },
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    )
);

export const updateClientTimeZone = createAsyncThunk(
  'updateSpecialistTimeZoneThunk',
  ({ auth_token, timezone }: { auth_token: string; timezone: string }) =>
    senseApi.updateClientTimezone(
      { timezone },
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    )
);

export const getSpecialistProfileSettingsThunk = createAsyncThunk(
  'getProfileSettings',
  (auth_token: string) =>
    senseApi.getSpecialistSettings({
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }),
  { serializeError: serializeAxiosErrors }
);

export const getClientProfileSettingsThunk = createAsyncThunk(
  'getClientProfileSettingsThunk',
  (auth_token: string) =>
    senseApi.getClientSettings({
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }),
  { serializeError: serializeAxiosErrors }
);

export const getShortProfileInfoThunk = createAsyncThunk(
  'getShortProfileInfo',
  ({
    auth_token,
    account_type,
  }: {
    auth_token: string;
    account_type: TAccountType;
  }) => {
    if (account_type === TAccountType.EClient) {
      return senseApi.getClientShortInfo({
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      });
    }
    return senseApi.getSpecialistShortInfo({
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    });
  },
  { serializeError: serializeAxiosErrors }
);
