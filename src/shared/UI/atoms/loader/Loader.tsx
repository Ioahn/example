import { animated, easings, useSpring, useTransition } from '@react-spring/web';
import { ReactNode } from 'react';
import { RiCheckLine, RiErrorWarningLine, RiLoader4Line } from 'react-icons/ri';
import { cn } from '@shared/utils';
import { LOADING_STATES } from '@shared/constants';

type Props = {
  loadingState: LOADING_STATES;
  fixedWidth?: boolean;
};

const LoadingAnimation = () => {
  const props = useSpring({
    config: {
      duration: 1000,
      easing: easings.linear,
    },
    from: { x: 0 },
    to: { x: 1 },
    loop: true,
  });

  return (
    <div className='relative h-full w-full origin-center'>
      <animated.div
        style={{
          transform: props.x
            .to([0, 1], [0, 360])
            .to((value) => `rotateZ(${value}deg)`),
        }}
        className=' items-center flex justify-center'
      >
        <RiLoader4Line className='text-md' />
      </animated.div>
    </div>
  );
};

const RejectedAnimation = () => (
  <div className=' items-center flex h-full w-full justify-center'>
    <RiErrorWarningLine className='text-md' />
  </div>
);

const SuccessAnimation = () => {
  return (
    <div className=' items-center flex h-full w-full justify-center gap-2'>
      <RiCheckLine className='text-md' />
    </div>
  );
};
export const Loader: FCC<Props> = ({ className, children, loadingState }) => {
  const transition = useTransition(loadingState, {
    config: { easing: easings.linear },
    from: {
      opacity: 0,
      transform: 'scale3d(0, 0, 0)',
    },
    enter: {
      opacity: 1,
      transform: 'scale3d(1, 1, 1)',
    },
    leave: {
      opacity: 0,
      position: 'absolute',
      inset: '0',
      transform: 'scale3d(0, 0, 0)',
    },
    initial: {
      opacity: 1,
      transform: 'scale3d(1, 1, 1)',
    },
  });

  const onFirstAppear = (element: HTMLDivElement) => {
    if (!element) {
      return;
    }

    const { width } = element.getBoundingClientRect();

    element.style.minWidth = `${width}px`;
  };

  return (
    <div
      className={cn('relative w-full pointer-events-none', className)}
      ref={onFirstAppear}
    >
      {transition((style, item) => (
        <animated.div style={style} key={item} className='origin-center'>
          {
            {
              [LOADING_STATES.IDLE]: (
                <div className='w-full h-full flex items-center justify-center'>
                  {children}
                </div>
              ),
              [LOADING_STATES.LOADING]: (<LoadingAnimation />) as ReactNode,
              [LOADING_STATES.REJECTED]: (<RejectedAnimation />) as ReactNode,
              [LOADING_STATES.SUCCESS]: (<SuccessAnimation />) as ReactNode,
            }[item]
          }
        </animated.div>
      ))}
    </div>
  );
};
