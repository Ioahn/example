import {
  createAction,
  createEntityAdapter,
  createSlice,
} from '@reduxjs/toolkit';
import { TChatResponseSchema } from '@shared/api';
import { createPageLoaderEntity } from '@shared/utils';
import { CHAT_REDUCER, CHAT_ROOM_SLICE } from './constants';
import { loadChatThunk } from './thunk';

export const nextRoomPageAction = createAction('nextChatRoomPageAction');
export const prevRoomPageAction = createAction('prevChatRoomPageAction');
export const initRoomPageAction = createAction('initChatRoomPageAction');

export const roomEntityAdapter = createEntityAdapter<TChatResponseSchema>({
  selectId: ({ id }) => id,
});

export const roomPageLoaderEntityAdapter = createPageLoaderEntity({
  pageSize: 100,
  selectPageState: (state: AnyObject) => state[CHAT_REDUCER][CHAT_ROOM_SLICE],
  updateFunction: (state, updateObj) => {
    Object.assign(state, {
      page_num: state.page_num + 1,
      has_more: !!((updateObj.chats as AnyArray) || []).length,
      is_init: updateObj.is_init,
    });
  },
});

const initialState = {
  ...roomEntityAdapter.getInitialState(),
  ...roomPageLoaderEntityAdapter.getInitialState(),
};

export const chatRoomSlice = createSlice({
  name: CHAT_ROOM_SLICE,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadChatThunk.fulfilled, (state, { payload }) => {
      roomEntityAdapter.addMany(
        state,
        payload.data.chats as TChatResponseSchema[]
      );
    });

    roomPageLoaderEntityAdapter.reducer(builder, {
      nextPageAction: nextRoomPageAction,
      prevPageAction: prevRoomPageAction,
      initPageAction: initRoomPageAction,
      fetcherThunk: loadChatThunk,
    });
  },
});
