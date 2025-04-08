import { createAction } from '@reduxjs/toolkit';
import { sendCarrotEventPlatformChatMessageSent } from '@shared/externals';
import { startListening } from '@shared/utils';
import { SHORT_PROFILE_SLICE_NAME } from '@shared/constants';
import { selectActiveRoomId, sendMessageThunk } from '../slices';

export const sendMessage = createAction<string>('sendMessage');

startListening({
  actionCreator: sendMessage,
  effect: ({ payload }, { getState, dispatch }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];
    const activeRoomId = selectActiveRoomId(getState());

    if (!activeRoomId) {
      return;
    }

    dispatch(
      sendMessageThunk({ auth_token, message_text: payload, id: activeRoomId })
    );
  },
});

startListening({
  actionCreator: sendMessage,
  effect: (_, { getState }) => {
    const activeRoomId = selectActiveRoomId(getState());

    if (!activeRoomId) {
      return;
    }

    sendCarrotEventPlatformChatMessageSent({ chatId: activeRoomId });
  },
});
