import { createAction } from '@reduxjs/toolkit';
import { readChat } from '@features/chat';
import { TMessageSchema } from '@shared/api';
import { startListening } from '@shared/utils';
import { onMountAppAction } from '@shared/hooks';
import { SHORT_PROFILE_SLICE_NAME } from '@shared/constants';
import {
  addMessage,
  initRoomPageAction,
  loadChatThunk,
  nextRoomPageAction,
  selectChatRoomState,
  selectChatUIState,
  selectIsChatInit,
  selectRoomById,
  setHasNewChatMessage,
} from '../slices';

export const savedAddMessage = createAction<{
  id: string;
  message: TMessageSchema;
}>('savedAddMessage');

startListening({
  actionCreator: onMountAppAction,
  effect: (_, { getState, dispatch, extra }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];

    if (!auth_token) {
      return;
    }

    const SSE = extra.sse(auth_token);

    SSE.addMessageHandler((e: MessageEvent) => {
      const data = JSON.parse(e.data);
      if (data.event === 'new_chat_message') {
        dispatch(setHasNewChatMessage(true));
        dispatch(
          savedAddMessage({
            id: data.payload.chat_id,
            message: data.payload.message,
          })
        );
      }
      if (data.event === 'initial_state') {
        dispatch(setHasNewChatMessage(data.payload.has_new_chat_messages));
      }
    });
  },
});

startListening({
  actionCreator: savedAddMessage,
  effect: async ({ payload }, { getState, dispatch, condition }) => {
    const { id } = payload;

    let room = selectRoomById(getState(), id);

    while (!room) {
      const roomIsInit = selectIsChatInit(getState());

      if (!roomIsInit) {
        dispatch(initRoomPageAction());
      } else {
        dispatch(nextRoomPageAction());
      }

      await condition(loadChatThunk.fulfilled.match);
      room = selectRoomById(getState(), id);

      const { has_more } = selectChatRoomState(getState());

      if (!has_more) {
        return;
      }
    }

    dispatch(addMessage(payload));

    const { chatIsOpened, activeRoom } = selectChatUIState(getState());

    if (!chatIsOpened) {
      dispatch(setHasNewChatMessage(true));

      return;
    }

    if (id === activeRoom) {
      dispatch(readChat());
    }
  },
});

export {};
