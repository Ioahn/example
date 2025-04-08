import { useEffect, useState } from 'react';
import { LiveKitCall } from '@shared/utils';

const DEVICE_KIND = {
  VIDEO: 'videoinput',
  AUDIO: 'audioinput',
};

export const useDeviceStreams = () => {
  const [videoDevices, setVideoDevices] = useState<MediaDeviceInfo[]>([]);
  const [audioDevices, setAudioDevices] = useState<MediaDeviceInfo[]>([]);

  useEffect(() => {
    LiveKitCall.getLocalDevices().then((devices: MediaDeviceInfo[]) => {
      setVideoDevices(
        devices.filter((device) => device.kind === DEVICE_KIND.VIDEO)
      );
      setAudioDevices(
        devices.filter((device) => device.kind === DEVICE_KIND.AUDIO)
      );
    });
  }, []);

  return {
    videoDevices,
    audioDevices,
  };
};
