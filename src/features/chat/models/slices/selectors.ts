import { createSelector } from '@reduxjs/toolkit';
import { selectShortProfile } from '@entities/models/app/short-profile-slice';
import {
  CHAT_MESSAGES_SLICE,
  CHAT_REDUCER,
  CHAT_ROOM_SLICE,
  CHAT_UI_SLICE,
} from './constants';
import {
  messagesEntityAdapter,
  messagesPageParamsAdapter,
} from './messages-slice';
import { roomEntityAdapter } from './room-slice';

const chatRoomSlice = (state: RootState) =>
  state[CHAT_REDUCER][CHAT_ROOM_SLICE];
const chatMessageSlice = (state: RootState) =>
  state[CHAT_REDUCER][CHAT_MESSAGES_SLICE];
const chatUISlice = (state: RootState) => state[CHAT_REDUCER][CHAT_UI_SLICE];

export const selectChatRoomState = createSelector(
  chatRoomSlice,
  (state) => state
);
/**
 * Возвращает все комнаты
 */
export const selectAllRooms = createSelector(
  chatRoomSlice,
  roomEntityAdapter.getSelectors().selectAll
);

/**
 * Возвращает все id комнат
 */
export const selectAllRoomsId = createSelector(
  chatRoomSlice,
  roomEntityAdapter.getSelectors().selectIds
);

export const selectIsChatInit = createSelector(
  chatRoomSlice,
  ({ is_init }) => is_init
);

/**
 * Возвращает все комнаты
 */
export const selectHasRooms = createSelector(
  chatRoomSlice,
  (state) => roomEntityAdapter.getSelectors().selectAll(state).length !== 0
);

/**
 *  Возвращает комнату по Id
 */
export const selectRoomById = createSelector(
  chatRoomSlice,
  (_: RootState, id: string) => id,
  (rooms, id) => roomEntityAdapter.getSelectors().selectById(rooms, id)
);

/**
 * Возвращает id активной комнаты
 */
export const selectActiveRoomId = createSelector(
  chatUISlice,
  ({ activeRoom }) => activeRoom
);

/**
 * Возвращает сообщения с активной комнатой
 */
export const selectMessagesByActiveRoom = createSelector(
  chatMessageSlice,
  selectActiveRoomId,
  ({ rooms }, activeId) => {
    if (!activeId || !rooms[activeId]) {
      return null;
    }

    return messagesEntityAdapter.getSelectors().selectAll(rooms[activeId]);
  }
);

/**
 * Возвращает сообщения с id комнаты
 */
export const selectMessagesByRoomId = createSelector(
  chatMessageSlice,
  (_: RootState, id: string) => id,
  ({ rooms }, activeId) => {
    if (!activeId || !rooms[activeId]) {
      return null;
    }

    return messagesEntityAdapter.getSelectors().selectAll(rooms[activeId]);
  }
);

/**
 * Возвращает активную комнату
 */
export const selectActiveRoom = createSelector(
  selectActiveRoomId,
  chatRoomSlice,
  (activeRoom, roomState) => {
    if (!activeRoom) {
      return null;
    }

    return roomEntityAdapter.getSelectors().selectById(roomState, activeRoom);
  }
);

/**
 * Возвращает проверку, что сообщения в комнате существуют
 */
export const selectIsMessagesInActiveRoom = createSelector(
  selectMessagesByActiveRoom,
  (messages) => messages !== null
);

/**
 * Возвращает проверку, что есть новые сообщения в комнате
 */
export const selectHasNewChatMessagesInRoom = createSelector(
  selectMessagesByRoomId,
  selectShortProfile,
  (messages, { id }) => {
    return messages?.some(
      ({ is_read, sender_id }) => !is_read && sender_id !== id
    );
  }
);

/**
 * Возвращает проверку, что есть новые сообщения в активной комнате
 */
export const selectHasNewChatMessagesInActiveRoom = createSelector(
  (state: RootState) => state,
  selectActiveRoomId,
  (state, activeRoom) =>
    !!activeRoom && selectHasNewChatMessagesInRoom(state, activeRoom)
);

export const selectHasNewMessages = createSelector(
  (state: RootState) => state,
  selectAllRoomsId,
  (state, ids) =>
    ids.some((id) => selectHasNewChatMessagesInRoom(state, id as string))
);

/**
 * Возвращает чат с пользователем по ID пользователя
 */
export const selectRoomByInterlocutor = createSelector(
  selectAllRooms,
  (_: RootState, id: string) => id,
  (rooms, interlocutorId) =>
    rooms.find(({ interlocutor }) => interlocutor.id === interlocutorId)
);

/**
 * Возвращает состояние UI стора
 */
export const selectChatUIState = createSelector(chatUISlice, (state) => state);

export const selectMessagePageState = createSelector(
  chatMessageSlice,
  (_: RootState, id?: Maybe<string>) => id,
  ({ pages }, id) => {
    if (!id) {
      return null;
    }

    return messagesPageParamsAdapter.getSelectors().selectById(pages, id);
  }
);
