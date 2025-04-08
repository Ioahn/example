import { animated, useSpring } from '@react-spring/web';
import React, { memo, useCallback } from 'react';
import { useMeasure } from 'react-use';
import { cn } from '@shared/utils';

type Props = {
  w: number;
  h: number;
};

export const ContainerWithAspectRatio: FCC<Props> = memo(
  function ContainerWithAspectRatio({ w, h, children, className }) {
    // eslint-disable-next-line prefer-const
    let [ref, { width, height }] = useMeasure<HTMLDivElement>();

    const getWidthAndHeightOfParent = useCallback(
      (element: HTMLDivElement) => {
        element && ref(element.parentElement as HTMLDivElement);
      },
      [ref]
    );

    [width, height] =
      w > h
        ? [width, Math.min((width * h) / w, height)]
        : [(height * w) / h, height];

    const props = useSpring({
      width,
      height,
    });

    return (
      <animated.div
        ref={getWidthAndHeightOfParent}
        style={props}
        className={cn('w-full h-full relative', className)}
      >
        {children}
      </animated.div>
    );
  },
  (nextProps, prevProps) =>
    nextProps.w === prevProps.w && nextProps.h === prevProps.h
);
