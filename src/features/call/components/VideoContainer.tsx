import { ForwardedRef, RefObject, forwardRef, useLayoutEffect } from 'react';
import { useObjectRef } from 'react-aria';
import { cn } from '@shared/utils';

type Props = PropsWithClassNames & {
  videoRef?: RefObject<HTMLVideoElement>;
  playsInline?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
};

export const VideoContainer = forwardRef(function VideoContainer(
  { className = '', videoRef }: Props,
  forwardFef: ForwardedRef<HTMLDivElement>
) {
  const ref = useObjectRef(forwardFef);
  const videoElementRef = useObjectRef(videoRef);

  useLayoutEffect(() => {
    const observerCallback = (mutationsList: MutationRecord[]) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          const [videoNode] =
            mutation.addedNodes as unknown as HTMLVideoElement[];
          videoNode.setAttribute('class', className);

          videoElementRef.current = videoNode;
        }
      }
    };

    const observer = new MutationObserver(observerCallback);

    if (ref.current) {
      observer.observe(ref.current, { childList: true });
    }

    return () => observer.disconnect();
  }, [className, ref, videoElementRef]);

  return <div ref={ref} className={cn('absolute inset-0')} />;
});
