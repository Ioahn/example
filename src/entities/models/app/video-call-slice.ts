import {
  PayloadAction,
  createAction,
  createAsyncThunk,
  createSelector,
  createSlice,
  isAnyOf,
} from '@reduxjs/toolkit';
import { sendCarrotEventSessionCallEntered } from '@shared/externals';
import { clearInterval, setInterval } from 'worker-timers';
import { openProfile } from '@entities/models';
import {
  TAccountType,
  TBodyFinishSession,
  TBodySubmitSessionFeedback,
  TVideoSessionInfoResponseSchema,
  senseApi,
} from '@shared/api';
import {
  createHydrateEntity,
  createLoadingStateEntity,
  createResetEntity,
  serializeAxiosErrors,
  startListening,
} from '@shared/utils';
import {
  SHORT_PROFILE_SLICE_NAME,
  VIDEO_CALL_SLICE_NAME,
} from '@shared/constants';

const feedbackLoader = createLoadingStateEntity(VIDEO_CALL_SLICE_NAME, {
  loadingStateName: 'feedbackLoadingState',
  errorStateName: 'feedbackErrorMessage',
});

const hydrateEntity = createHydrateEntity({
  selectStoreFromHydrate: (payload) => payload[VIDEO_CALL_SLICE_NAME],
});

const initialState = {
  roomID: '',
  noMic: false,
  noVideo: false,
  interlocutorInfo: {} as TVideoSessionInfoResponseSchema,
  waitingInterlocutor: true,
  msRemaining: null as Maybe<number>,
  videoDeviceId: null as Maybe<string>,
  audioDeviceId: null as Maybe<string>,
  signal: 1,
  interlocutorAspectRatio: [16, 9] as [number, number],
  ...feedbackLoader.getInitialState(),
  ...hydrateEntity.getInitialState(),
};

const resetEntity = createResetEntity(initialState);

export const startCallTimerAction = createAction('startCallTimerAction');

export const joinRoomAction = createAction('joinRoomAction');
export const roomCreatedAction = createAction('roomCreatedAction');
export const roomJoinedAction = createAction('roomJoinedAction');
export const readyToCommunicateAction = createAction(
  'readyToCommunicateAction'
);

export const addTrackListenerAction = createAction('addTrackListenerAction');

export const addTrackAction = createAction('addTrackAction');
export const monitorRTSBitrateAction = createAction('monitorRTSBitrateAction');
export const monitorSignalAction = createAction<AnyObject>(
  'monitorSignalAction'
);

export const acceptHostOfferAction = createAction<RTCSessionDescriptionInit>(
  'createJoinedOfferAction'
);

export const clearConnection = createAction('clearConnection');
export const leaveCallAction = createAction('leaveCallAction');
export const finishSessionAction = createAction('finishSessionAction');

export const disconnectedAction = createAction('disconnectedAction');

export const sendFeedback = createAction<AnyObject>('sendFeedback');

const resetState = createAction('resetVideoCallState');

// We don't use push action here because it can't disable usage of camera on page back
export const openVideoCall = (roomId: string): void => {
  window.location.href = `/call/${roomId}`;
};

export const openFeedback = (roomId: string): void => {
  window.location.href = `/call/feedback/${roomId}`;
};

export const openSpecialistCalendar = (): void => {
  window.location.href = '/specialist/calendar';
};

const sendFeedbackThunk = createAsyncThunk(
  'sendFeedbackThunk',
  ({
    auth_token,
    ...rest
  }: { auth_token: string } & TBodySubmitSessionFeedback) =>
    senseApi.submitSessionFeedback(rest, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }),
  { serializeError: serializeAxiosErrors }
);

const endSessionThunk = createAsyncThunk(
  'endSessionThunk',
  ({ auth_token, session_id }: { auth_token: string } & TBodyFinishSession) =>
    senseApi.finishSession(
      { session_id },
      {
        headers: {
          Authorization: `Bearer ${auth_token}`,
        },
      }
    ),
  { serializeError: serializeAxiosErrors }
);

const getVideoSessionInfoThunk = createAsyncThunk(
  'getVideoSessionInfoThunk',
  ({ auth_token, roomId }: { auth_token: string; roomId: string }) =>
    senseApi.getVideoSessionInfo(roomId, {
      headers: {
        Authorization: `Bearer ${auth_token}`,
      },
    }),
  { serializeError: serializeAxiosErrors }
);

const getTestVideoSessionInfoThunk = createAsyncThunk(
  'getTestVideoSessionInfoThunk',
  ({ account, roomId }: { account: TAccountType; roomId: string }) =>
    senseApi.getTestVideoSessionInfo(roomId, account),
  { serializeError: serializeAxiosErrors }
);

export const getVideoSessionInfoThunkSSR = createAsyncThunk(
  'getVideoSessionInfoThunkSSR',
  async ({ payload }: { payload: AnyObject }, { getState, dispatch }) => {
    const { test, roomId, account } = payload;
    const state = getState() as RootState;
    const { auth_token } = state[SHORT_PROFILE_SLICE_NAME];

    if (test) {
      await dispatch(getTestVideoSessionInfoThunk({ account, roomId }));
    } else {
      await dispatch(getVideoSessionInfoThunk({ auth_token, roomId }));
    }
  },
  { serializeError: serializeAxiosErrors }
);

export const videoCallSlice = createSlice({
  name: VIDEO_CALL_SLICE_NAME,
  initialState,
  reducers: {
    setRoomID: (state, { payload }: PayloadAction<string>) => {
      state.roomID = payload;
    },
    toggleNoMic: (state) => {
      state.noMic = !state.noMic;
    },
    toggleNoVideo: (state) => {
      state.noVideo = !state.noVideo;
    },
    setInterlocutor: (
      state,
      { payload }: PayloadAction<TVideoSessionInfoResponseSchema>
    ) => {
      state.interlocutorInfo = payload;
    },
    setInterlocutorAspectRatio: (
      state,
      { payload }: PayloadAction<[number, number]>
    ) => {
      state.interlocutorAspectRatio = payload;
    },
    setWaitingInterlocutor: (state, { payload }: PayloadAction<boolean>) => {
      state.waitingInterlocutor = payload;
    },
    setMsRemaining: (state, { payload }) => {
      state.msRemaining = Math.max(0, payload);
    },
    setAudioDeviceId: (state, { payload }: PayloadAction<string>) => {
      state.audioDeviceId = payload;
    },
    setVideoDeviceId: (state, { payload }: PayloadAction<string>) => {
      state.videoDeviceId = payload;
    },
    setSignal: (state, { payload }: PayloadAction<number>) => {
      state.signal = payload;
    },
  },
  extraReducers: (builder) => {
    hydrateEntity.reducer(builder, getVideoSessionInfoThunkSSR);
    feedbackLoader.reducer(builder, sendFeedbackThunk);
    resetEntity.reducer(builder, resetState);
  },
});

export const {
  toggleNoMic,
  toggleNoVideo,
  setRoomID,
  setInterlocutor,
  setWaitingInterlocutor,
  setMsRemaining,
  setVideoDeviceId,
  setAudioDeviceId,
  setSignal,
  setInterlocutorAspectRatio,
} = videoCallSlice.actions;

const slice = (state: RootState) => state[VIDEO_CALL_SLICE_NAME];

export const selectVideoCallState = createSelector(slice, (state) => state);
export const selectSectionId = createSelector(slice, (state) => state.roomID);
export const selectInterlocutorData = createSelector(
  slice,
  ({ interlocutorInfo: { interlocutor } }) => ({
    ...interlocutor,
    full_name: `${interlocutor?.first_name || ''} ${interlocutor?.last_name || ''}`,
  })
);

export const selectWaitingInterlocutor = createSelector(
  slice,
  ({ waitingInterlocutor }) => waitingInterlocutor
);

export const selectInterlocutorAspectRatio = createSelector(
  slice,
  ({ interlocutorAspectRatio }) => interlocutorAspectRatio
);

export const getDevices = createSelector(
  slice,
  ({ audioDeviceId, videoDeviceId, noVideo, noMic }) => ({
    audioDeviceId,
    videoDeviceId,
    noVideo,
    noMic,
  })
);

export const getSignal = createSelector(slice, ({ signal }) => ({
  signal,
}));

export const selectIsCallFinished = createSelector(
  slice,
  (rootState: RootState) => rootState[SHORT_PROFILE_SLICE_NAME],
  ({ msRemaining }, { account_type }) =>
    msRemaining === 0 && account_type === TAccountType.ESpecialist
);

export const selectFeedbackSelector = feedbackLoader.getSelectors(slice);

startListening({
  actionCreator: roomJoinedAction,
  effect: async (action, { getState, dispatch, condition }) => {
    const { interlocutorInfo } = getState()[VIDEO_CALL_SLICE_NAME];
    const { session_finish_date } = interlocutorInfo;

    const remaining =
      new Date(session_finish_date * 1000).getTime() - new Date().getTime();

    dispatch(setMsRemaining(remaining));

    const checkMsRemaining = (id: number) => {
      const { msRemaining } = getState()[VIDEO_CALL_SLICE_NAME];

      if (msRemaining === null || msRemaining === 0) {
        clearInterval(id);
        return;
      }

      dispatch(setMsRemaining(msRemaining - 1000));
    };

    const intervalID = setInterval(() => checkMsRemaining(intervalID), 1000);

    await condition(leaveCallAction.match);
  },
});

startListening({
  actionCreator: startCallTimerAction,
  effect: async (action, { getState, dispatch, condition }) => {
    const { interlocutorInfo } = getState()[VIDEO_CALL_SLICE_NAME];
    const { session_finish_date } = interlocutorInfo;

    const remaining =
      new Date(session_finish_date * 1000).getTime() - new Date().getTime();

    dispatch(setMsRemaining(remaining));

    const checkMsRemaining = (id: number) => {
      const { msRemaining } = getState()[VIDEO_CALL_SLICE_NAME];
      if (msRemaining === null || msRemaining === 0) {
        clearInterval(id);
        return;
      }

      dispatch(setMsRemaining(msRemaining - 1000));
    };

    const intervalID = setInterval(() => checkMsRemaining(intervalID), 1000);

    await condition(leaveCallAction.match);
  },
});

startListening({
  actionCreator: disconnectedAction,
  effect: (action, { dispatch, getState }) => {
    const { msRemaining } = getState()[VIDEO_CALL_SLICE_NAME];

    if (msRemaining === 0) {
      dispatch(leaveCallAction());

      return;
    }
  },
});

startListening({
  actionCreator: finishSessionAction,
  effect: async (_, { dispatch, getState }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];
    const { roomID } = getState()[VIDEO_CALL_SLICE_NAME];

    await dispatch(
      endSessionThunk({ auth_token, session_id: roomID as string })
    );

    dispatch(leaveCallAction());
  },
});

startListening({
  actionCreator: leaveCallAction,
  effect: (_, { dispatch, getState }) => {
    const { account_type } = getState()[SHORT_PROFILE_SLICE_NAME];
    const { roomID } = getState()[VIDEO_CALL_SLICE_NAME];

    if (account_type === TAccountType.EClient) {
      dispatch(resetState());
      openFeedback(roomID as string);
    } else {
      openSpecialistCalendar();
    }
  },
});

startListening({
  actionCreator: sendFeedback,
  effect: ({ payload }, { getState, dispatch }) => {
    const { auth_token } = getState()[SHORT_PROFILE_SLICE_NAME];
    const { roomID } = getState()[VIDEO_CALL_SLICE_NAME];

    dispatch(
      sendFeedbackThunk({
        auth_token,
        session_id: roomID as string,
        ...payload,
      })
    );
  },
});

startListening({
  actionCreator: sendFeedbackThunk.fulfilled,
  effect: async (_, { dispatch, delay }) => {
    await delay(1000);

    dispatch(resetState());
    dispatch(openProfile());
  },
});

startListening({
  matcher: isAnyOf(
    getVideoSessionInfoThunk.fulfilled,
    getTestVideoSessionInfoThunk.fulfilled
  ),
  effect: ({ payload }, { dispatch }) => {
    dispatch(setInterlocutor(payload.data));
  },
});

startListening({
  matcher: isAnyOf(getVideoSessionInfoThunk.fulfilled),
  effect: ({ payload }) => {
    sendCarrotEventSessionCallEntered({
      sessionId: payload.data.id,
    });
  },
});
