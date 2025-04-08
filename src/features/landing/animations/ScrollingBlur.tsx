import { animated, useScroll } from '@react-spring/web';

type Props = {
  from?: number;
  to?: number;
};
export const ScrollingBlur: FCC<Props> = ({
  className,
  children,
  from = 20,
  to = 0,
}) => {
  const { scrollYProgress } = useScroll();

  return (
    <animated.div
      className={className}
      style={{
        filter: scrollYProgress
          .to([0, 1], [from, to])
          .to((x) => `blur(${x}px)`),
      }}
    >
      {children}
    </animated.div>
  );
};
