import { animated, easings, useSpring } from '@react-spring/web';
import { cn } from '@shared/utils';
import { Image } from '@shared/UI';
import bigStar from '@public/svg/BlueBigStar.svg';

export function RotatingStar({ className }: CommonProps) {
  const { x } = useSpring({
    config: {
      duration: 100000,
      easing: easings.linear,
    },
    from: { x: 0 },
    to: { x: 1 },
    loop: true,
  });

  return (
    <animated.div
      className={cn('absolute inset-0', className)}
      style={{
        transform: x
          .to([0, 1], [0, -360])
          .to((value) => `rotateZ(${value}deg)`),
      }}
    >
      <Image src={bigStar} fill alt='sensea' />
    </animated.div>
  );
}
