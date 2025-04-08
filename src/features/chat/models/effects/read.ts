import { createAction } from '@reduxjs/toolkit';
import { startListening } from '@shared/utils';
import { SHORT_PROFILE_SLICE_NAME } from '@shared/constants';
import {
  markMessagesAsRead,
  readChatThunk,
  selectActiveRoomId,
  selectChatUIState,
  selectHasNewMessages,
  selectIsMessagesInActiveRoom,
  setHasNewChatMessage,
} from '../slices';

export const readChat = createAction('readChat');

startListening({
  actionCreator: readChat,
  effect: async (_, { getState, dispatch, delay }) => {
    // await delay(1000);

    const activeRoom = selectActiveRoomId(getState());
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];

    const haveMessagesInRoom = selectIsMessagesInActiveRoom(getState());
    const { hasNewChatMessages } = selectChatUIState(getState());

    if (!haveMessagesInRoom || !hasNewChatMessages || !activeRoom) {
      return;
    }

    dispatch(readChatThunk({ auth_token, id: activeRoom }));
    dispatch(markMessagesAsRead(activeRoom));
    await delay(100);
    const haveNewMessages = selectHasNewMessages(getState());

    dispatch(setHasNewChatMessage(haveNewMessages));
  },
});

export {};
