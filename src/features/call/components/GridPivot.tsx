import { animated, config, useSpring } from '@react-spring/web';
import { T, __, always, both, cond, gte, lt, propSatisfies } from 'ramda';
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { useMove } from 'react-aria';
import { cn } from '@shared/utils';

const OFFSET = 16;
const DEFAULT_POSITION = { x: OFFSET, y: OFFSET };

type Point = { x: number; y: number };

export const GridPivot: FCC = function GridPivot({ children, className }) {
  const [position, setPosition] = useState<Point>(DEFAULT_POSITION);
  const containerRef = useRef<HTMLDivElement>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  const getCorner = useCallback((point: Point) => {
    if (!containerRef.current || !elementRef.current) {
      return DEFAULT_POSITION;
    }

    const { width, height } = containerRef.current?.getBoundingClientRect();
    const { width: elementWidth, height: elementHeight } =
      elementRef.current?.getBoundingClientRect();

    const centerPoint = {
      x: Math.floor(width / 2),
      y: Math.floor(height / 2),
    };

    const getPosition = cond([
      [
        both(
          propSatisfies(lt(__, centerPoint.x), 'x'),
          propSatisfies(lt(__, centerPoint.y), 'y')
        ),
        always(DEFAULT_POSITION),
      ],
      [
        both(
          propSatisfies(gte(__, centerPoint.x), 'x'),
          propSatisfies(lt(__, centerPoint.y), 'y')
        ),
        always({ x: width - elementWidth - 16, y: 16 }),
      ],
      [
        both(
          propSatisfies(lt(__, centerPoint.x), 'x'),
          propSatisfies(gte(__, centerPoint.y), 'y')
        ),
        always({ x: OFFSET, y: height - elementHeight - OFFSET }),
      ],
      [
        both(
          propSatisfies(gte(__, centerPoint.x), 'x'),
          propSatisfies(gte(__, centerPoint.y), 'y')
        ),
        always({
          x: width - elementWidth - OFFSET,
          y: height - elementHeight - OFFSET,
        }),
      ],
      [T, always(DEFAULT_POSITION)],
    ]);

    return getPosition(point) as Point;
  }, []);

  const [props, api] = useSpring(
    () => ({
      config: config.stiff,
      to: {
        x: position.x,
        y: position.y,
      },
    }),
    [position]
  );

  const { moveProps } = useMove({
    onMoveEnd: () => {
      setPosition(getCorner);
    },
    onMove: (e) => {
      setPosition(({ x, y }) => ({
        x: x + e.deltaX,
        y: y + e.deltaY,
      }));
    },
  });

  const updatePosition = useCallback(() => {
    if (!containerRef.current || !elementRef.current) {
      return;
    }

    const { height } = containerRef.current?.getBoundingClientRect();
    const { height: elementHeight } =
      elementRef.current?.getBoundingClientRect();

    setPosition({ x: OFFSET, y: height - elementHeight - OFFSET });
    api.set({ x: OFFSET, y: height - elementHeight - OFFSET });
  }, []);

  useLayoutEffect(() => {
    updatePosition();
  }, [updatePosition]);

  useEffect(() => {
    window.addEventListener('resize', updatePosition);

    return () => window.removeEventListener('resize', updatePosition);
  }, [updatePosition]);

  return (
    <div className={cn('absolute inset-0', className)} ref={containerRef}>
      <animated.div
        {...moveProps}
        style={props}
        className='absolute active:cursor-grab cursor-pointer select-none pointer-events-auto touch-none'
        ref={elementRef}
      >
        {children}
      </animated.div>
    </div>
  );
};
