import {
  animated,
  useIsomorphicLayoutEffect,
  useTransition,
} from '@react-spring/web';
import { ReactElement, useMemo, useRef } from 'react';
import {
  RiAlarmWarningFill,
  RiCheckFill,
  RiCloseCircleFill,
  RiErrorWarningFill,
} from 'react-icons/ri';
import useMeasure from 'react-use-measure';
import { cn } from '@shared/utils';
import { useComponentMap, useToggle } from '@shared/hooks';
import { Button } from '@shared/UI';

type Props = {
  type?: 'warning' | 'info' | 'error';
  size?: 'base' | 'sm';
  renderIcon?: ReactElement;
  withCloseButton?: boolean;
};
export const Notify: FCC<Props> = ({
  children,
  renderIcon,
  className,
  type,
  withCloseButton = true,
  size = 'base',
}) => {
  const [isVisible, changeVisibility] = useToggle(true);
  const ref = useRef<HTMLDivElement>(null);
  const [getRef, { height }] = useMeasure();

  const classList = useMemo(
    () => ({
      'border border-content-accent bg-bg-quaternary': type === 'info',
      'bg-yellow-100 border': type === 'warning',
      'border border-content-error bg-content-error/10': type === 'error',
    }),
    [type]
  );

  const sizeClassList = useMemo(
    () => ({
      'px-4 py-5': size === 'base',
      'p-3': size === 'sm',
    }),
    [size]
  );

  const Icon = useComponentMap(
    {
      info: RiCheckFill,
      error: RiErrorWarningFill,
      warning: RiAlarmWarningFill,
      default: RiCheckFill,
    },
    type
  );

  const [transition, api] = useTransition(
    isVisible,
    {
      leave: {
        height: 0,
        opacity: 0,
      },
      enter: {
        opacity: 1,
      },
    },
    [height, isVisible]
  );

  useIsomorphicLayoutEffect(() => {
    if (!isVisible) {
      api.start({ height: 0, opacity: 0 });
    } else {
      height !== 0 && api.start({ height });
    }
  }, [isVisible, height]);

  return transition(
    (style, item) =>
      item && (
        <animated.div
          style={style}
          className={cn(
            'overflow-hidden rounded-2xl group',
            `notify-${type}`,
            classList,
            className
          )}
          ref={ref}
        >
          <div
            className={cn('flex items-start gap-4', sizeClassList)}
            ref={getRef}
          >
            {!renderIcon ? (
              <Icon className='fill-content-accent group-[.notify-error]:fill-content-error text-md shrink-0' />
            ) : (
              <span className='shrink-0'>{renderIcon}</span>
            )}
            <div>{children}</div>
            {withCloseButton && (
              <Button
                variant='clear'
                size='icon'
                className='ml-auto rounded-xl'
                onPress={changeVisibility}
                endIcon={
                  <RiCloseCircleFill className='text-md opacity-20 group-[.notify-error]:opacity-50' />
                }
              />
            )}
          </div>
        </animated.div>
      )
  );
};
