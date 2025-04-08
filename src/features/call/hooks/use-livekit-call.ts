import { ConnectionQuality, LocalTrack, RemoteTrack } from 'livekit-client';
import { RefObject, useCallback, useEffect, useRef } from 'react';
import {
  selectVideoCallState,
  setSignal,
  setWaitingInterlocutor,
  startCallTimerAction,
} from '@entities/models';
import { LiveKitCall } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';

const QUALITY_SIGNAL_MAP: { [K in ConnectionQuality]: number } = {
  unknown: 0,
  lost: 0.1,
  poor: 0.2,
  good: 0.5,
  excellent: 0.8,
};

export const useConference = (): [
  RefObject<HTMLVideoElement>,
  RefObject<MediaProvider>,
  RefObject<HTMLVideoElement>,
  RefObject<HTMLAudioElement>,
  Maybe<LiveKitCall>,
] => {
  const dispatch = useAppDispatch();

  const { audioDeviceId, videoDeviceId, noVideo, noMic, interlocutorInfo } =
    useAppSelector(selectVideoCallState);

  const liveKitCallInstance = useRef(new LiveKitCall()).current;

  const [userVideoRef, peerVideoRef, peerAudioRef] = [
    useRef<HTMLVideoElement>(null),
    useRef<HTMLVideoElement>(null),
    useRef<HTMLAudioElement>(null),
  ];

  const localAudioMediaStream = useRef<Maybe<MediaProvider>>(null);

  const onConnected = useCallback(() => {
    dispatch(startCallTimerAction());
  }, [dispatch]);

  const attachLocalTrack = useCallback(
    (track: LocalTrack) => {
      if (!userVideoRef?.current) {
        return;
      }

      if (track.kind === 'audio' && track.mediaStream) {
        localAudioMediaStream.current = track.mediaStream;
      } else {
        track.attach(userVideoRef.current);
      }
    },
    [userVideoRef]
  );

  const attachPeerTrack = useCallback(
    (track: RemoteTrack) => {
      if (!peerVideoRef?.current || !peerAudioRef.current) {
        return;
      }

      if (track.kind === 'audio') {
        track.attach(peerAudioRef.current);
      } else {
        track.attach(peerVideoRef.current);
      }

      dispatch(setWaitingInterlocutor(false));
    },
    [peerVideoRef]
  );

  const changeSignalState = useCallback((quality: ConnectionQuality) => {
    dispatch(setSignal(QUALITY_SIGNAL_MAP[quality]));
  }, []);

  useEffect(() => {
    if (noMic) {
      liveKitCallInstance.muteAudio();
    } else {
      liveKitCallInstance.unmuteAudio();
    }
  }, [noMic]);

  useEffect(() => {
    if (noVideo) {
      liveKitCallInstance.muteVideo();
    } else {
      liveKitCallInstance.unmuteVideo();
    }
  }, [noVideo]);

  useEffect(() => {
    if (!audioDeviceId) {
      return;
    }
    liveKitCallInstance.changeAudioDevice(audioDeviceId);
  }, [audioDeviceId]);

  useEffect(() => {
    if (!videoDeviceId) {
      return;
    }
    liveKitCallInstance.changeVideoDevice(videoDeviceId);
  }, [videoDeviceId]);

  useEffect(() => {
    LiveKitCall.getLocalDevices().then((devices: MediaDeviceInfo[]) => {
      let initialAudioDeviceId: string | undefined;
      let initialVideoDeviceId: string | undefined;

      if (audioDeviceId) {
        initialAudioDeviceId = audioDeviceId;
      }
      if (videoDeviceId) {
        initialVideoDeviceId = videoDeviceId;
      }

      for (const device of devices) {
        if (device.kind === 'audioinput' && !initialAudioDeviceId) {
          initialAudioDeviceId = device.deviceId;
        }
        if (device.kind === 'videoinput' && !initialVideoDeviceId) {
          initialVideoDeviceId = device.deviceId;
        }
      }

      if (!initialAudioDeviceId || !initialVideoDeviceId) {
        throw Error('No device available !!!');
      }

      liveKitCallInstance.initCall(
        interlocutorInfo?.jwt_token,
        initialAudioDeviceId,
        initialVideoDeviceId
      );
      liveKitCallInstance.attachLocalTrackHook = attachLocalTrack;
      liveKitCallInstance.attachRemoteTrackHook = attachPeerTrack;
      liveKitCallInstance.onConnectedHook = onConnected;
      liveKitCallInstance.signalStateHook = changeSignalState;
    });
    return () => {
      liveKitCallInstance.disconnect();
    };
  }, [liveKitCallInstance, attachLocalTrack, attachPeerTrack]);

  return [
    userVideoRef,
    localAudioMediaStream,
    peerVideoRef,
    peerAudioRef,
    liveKitCallInstance,
  ];
};
