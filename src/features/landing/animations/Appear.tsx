import { animated, config, useInView, useSpring } from '@react-spring/web';

type Props = {
  y?: number;
  x?: number;
  rootMargin?: string;
  delay?: number;
  initialX?: number;
  initialY?: number;
};
export const Appear: FCC<Props> = ({
  className,
  children,
  y = 100,
  x = 0,
  rootMargin = '-10% 0%',
  delay = 0,
  initialX = 0,
  initialY = 0,
}) => {
  const [ref, isInView] = useInView({
    rootMargin,
    once: true,
  });

  const spring = useSpring({
    config: config.slow,
    opacity: isInView ? 1 : 0,
    y: isInView ? initialY : y,
    x: isInView ? initialX : x,
    delay,
  });

  return (
    <animated.div className={className} ref={ref} style={spring}>
      {children}
    </animated.div>
  );
};
