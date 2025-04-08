import { animated, useTransition } from '@react-spring/web';
import { useMetrica } from 'next-yandex-metrica';
import { ComponentProps, ReactElement, useEffect } from 'react';
import { useStateList } from 'react-use';
import { clearInterval, setInterval } from 'worker-timers';
import { VideoPreview } from '@features/landing';
import { cn } from '@shared/utils';
import { Button, Container, Image } from '@shared/UI';

type Props = {
  title: string | ReactElement;
  advantages?: { icon: string; description: string }[];
  video?: ComponentProps<typeof VideoPreview> | AnyObject;
  cta?: {
    title?: string;
    href?: string;
  };
  description?: string;
  withButton?: boolean;
};

export const CTABanner: FCC<Props> = ({
  children,
  title,
  advantages,
  cta = {},
  description,
  withButton = true,
  className,
}) => {
  const { reachGoal } = useMetrica();
  const { state, next } = useStateList(advantages);

  const transition = useTransition(state, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
    },
    initial: {
      opacity: 1,
    },
  });

  useEffect(() => {
    const id = setInterval(next, 5000);

    return () => clearInterval(id);
  }, []);

  return (
    <section
      className={cn(
        'group relative bg-bg-primary overflow-hidden -mt-20 pt-20'
      )}
    >
      <div className={cn('absolute inset-x-0 h-screen -top-20')}>
        <Image
          src='/BlurredStar.png'
          fill
          alt='sensea'
          className='object-cover'
          quality={99}
        />
      </div>
      <div className='md:h-20 h-24' />
      <Container
        className={cn(
          'relative grid md:grid-cols-12 grid-cols-6 gap-x-8',
          className
        )}
      >
        <div className='col-span-6 md:col-start-4 relative'>
          {transition((props, { description }) => (
            <animated.div
              key={description}
              style={props}
              className='absolute inset-0'
            >
              <p className='bg-bg-secondary/50 font-grain rounded-full px-4 py-2 text-center'>
                {description}
              </p>
            </animated.div>
          ))}
        </div>
        <div className='h-14 col-span-6 md:col-span-12' />
        <div className='md:col-span-12 col-span-6'>
          <h1 className='font-universe-semibold text-center'>{title}</h1>
        </div>
        <div className='md:col-span-12 col-span-6 h-6' />
        {description && (
          <div className='md:col-span-12 col-span-6'>
            <p className='font-rock text-center'>{description}</p>
          </div>
        )}
        <div className='md:col-span-12 col-span-6 h-10' />
        {withButton && (
          <div className='md:col-span-4 col-span-6 md:col-start-5'>
            <Button
              as='link'
              size='lg'
              href={cta.href}
              fullWidth
              onPress={() => reachGoal(`clicked-${cta.title}`)}
            >
              {cta.title}
            </Button>
          </div>
        )}
      </Container>
      <div className='md:h-[3.75rem] h-10' />
      {children}
      <div className='md:h-[3.75rem] h-10' />
    </section>
  );
};
