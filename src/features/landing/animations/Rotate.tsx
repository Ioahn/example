import { animated, easings, useSpring } from '@react-spring/web';

type Props = {
  duration?: number;
};
export const Rotate: FCC<Props> = ({
  className,
  children,
  duration = 100000,
}) => {
  const props = useSpring({
    config: {
      duration,
      easing: easings.linear,
    },
    from: { x: 0 },
    to: { x: 1 },
    loop: true,
  });

  return (
    <animated.div
      className={className}
      style={{
        transform: props.x
          .to([0, 1], [0, 360])
          .to((value) => `rotateZ(${value}deg)`),
      }}
    >
      {children}
    </animated.div>
  );
};
