import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  TChatMessagesResponseSchema,
  TMessageSchema,
  senseApi,
} from '@shared/api';
import { serializeAxiosErrors } from '@shared/utils';

const PAGE_SIZE = 100;

export type TMessagesWithRoomId = TChatMessagesResponseSchema & {
  roomId: string;
};

export type TMessageWithRoomId = TMessageSchema & {
  roomId: string;
};

export const loadChatThunk = createAsyncThunk(
  'loadChatThunk',
  async ({
    auth_token,
    page_num,
    page_size = PAGE_SIZE,
  }: {
    auth_token: string;
    page_num?: number;
    page_size?: number;
  }) =>
    await senseApi.getAllChatsApiChatsGet(
      {
        page_num,
        page_size,
      },
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    ),
  { serializeError: serializeAxiosErrors }
);

export const loadMessagesThunk = createAsyncThunk(
  'loadMessagesThunk',
  async ({
    id,
    auth_token,
    page_num,
    page_size = PAGE_SIZE,
  }: {
    auth_token: string;
    page_num?: number;
    page_size?: number;
    id: string;
  }) => {
    const axiosResponse = await senseApi.getMessagesFromChatApiChatsChatIdGet(
      id,
      {
        page_num,
        page_size,
      },
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    );

    (axiosResponse.data as TMessagesWithRoomId).roomId = id;

    return axiosResponse;
  },
  { serializeError: serializeAxiosErrors }
);

export const sendMessageThunk = createAsyncThunk(
  'sendMessageThunk',
  async ({
    id,
    auth_token,
    message_text,
  }: {
    auth_token: string;
    message_text: string;
    id: string;
  }) => {
    const axiosResponse =
      await senseApi.sendMessageApiChatsChatIdSendMessagePost(
        id,
        {
          message_text,
        },
        {
          headers: {
            Authorization: `Bearer ${auth_token}`,
          },
        }
      );

    (axiosResponse.data as TMessageWithRoomId).roomId = id;

    return axiosResponse;
  },
  { serializeError: serializeAxiosErrors }
);

export const readChatThunk = createAsyncThunk(
  'readChatThunk',
  async ({ id, auth_token }: { auth_token: string; id: string }) =>
    await senseApi.markAllMessagesReadInChatApiChatsChatIdReadPost(id, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }),
  { serializeError: serializeAxiosErrors }
);
