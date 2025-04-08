import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import { sendCarrotEventNotificationsRead } from '@shared/externals';
import { setNotificationVisible } from '@entities/models/app/ui-slice';
import { TInboxItemResponseSchema, senseApi } from '@shared/api';
import {
  createLoadingStateEntity,
  createPageLoaderEntity,
  serializeAxiosErrors,
  startListening,
} from '@shared/utils';
import { onMountAppAction } from '@shared/hooks';
import {
  NOTIFICATION_SLICE_NAME,
  SHORT_PROFILE_SLICE_NAME,
} from '@shared/constants';

enum INBOX_EVENTS {
  NEW_INBOX = 'new_inbox_notification',
  INITIAL_STATE = 'initial_state',
}

const pageLoaderEntity = createPageLoaderEntity({
  pageSize: 10,
  selectPageState: (state: AnyObject) => state[NOTIFICATION_SLICE_NAME],
  updateFunction: (state, updateObj) => {
    Object.assign(state, {
      page_num: updateObj.page_num + 1,
      has_more: updateObj.has_more,
      is_init: updateObj.is_init,
    });
  },
});

const notificationLoaderState = createLoadingStateEntity(
  NOTIFICATION_SLICE_NAME
);

const inboxEntity = createEntityAdapter<TInboxItemResponseSchema>({
  sortComparer: (inbox1, inbox2) => inbox2.created_at - inbox1.created_at,
});

const initialState = {
  hasNewMessage: false,
  ...inboxEntity.getInitialState(),
  ...pageLoaderEntity.getInitialState(),
  ...notificationLoaderState.getInitialState(),
};

export const nextInboxPage = createAction('nextInboxPage');
export const prevInboxPage = createAction('prevInboxPage');
export const initInboxPage = createAction('initInboxPage');

const getAllInboxesThunk = createAsyncThunk(
  'getAllInboxesThunk',
  ({
    page_num,
    auth_token,
    page_size,
  }: {
    page_num: number;
    auth_token: string;
    page_size: number;
  }) =>
    senseApi.getInboxItems(
      { page_num, page_size },
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    ),
  { serializeError: serializeAxiosErrors }
);

const markAllInboxesAsReadThunk = createAsyncThunk(
  'markAllInboxesAsReadThunk',
  ({ auth_token }: { auth_token: string }) =>
    senseApi.markAllInboxItemsAsRead({
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }),
  { serializeError: serializeAxiosErrors }
);

export const notificationSlice = createSlice({
  name: NOTIFICATION_SLICE_NAME,
  initialState,
  reducers: {
    setHasNewMessage: (state, { payload }: PayloadAction<boolean>) => {
      state.hasNewMessage = payload;
    },
    markAllAsRead: (state) => {
      state.hasNewMessage = false;
      const allUnreadInboxes = inboxEntity
        .getSelectors()
        .selectAll(state)
        .filter(({ is_read }) => !is_read);

      inboxEntity.updateMany(
        state,
        allUnreadInboxes.map(({ id }) => ({
          id,
          changes: {
            is_read: true,
          },
        }))
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllInboxesThunk.fulfilled, (state, { payload }) => {
      inboxEntity.addMany(state, payload.data.inboxes || []);
    });

    notificationLoaderState.reducer(builder, getAllInboxesThunk);
    pageLoaderEntity.reducer(builder, {
      initPageAction: initInboxPage,
      nextPageAction: nextInboxPage,
      prevPageAction: prevInboxPage,
      fetcherThunk: getAllInboxesThunk,
    });
  },
});

export const { setHasNewMessage, markAllAsRead } = notificationSlice.actions;

const slice = (state: RootState) => state[NOTIFICATION_SLICE_NAME];

export const selectAllInboxes = inboxEntity.getSelectors(slice).selectAll;
export const selectHasNewMessage = createSelector(
  slice,
  selectAllInboxes,
  ({ hasNewMessage }, inboxes) =>
    hasNewMessage || inboxes.some(({ is_read }) => !is_read)
);

startListening({
  actionCreator: onMountAppAction,
  effect: (_, { getState, dispatch, unsubscribe, extra }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];

    if (!auth_token) {
      return;
    }

    const sse = extra.sse(auth_token);

    sse.addMessageHandler((e: MessageEvent) => {
      const data = JSON.parse(e.data);

      if (data.event === INBOX_EVENTS.NEW_INBOX) {
        dispatch(setHasNewMessage(true));
      }

      if (data.event === INBOX_EVENTS.INITIAL_STATE) {
        dispatch(setHasNewMessage(data.payload.has_new_notifications));
      }
    });

    unsubscribe();
  },
});

startListening({
  actionCreator: setNotificationVisible,
  effect: async ({ payload }, { dispatch, delay, getState }) => {
    if (!payload) {
      return;
    }

    dispatch(initInboxPage());

    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];

    await delay(500);
    dispatch(markAllAsRead());
    dispatch(markAllInboxesAsReadThunk({ auth_token }));
  },
});

startListening({
  actionCreator: markAllInboxesAsReadThunk.fulfilled,
  effect: async () => {
    sendCarrotEventNotificationsRead();
  },
});
