import { animated, useTransition } from '@react-spring/web';
import React, { ReactElement } from 'react';
import { RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';
import { useStateList } from 'react-use';
import { cn } from '@shared/utils';
import { Button, Collapse } from '@shared/UI';

type ObjectWithId = { id: number | string } & AnyObject;

type Props<T extends ObjectWithId> = {
  className?: string;
  items: T[];
  children: (item: T) => ReactElement;
};

export const Carousel = function Carousel<T extends ObjectWithId>({
  className,
  items,
  children,
}: Props<T>) {
  const { state, prev, next } = useStateList(items);

  const transition = useTransition(state, {
    from: {
      opacity: 0,
    },
    enter: {
      opacity: 1,
    },
    leave: {
      opacity: 0,
      position: 'absolute',
    },
    initial: {
      opacity: 1,
    },
  });

  return (
    <div
      className={cn(
        'grid md:grid-cols-12 grid-cols-6 items-center gap-x-6 grid-flow-dense max-md:gap-y-4',
        className
      )}
    >
      <Button
        startIcon={
          <RiArrowLeftLine className='font-galaxy-semibold group-hover:text-content-accent transition-all flex-shrink-0' />
        }
        size='icon'
        className='rounded-full col-span-1 group max-md:col-start-5 bg-transparent'
        variant='ghost'
        onPress={prev}
      />
      <div className='md:col-span-10 col-span-6 relative max-md:-order-1'>
        <Collapse isOpen>
          {transition((style, item) => (
            <animated.div style={style} key={item.id}>
              {children(item)}
            </animated.div>
          ))}
        </Collapse>
      </div>
      <Button
        startIcon={
          <RiArrowRightLine className='font-galaxy-semibold group-hover:text-content-accent transition-all flex-shrink-0' />
        }
        size='icon'
        className='rounded-full col-span-1 max-md:col-start-6 group bg-transparent'
        variant='ghost'
        onPress={next}
      />
    </div>
  );
};
