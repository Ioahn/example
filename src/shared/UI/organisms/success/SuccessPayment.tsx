import { animated, easings, useSpring } from '@react-spring/web';
import { useDebounce } from 'react-use';
import { checkOrderStatus } from '@entities/models';
import { useAppDispatch } from '@shared/hooks';
import { Container, Image } from '@shared/UI';
import bigStar from '@public/svg/BlueBigStar.svg';

export const SuccessPayment = () => {
  const dispatch = useAppDispatch();

  const props = useSpring({
    config: {
      duration: 100000,
      easing: easings.linear,
    },
    from: { x: 0 },
    to: { x: 1 },
    loop: true,
  });

  useDebounce(() => dispatch(checkOrderStatus()), 300);

  return (
    <div className='bg-bg-primary'>
      <Container className='grid h-screen grid-cols-6 items-center sm:grid-cols-12 relative overflow-hidden'>
        <h1 className='col-span-6 flex flex-col gap-8 sm:col-span-4 sm:col-start-5 items-center z-10 text-xl text-content-inverse'>
          Успешная оплата!
        </h1>
        <animated.div
          className='absolute inset-0'
          style={{
            transform: props.x
              .to([0, 1], [0, -360])
              .to((value) => `rotateZ(${value}deg)`),
          }}
        >
          <Image src={bigStar} fill alt='sensea' />
        </animated.div>
      </Container>
    </div>
  );
};
