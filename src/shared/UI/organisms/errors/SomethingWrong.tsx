import { animated, easings, useSpring } from '@react-spring/web';
import { Button, Container, Image } from '@shared/UI';
import bigStar from '@public/svg/BlueBigStar.svg';

export const SomethingWrong: FCC<{ errorMessage?: string }> = ({
  errorMessage,
}) => {
  const props = useSpring({
    config: {
      duration: 100000,
      easing: easings.linear,
    },
    from: { x: 0 },
    to: { x: 1 },
    loop: true,
  });

  return (
    <Container className='relative grid h-screen grid-cols-6 items-center justify-center sm:grid-cols-12 max-md:overflow-hidden'>
      <div className='col-span-6 flex flex-col gap-8 sm:col-span-4 sm:col-start-5'>
        <h1 className='text-center text-xl text-content-inverse'>
          {errorMessage ? errorMessage : `Что - то не так`}
        </h1>
        <p className='text-center text-content-inverse'>
          Попробуйте повторить попытку или вернитесь на главную страницу
        </p>
        <div className='flex flex-col gap-2'>
          <Button
            variant='primary'
            as='link'
            href='/'
            fullWidth
            className='flex justify-center'
          >
            Вернутся на главную
          </Button>
          <Button
            variant='secondary'
            onPress={() => location.reload()}
            fullWidth
          >
            Повторить попытку
          </Button>
        </div>
      </div>

      <animated.div
        className='absolute -inset-[20rem] -z-10 sm:inset-0'
        style={{
          transform: props.x
            .to([0, 1], [0, 360])
            .to((value) => `rotateZ(${value}deg)`),
        }}
      >
        <Image src={bigStar} fill alt='sensea' />
      </animated.div>
    </Container>
  );
};
