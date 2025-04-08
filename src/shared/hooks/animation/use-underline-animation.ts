import {
  config,
  useIsomorphicLayoutEffect,
  useSpring,
} from '@react-spring/web';
import { ReactElement, useCallback, useRef, useState } from 'react';

const getLocalCoordinates = (parent: Maybe<Element>, child: Maybe<Element>) => {
  if (!parent || !child) {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    };
  }

  const { x: parentX, y: parentY } = parent.getBoundingClientRect();
  const { x: childX, y: childY, width, height } = child.getBoundingClientRect();

  return {
    x: childX - parentX + parent.scrollLeft,
    y: childY - parentY + parent.scrollTop,
    width,
    height,
  };
};

export const useAnimatedUnderline = <T>({
  activeElement,
  items,
}: {
  activeElement: number | string | undefined;
  items: T[];
}) => {
  const [immediate, setImmediate] = useState(true);
  const state = useRef<Record<string, HTMLElement>>({});
  const containerRef = useRef<HTMLDivElement>(null);

  const elementsRef = (id: string | number) => (el: HTMLDivElement) => {
    state.current[id] = el;
  };

  const [props, api] = useSpring(() => ({
    config: {
      width: config.stiff,
    },
    left: 0,
    width: 0,
    height: 0,
    top: 0,
    immediate,
  }));

  const renderElements = useCallback(
    (fn: (item: T, fn: typeof elementsRef, i: number) => ReactElement) =>
      items.map((el, i) => fn(el, elementsRef, i)),
    [items]
  );

  useIsomorphicLayoutEffect(() => {
    const animateUnderline = () => {
      if (!activeElement || !state.current[activeElement]) {
        return;
      }

      const activeElementRef = state.current[activeElement];
      const rect = getLocalCoordinates(containerRef.current, activeElementRef);

      api.start({
        left: rect.x,
        width: rect.width,
        height: rect.height,
        top: rect.y,
        immediate,
        onResolve: () => {
          if (immediate) {
            setImmediate(false);
          }
        },
      });
    };

    animateUnderline();

    window.addEventListener('resize', animateUnderline);

    return () => window.removeEventListener('resize', animateUnderline);
  }, [activeElement, api, immediate]);

  return {
    renderElements,
    containerRef,
    underlineProps: props,
  };
};
