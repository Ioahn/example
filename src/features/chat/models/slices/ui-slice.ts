import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { CHAT_UI_SLICE } from './constants';

const initialState = {
  activeRoom: null as Maybe<string>,
  hasNewChatMessages: false,
  chatIsOpened: false,
};

export const uiChatSlice = createSlice({
  name: CHAT_UI_SLICE,
  initialState,
  reducers: {
    setActiveRoom: (state, { payload }: PayloadAction<string>) => {
      state.activeRoom = payload;
    },
    setChatVisibility: (state, { payload }: PayloadAction<boolean>) => {
      state.chatIsOpened = payload;
    },
    setHasNewChatMessage: (state, { payload }: PayloadAction<boolean>) => {
      state.hasNewChatMessages = payload;
    },
  },
});

export const { setActiveRoom, setChatVisibility, setHasNewChatMessage } =
  uiChatSlice.actions;
