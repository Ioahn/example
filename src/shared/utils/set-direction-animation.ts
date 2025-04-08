import { AriaPopoverProps } from 'react-aria';

export const setDirection = (placement: AriaPopoverProps['placement']) => {
  const defaultAnimation = {
    from: { opacity: 0, transform: 'translateY(-1rem)' },
    enter: { opacity: 1, transform: 'translateY(0rem)' },
    leave: {
      opacity: 0,
      transform: 'translateY(-1rem)',
      pointerEvents: 'none',
    },
  };

  if (placement?.includes('bottom right')) {
    return defaultAnimation;
  }

  if (placement?.includes('right')) {
    return {
      from: { opacity: 0, transform: 'translateX(-1rem)' },
      enter: { opacity: 1, transform: 'translateX(0rem)' },
      leave: {
        opacity: 0,
        transform: 'translateX(-1rem)',
        pointerEvents: 'none',
      },
    };
  }

  if (placement?.includes('left')) {
    return {
      from: { opacity: 0, transform: 'translateX(1rem)' },
      enter: { opacity: 1, transform: 'translateX(0rem)' },
      leave: {
        opacity: 0,
        transform: 'translateX(1rem)',
        pointerEvents: 'none',
      },
    };
  }

  if (placement?.includes('top')) {
    return defaultAnimation;
  }

  return defaultAnimation;
};
