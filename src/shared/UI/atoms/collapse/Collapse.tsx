import { animated, config, useSpring } from '@react-spring/web';
import { useRef } from 'react';
import useMeasure from 'react-use-measure';
import { cn } from '@shared/utils';

type Props = {
  isOpen: boolean;
  defaultHeight?: number;
};

export const Collapse: FCC<Props> = ({
  className,
  children,
  isOpen,
  defaultHeight = 0,
  ...rest
}) => {
  const refContainer = useRef<HTMLDivElement>(null);
  const [refContent, { height }] = useMeasure();
  const props = useSpring({
    config: config.stiff,
    height: isOpen ? (height === 0 ? undefined : height) : defaultHeight,
    onStart: () => {
      refContainer.current?.classList.add('overflow-hidden');
    },
    onRest: () => {
      isOpen && refContainer.current?.classList.remove('overflow-hidden');
    },
  });

  return (
    <animated.div
      style={props}
      {...rest}
      ref={refContainer}
      className={cn({ ['overflow-hidden']: !isOpen })}
    >
      <div ref={refContent} className={className}>
        {children}
      </div>
    </animated.div>
  );
};
