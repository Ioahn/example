import { useEffect, useRef } from 'react';

type Props = {
  threshold: number;
  trigger?: () => void;
  root?: HTMLElement;
  watch?: boolean;
};

export const useTrigger = <T extends HTMLElement = HTMLDivElement>({
  threshold,
  trigger,
  root,
  watch = true,
}: Props) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!watch || !ref.current) return;

    const options: IntersectionObserverInit = {
      root,
      rootMargin: `${threshold}px`,
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          trigger?.();
        }
      });
    }, options);

    observer.observe(ref.current as HTMLElement);

    return () => observer.disconnect();
  }, [root, threshold, trigger, watch]);

  return ref;
};
