import { animated, config, useInView, useSpring } from '@react-spring/web';

export const Opacity: FCC<{ rootMargin?: string }> = ({
  rootMargin = '-10% 0%',
  className,
  children,
}) => {
  const [ref, isInView] = useInView({
    rootMargin,
  });

  const spring = useSpring({
    config: config.slow,
    opacity: isInView ? 1 : 0.1,
  });

  return (
    <animated.div className={className} ref={ref} style={spring}>
      {children}
    </animated.div>
  );
};
