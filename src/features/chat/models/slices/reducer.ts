import { combineReducers } from 'redux';
import { chatMessagesSlice } from './messages-slice';
import { chatRoomSlice } from './room-slice';
import { uiChatSlice } from './ui-slice';

export const chatReducer = combineReducers({
  [chatRoomSlice.name]: chatRoomSlice.reducer,
  [chatMessagesSlice.name]: chatMessagesSlice.reducer,
  [uiChatSlice.name]: uiChatSlice.reducer,
});
