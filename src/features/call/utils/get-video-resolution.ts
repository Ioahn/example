export const getVideoResolution = (
  element: HTMLVideoElement
): Maybe<{ width: number; height: number }> => {
  const videoTracks = (element.srcObject as MediaStream).getVideoTracks?.();

  if (videoTracks.length === 0) {
    console.error('В MediaStream нет видео-треков.');
    return null;
  }

  const [videoTrack] = videoTracks;
  const settings = videoTrack.getSettings();

  const { width, height } = settings;

  if (width && height) {
    return { width, height };
  } else {
    console.error('Не удалось получить разрешение видео.');
    return null;
  }
};
