import {
  AudioPresets,
  ConnectionQuality,
  LocalTrack,
  RemoteTrack,
  Room,
  RoomEvent,
  VideoPresets,
  createLocalTracks,
} from 'livekit-client';
import type { RoomConnectOptions } from 'livekit-client/dist/src/options';

export class LiveKitCall {
  private room!: Room;

  private audioDeviceId?: string;
  private videoDeviceId?: string;

  public attachLocalTrackHook: (track: LocalTrack) => void = () => {};
  public attachRemoteTrackHook: (track: RemoteTrack) => void = () => {};
  public signalStateHook: (quality: ConnectionQuality) => void = () => {};
  public showUserErrorMessage: (message: string) => void = () => {};
  public onConnectedHook: () => void = () => {};

  public async initCall(
    jwtToken: string,
    audioDeviceId: string,
    videoDeviceId: string
  ): Promise<void> {
    this.audioDeviceId = audioDeviceId;
    this.videoDeviceId = videoDeviceId;

    this.room = new Room({
      adaptiveStream: true,
      dynacast: true,
      videoCaptureDefaults: {
        resolution: VideoPresets.h720.resolution,
      },
      publishDefaults: {
        audioPreset: AudioPresets.speech,
        scalabilityMode: 'L2T2_KEY',
        dtx: true,
        red: true,
      },
    });

    await this.room.prepareConnection('wss://livekit.sense-a.ru', jwtToken);
    this.room.on(RoomEvent.TrackSubscribed, (track: RemoteTrack) => {
      this.attachRemoteTrackHook(track);
    });
    this.room.on(RoomEvent.TrackUnsubscribed, (track: RemoteTrack) => {
      track.detach();
    });
    this.room.on(RoomEvent.AudioPlaybackStatusChanged, () => {
      if (!this.room.canPlaybackAudio) {
        // IDK why but it works after 1 seconds
        setTimeout(this.room.startAudio, 1000);
      }
    });
    this.room.on(
      RoomEvent.ConnectionQualityChanged,
      (quality: ConnectionQuality) => {
        this.signalStateHook(quality);
      }
    );
    const options: RoomConnectOptions = {
      autoSubscribe: true,
    };

    await this.room.connect('wss://livekit.sense-a.ru', jwtToken, options);
    await this.createAndPublishLocalTracks();
    this.onConnectedHook();
  }

  private async createAndPublishLocalTracks(): Promise<void> {
    const localTracks = await createLocalTracks({
      audio: {
        noiseSuppression: true,
        autoGainControl: true,
        voiceIsolation: true,
        echoCancellation: true,
      },
      video: { resolution: VideoPresets.h720.resolution },
    });

    localTracks.forEach((track) => {
      const { deviceId } = track.mediaStreamTrack.getSettings();

      if (deviceId !== this.audioDeviceId && deviceId !== this.videoDeviceId) {
        return;
      }

      this.room.localParticipant.publishTrack(track).catch((err) => {
        console.error('Failed to publish track', err);
      });
      this.attachLocalTrackHook(track);
    });
  }

  public async disconnect(): Promise<void> {
    await this.room?.disconnect();
  }

  public async muteVideo(): Promise<void> {
    await this.room?.localParticipant.setCameraEnabled(false);
  }

  public async unmuteVideo(): Promise<void> {
    await this.room?.localParticipant.setCameraEnabled(true);
  }

  public async muteAudio(): Promise<void> {
    await this.room?.localParticipant.setMicrophoneEnabled(false);
  }

  public async unmuteAudio(): Promise<void> {
    await this.room?.localParticipant.setMicrophoneEnabled(true);
  }

  public async changeVideoDevice(deviceId: string): Promise<void> {
    await this.room?.switchActiveDevice('videoinput', deviceId, true);
  }

  public async changeAudioDevice(deviceId: string): Promise<void> {
    await this.room?.switchActiveDevice('audioinput', deviceId, true);
  }

  public static async getLocalDevices(): Promise<MediaDeviceInfo[]> {
    return await Room.getLocalDevices();
  }
}
