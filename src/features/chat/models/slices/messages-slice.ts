import {
  PayloadAction,
  createAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { TMessageWithRoomId, selectMessagePageState } from '@features/chat';
import { TMessageSchema } from '@shared/api';
import { createPageLoaderEntity } from '@shared/utils';
import { CHAT_MESSAGES_SLICE } from './constants';
import {
  TMessagesWithRoomId,
  loadMessagesThunk,
  sendMessageThunk,
} from './thunk';

type TPageMessageRoom = {
  roomId: string;
  page_num: number;
  has_more: boolean;
  is_init: boolean;
};

export const messagesEntityAdapter = createEntityAdapter<TMessageSchema>({
  sortComparer: (a, b) => a.sent_at - b.sent_at,
});

export const messagesPageParamsAdapter = createEntityAdapter<TPageMessageRoom>({
  selectId: ({ roomId }) => roomId,
});

const initStatePage = {
  page_num: 1,
  has_more: true,
  is_init: false,
};

export const nextMessagePageAction = createAction<{ id: string }>(
  'nextMessagePageAction'
);

export const prevMessagePageAction = createAction<{ id: string }>(
  'prevMessagePageAction'
);

export const initMessagePageAction = createAction<{ id: string }>(
  'initMessagePageAction'
);

const messagesPageLoaderEntityAdapter = createPageLoaderEntity<
  typeof initialState
>({
  pageSize: 10,
  updateFunction: (state, updateObj) => {
    const prevProps = messagesPageParamsAdapter
      .getSelectors()
      .selectById(state.pages, updateObj.roomId as string);

    messagesPageParamsAdapter.updateOne(state.pages, {
      id: updateObj.roomId as string,
      changes: {
        page_num: (prevProps?.page_num || 1) + 1,
        has_more: !!((updateObj.messages as AnyArray) || []).length,
        is_init: updateObj.is_init,
      },
    });
  },
  selectPageState: (state, { id }) =>
    selectMessagePageState(
      state as unknown as RootState,
      id
    ) as TPageMessageRoom,
});

const initialState = {
  rooms: {} as Record<
    string,
    ReturnType<typeof messagesEntityAdapter.getInitialState>
  >,
  pages: {
    ...messagesPageParamsAdapter.getInitialState(),
  },
};

export const chatMessagesSlice = createSlice({
  name: CHAT_MESSAGES_SLICE,
  initialState,
  reducers: {
    markMessagesAsRead: (state, { payload }: PayloadAction<string>) => {
      const room = state.rooms[payload];
      const allMessagesId = messagesEntityAdapter
        .getSelectors()
        .selectIds(room);

      messagesEntityAdapter.updateMany(
        room,
        allMessagesId.map((id) => ({
          id,
          changes: {
            is_read: true,
          },
        }))
      );
    },
    addMessage: (
      state,
      { payload }: PayloadAction<{ id: string; message: TMessageSchema }>
    ) => {
      const { id, message } = payload;

      if (state.rooms[id]) {
        messagesEntityAdapter.addOne(state.rooms[id], message);
      } else {
        state.rooms[id] = messagesEntityAdapter.addOne(
          messagesEntityAdapter.getInitialState(),
          message
        );
      }
    },
    createPageEntity: (state, { payload }: PayloadAction<string>) => {
      const { pages } = state;

      messagesPageParamsAdapter.addOne(pages, {
        roomId: payload,
        ...initStatePage,
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadMessagesThunk.fulfilled, (state, { payload }) => {
        const { data } = payload;
        const { roomId, messages = [] } = data as TMessagesWithRoomId;

        if (state.rooms[roomId]) {
          messagesEntityAdapter.addMany(state.rooms[roomId], messages);
        } else {
          state.rooms[roomId] = messagesEntityAdapter.setMany(
            messagesEntityAdapter.getInitialState(),
            messages
          );
        }
      })
      .addCase(sendMessageThunk.fulfilled, (state, { payload }) => {
        const { roomId, ...rest } = payload.data as TMessageWithRoomId;

        const room = state.rooms[roomId];

        messagesEntityAdapter.addOne(room, rest);
      });

    messagesPageLoaderEntityAdapter.reducer(builder, {
      nextPageAction: nextMessagePageAction,
      prevPageAction: prevMessagePageAction,
      initPageAction: initMessagePageAction,
      fetcherThunk: loadMessagesThunk,
    });
  },
});

export const { markMessagesAsRead, addMessage, createPageEntity } =
  chatMessagesSlice.actions;
