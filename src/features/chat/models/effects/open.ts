import { createAction } from '@reduxjs/toolkit';
import { sendCarrotEventPlatformChatOpened } from '@shared/externals';
import { startListening } from '@shared/utils';
import {
  createPageEntity,
  initMessagePageAction,
  initRoomPageAction,
  loadChatThunk,
  nextMessagePageAction,
  nextRoomPageAction,
  selectActiveRoom,
  selectActiveRoomId,
  selectAllRooms,
  selectChatRoomState,
  selectChatUIState,
  selectHasNewChatMessagesInActiveRoom,
  selectHasNewChatMessagesInRoom,
  selectIsChatInit,
  selectMessagePageState,
  selectRoomByInterlocutor,
  setActiveRoom,
  setChatVisibility,
} from '../slices';
import { readChat } from './read';

export const openChatByInterlocutorId = createAction<string>(
  'openChatByInterlocutorId'
);

startListening({
  actionCreator: setActiveRoom,
  effect: async ({ payload }, { dispatch, getState, delay }) => {
    let messagePageState = selectMessagePageState(getState(), payload);

    while (!messagePageState) {
      dispatch(createPageEntity(payload));

      await delay(100);

      messagePageState = selectMessagePageState(getState(), payload);
    }

    if (!messagePageState.is_init) {
      dispatch(initMessagePageAction({ id: payload }));

      return;
    }

    dispatch(nextMessagePageAction({ id: payload }));
  },
});

startListening({
  actionCreator: openChatByInterlocutorId,
  effect: async ({ payload }, { dispatch, getState, condition }) => {
    let room = selectRoomByInterlocutor(getState(), payload);

    while (!room) {
      const isInit = selectIsChatInit(getState());

      if (!isInit) {
        dispatch(initRoomPageAction());
      } else {
        dispatch(nextRoomPageAction());
      }

      await condition(loadChatThunk.fulfilled.match);

      room = selectRoomByInterlocutor(getState(), payload);
    }

    dispatch(setActiveRoom(room.id));
    dispatch(setChatVisibility(true));
  },
});

startListening({
  actionCreator: setChatVisibility,
  effect: ({ payload }, { getState, dispatch }) => {
    if (!payload) {
      return;
    }

    const roomState = selectChatRoomState(getState());

    if (!roomState.is_init) {
      dispatch(initRoomPageAction());
    } else {
      dispatch(nextRoomPageAction());
    }
    const hasNewMessage = selectHasNewChatMessagesInActiveRoom(getState());

    if (hasNewMessage) {
      dispatch(readChat());
    }
  },
});

startListening({
  actionCreator: setActiveRoom,
  effect: async (_, { getState, dispatch }) => {
    const room = selectActiveRoom(getState());
    const { chatIsOpened } = selectChatUIState(getState());

    if (!room) {
      return;
    }

    const haveNewMessages = selectHasNewChatMessagesInRoom(getState(), room.id);

    if (chatIsOpened && haveNewMessages) {
      dispatch(readChat());
    }
  },
});

startListening({
  actionCreator: setChatVisibility,
  effect: () => {
    sendCarrotEventPlatformChatOpened();
  },
});

startListening({
  actionCreator: loadChatThunk.fulfilled,
  effect: async (_, { dispatch, getState, unsubscribe }) => {
    const activeRoom = selectActiveRoomId(getState());

    if (activeRoom) {
      unsubscribe();
      return;
    }

    const [room] = selectAllRooms(getState());

    if (!room) {
      return;
    }

    const { id } = room;

    dispatch(setActiveRoom(id));
  },
});
