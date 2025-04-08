import { createAsyncThunk } from '@reduxjs/toolkit';
import { TScheduleSettingsSchema, senseApi } from '@shared/api';
import { serializeAxiosErrors } from '@shared/utils';
import { SHORT_PROFILE_SLICE_NAME } from '@shared/constants';

export const getSpecialistScheduleThunkSSR = createAsyncThunk(
  'getSpecialistScheduleThunkSSR',
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { auth_token } = state[SHORT_PROFILE_SLICE_NAME];
    await dispatch(getSpecialistScheduleThunk(auth_token)).unwrap();
  },
  { serializeError: serializeAxiosErrors }
);

export const getSpecialistScheduleThunk = createAsyncThunk(
  'getSpecialistScheduleThunk',
  (auth_token: string) =>
    senseApi.getSpecialistMainCabinetPage({
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }),
  { serializeError: serializeAxiosErrors }
);

export const excludeSlotThunk = createAsyncThunk(
  'excludeSlotThunk',
  ({ auth_token, slot_ids }: { auth_token: string; slot_ids: string[] }) =>
    senseApi.excludeScheduleSlots(
      { slot_ids },
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    ),
  { serializeError: serializeAxiosErrors }
);

export const unexcludeSlotThunk = createAsyncThunk(
  'unexcludeSlotThunk',
  ({ auth_token, slot_ids }: { auth_token: string; slot_ids: string[] }) =>
    senseApi.restoreScheduleSlots(
      { slot_ids },
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    ),
  { serializeError: serializeAxiosErrors }
);

export const updateSlotDateThunk = createAsyncThunk(
  'updateSlotDateThunk',
  ({
    slot_id,
    new_slot_date,
    auth_token,
  }: {
    new_slot_date: number;
    slot_id: string;
    auth_token: string;
  }) =>
    senseApi.moveScheduleSlot(
      { slot_id, new_slot_date },
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    ),
  { serializeError: serializeAxiosErrors }
);

export const saveScheduleThunk = createAsyncThunk(
  'saveScheduleThunk',
  ({
    data,
    auth_token,
  }: {
    auth_token: string;
    data: TScheduleSettingsSchema;
  }) =>
    senseApi.updateScheduleSettings(data, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }),
  { serializeError: serializeAxiosErrors }
);
