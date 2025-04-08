import { RefObject } from 'react';
import { useMove } from 'react-aria';

export const useTouchScroll = <T extends HTMLElement>(
  containerRef: RefObject<T>
) => {
  const onMove = ({ deltaX }: { deltaX: number }) => {
    const container = containerRef.current;
    if (container) {
      container.scrollLeft -= deltaX;
    }
  };

  const { moveProps } = useMove({
    onMove,
  });

  return moveProps;
};
