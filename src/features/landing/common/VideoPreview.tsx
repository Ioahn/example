import { useRef, useState } from 'react';
import { mergeProps, useFocusRing, useHover } from 'react-aria';
import {
  RiPauseMiniFill,
  RiPlayMiniFill,
  RiVolumeMuteFill,
  RiVolumeUpFill,
} from 'react-icons/ri';
import { cn } from '@shared/utils';
import { Button, ProgressBar } from '@shared/UI';

type Props = {
  sources: {
    src: string;
    type?: string;
    resolution?: string;
  }[];
  title: string;
  subTitle: string;
  poster?: string;
};

export const VideoPreview: FCC<Props> = ({
  sources,
  title,
  subTitle,
  className,
  poster,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [playState, setPlayState] = useState(false);
  const [mute, setMute] = useState(false);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);

  const togglePlayer = () => {
    const video = videoRef.current;
    if (!video) return;

    if (playState) {
      video.pause();
    } else {
      video.play().catch((error) => {
        console.error('Play failed:', error);
      });
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = !mute;
    setMute(!mute);
  };

  const getTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');

    return `${minutes}:${seconds}`;
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      setDuration(video.duration);
      console.log('Metadata loaded. Duration:', video.duration);
    }
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video) {
      setTime(video.currentTime);
    }
  };

  const handlePlay = () => {
    setPlayState(true);
  };

  const handlePause = () => {
    setPlayState(false);
  };

  const handleEnded = () => {
    setPlayState(false);
  };
  const onPressHandler = (percent: number) => {
    const video = videoRef.current;
    if (video && duration > 0) {
      video.currentTime = percent * duration;
    }
  };

  const { focusProps, isFocused } = useFocusRing({ within: true });
  const { hoverProps } = useHover({
    onHoverEnd: () => {
      containerRef.current?.focus?.();
      containerRef.current?.blur?.();
    },
  });

  return (
    <div
      className={cn(
        'w-full overflow-hidden rounded-2xl relative bg-content-primary group',
        className
      )}
      {...mergeProps(focusProps, hoverProps)}
      ref={containerRef}
      tabIndex={0}
    >
      <div className='absolute inset-0'>
        <video
          className='w-full h-full object-cover'
          controls={false}
          controlsList={'nofullscreen'}
          ref={videoRef}
          poster={poster}
          preload='metadata'
          muted={mute}
          onLoadedMetadata={handleLoadedMetadata}
          onTimeUpdate={handleTimeUpdate}
          onPlay={handlePlay}
          onPause={handlePause}
          onEnded={handleEnded}
          playsInline={true}
        >
          {sources.map(({ src, type, resolution }, index) => (
            <source key={index} src={src} type={type} media={resolution} />
          ))}
        </video>
      </div>
      <div
        className={cn(
          'absolute inset-0 flex flex-col p-4 pr-4 opacity-0 hover:opacity-100 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300',
          {
            'opacity-100': !playState || isFocused, // Always visible when not playing or focused
            'opacity-0 group-hover:opacity-100': playState, // Hidden when playing, visible on hover
          }
        )}
      >
        <div className='flex-grow' />
        <div className='flex flex-col gap-2 text-content-inverse'>
          <div className='flex flex-col'>
            <p className='font-base-semibold'>{title}</p>
            <p className='font-grain text-content-tertiary'>{subTitle}</p>
          </div>

          <div className='flex items-center gap-2'>
            <Button
              variant='clear'
              className='rounded-full p-1 hover:bg-black/30 transition-colors'
              onPress={togglePlayer}
              aria-label={playState ? 'Pause video' : 'Play video'}
            >
              {playState ? (
                <RiPauseMiniFill className='text-md' />
              ) : (
                <RiPlayMiniFill className='text-md' />
              )}
            </Button>

            <Button
              variant='clear'
              className='rounded-full p-1 hover:bg-black/30 transition-colors'
              onPress={toggleMute}
              aria-label={mute ? 'Unmute video' : 'Mute video'}
            >
              {mute ? (
                <RiVolumeMuteFill className='text-md' />
              ) : (
                <RiVolumeUpFill className='text-md' />
              )}
            </Button>

            <div className='font-grain text-sm'>
              {getTime(time)} / {getTime(duration)}
            </div>

            <div className='flex-1 mx-2'>
              <ProgressBar
                value={duration > 0 ? (time / duration) * 100 : 0}
                onPress={onPressHandler}
                aria-label='Video progress'
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
