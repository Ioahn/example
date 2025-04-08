import {
  animated,
  config,
  easings,
  to,
  useSpring,
  useSpringValue,
} from '@react-spring/web';
import { useEffect } from 'react';
import { useMeasure } from 'react-use';
import { clearTimeout, setTimeout } from 'worker-timers';
import { clamp } from '@shared/utils';

type Props = {
  audioDeviceId: Maybe<string>;
  noMic: boolean;
  signal: number;
  mediaProvider?: Maybe<MediaProvider>;
};

export const WaveEffect: FCC<Props> = function WaveEffect({
  audioDeviceId,
  noMic,
  signal,
  mediaProvider,
}) {
  const [ref, { width, height }] = useMeasure<HTMLDivElement>();

  const springAmplitude = useSpringValue(0, {
    config: config.gentle,
  });

  const springPhase = useSpring({
    from: { phase: 0 },
    to: { phase: 2 * Math.PI },
    loop: true,
    config: { duration: noMic ? 10_000 : 3_000, easing: easings.linear },
  });

  const springSignal = useSpring({ signal });

  useEffect(() => {
    let id: Maybe<number>;

    if (!mediaProvider) {
      return;
    }

    if (noMic) {
      springAmplitude.start(0.3);
      return;
    }

    try {
      const audioContext = new (window.AudioContext ||
        (window as AnyObject).webkitAudioContext)();
      const analyser = audioContext.createAnalyser();
      const source = audioContext.createMediaStreamSource(
        mediaProvider as MediaStream
      );
      source.connect(analyser);
      analyser.fftSize = 128;

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const getAudioData = () => {
        analyser.getByteTimeDomainData(dataArray);
        const normalizedData = [...dataArray].map((value) => value / 128 - 1);

        const volume =
          (normalizedData.reduce((sum, val) => sum + Math.abs(val), 0) /
            normalizedData.length) *
          100;

        const amplitude = clamp(volume, 0.5, 3);
        springAmplitude.start(amplitude);

        id = setTimeout(getAudioData, 100);
      };

      getAudioData();

      return () => {
        id && clearTimeout(id);
        source && source.disconnect();
        audioContext && audioContext.close();
      };
    } catch (err) {
      id = null;
    }
  }, [audioDeviceId, mediaProvider, noMic, springAmplitude]);

  const createWavePath = (amplitude: number, phase: number): string => {
    const K = 4;
    const NO_OF_CURVES = 3;
    const amplitudes = [0.5, 0.7, 0.2];
    const offsets = [-2, 4, 3];
    const widths = [0.4, 0.6, 0.3];
    const boundary = 2;

    const _globalAttFn = (x: number) => Math.pow(K / (K + x ** 2), K);

    const _ypos = (i: number) => {
      let y = 0;
      for (let ci = 0; ci < NO_OF_CURVES; ci++) {
        const t = offsets[ci];
        const k = 1 / widths[ci];
        const x = i * k - t;

        y += Math.abs(amplitudes[ci] * Math.sin(x - phase) * _globalAttFn(x));
      }
      y = y / NO_OF_CURVES;
      return height * amplitude * y;
    };

    const upperPath = [];
    const lowerPath = [];

    for (let i = -boundary; i <= boundary; i += 0.1) {
      // Increased step size to reduce computations
      const x = width * ((i + boundary) / (2 * boundary));
      const y1 = _ypos(i);
      const y2 = -_ypos(i);

      if (i === -boundary) {
        upperPath.push(`M ${x} ${y1}`);
      } else {
        upperPath.push(`L ${x} ${y1}`);
      }

      lowerPath.push(`L ${x} ${y2}`);
    }

    lowerPath.reverse();
    const combinedPath = upperPath.concat(lowerPath);
    combinedPath.push('Z');

    return combinedPath.join(' ');
  };

  return (
    <div className='w-full h-full' ref={ref}>
      <svg
        width={width}
        height={height * 2}
        viewBox={`0 0 ${width} ${height}`}
        className='absolute'
      >
        <animated.path
          d={to([springAmplitude, springPhase.phase], (amplitude, phaseValue) =>
            createWavePath(amplitude, phaseValue)
          )}
          fill={springSignal.signal.to(
            [0, 0.2, 0.5, 0.8],
            [
              'rgba(192, 53, 103, 0.6)',
              'rgba(192, 53, 103, 0.8)',
              'rgba(192, 133, 53, 0.6)',
              'rgba(53, 192, 183, 0.6)',
            ]
          )}
          stroke='none'
          className='mix-blend-multiply'
        />
        <animated.path
          d={to([springAmplitude, springPhase.phase], (amplitude, phaseValue) =>
            createWavePath(amplitude, phaseValue + (2 * Math.PI) / 3)
          )}
          fill={springSignal.signal.to(
            [0, 0.2, 0.5, 0.8],
            [
              'rgba(192, 53, 103, 0.2)',
              'rgba(192, 53, 103, 0.2)',
              'rgba(192, 133, 53, 0.2)',
              'rgba(53, 192, 183, 0.2)',
            ]
          )}
          stroke='none'
          className='mix-blend-multiply'
        />
      </svg>
    </div>
  );
};
