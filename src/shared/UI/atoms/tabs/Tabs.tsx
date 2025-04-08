import { AriaTabListOptions } from '@react-aria/tabs';
import { animated, useSpring, useTransition } from '@react-spring/web';
import { TabListStateOptions } from '@react-stately/tabs';
import { ReactElement, useRef } from 'react';
import { useTabList } from 'react-aria';
import { mergeRefs } from 'react-merge-refs';
import { useTabListState } from 'react-stately';
import useMeasure from 'react-use-measure';
import { cn } from '@shared/utils';
import { useAnimatedUnderline } from '@shared/hooks';
import { Tab } from './Tab';
import { TabPanel } from './TabPanel';

type Props<T> = AriaTabListOptions<T> &
  TabListStateOptions<T> &
  PropsWithClassNames & {
    colorScheme?: string[];
    variant?: 'primary' | 'secondary';
    tabClassName?: string;
    tabUnderlineClassName?: string;
    tabContainerClassName?: string;
    additionalTab?: ReactElement;
  };

export const Tabs = <T extends AnyObject>({
  className,
  tabUnderlineClassName,
  tabClassName,
  tabContainerClassName,
  colorScheme = [],
  additionalTab,
  variant = 'primary',
  ...rest
}: Props<T>) => {
  const state = useTabListState(rest);
  const ref = useRef(null);
  const { tabListProps } = useTabList(rest, state, ref);
  const [contentRef, { height }] = useMeasure();

  const { renderElements, containerRef, underlineProps } = useAnimatedUnderline(
    {
      activeElement: state.selectedItem?.key,
      items: [...state.collection],
    }
  );

  const { backgroundColor } = useSpring({
    backgroundColor: colorScheme[state.selectedItem?.index || 0],
  });

  const underlineVariantProps =
    variant === 'primary'
      ? {
          left: underlineProps.left,
          width: underlineProps.width,
          backgroundColor,
        }
      : underlineProps;

  const transition = useTransition(state.selectedItem, {
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
    config: { tension: 500, friction: 80 },
  });

  return (
    <div className={cn('group', className)}>
      <div
        {...tabListProps}
        ref={mergeRefs([containerRef, ref])}
        className={cn(
          'relative  flex items-center gap-4 hide-scrollbar',
          {
            ['mb-2']: variant === 'primary',
            ['-m-1 overflow-y-scroll  p-1']: variant === 'secondary',
          },
          tabContainerClassName
        )}
      >
        {renderElements((item, itemRef) => (
          <div key={item.key} ref={itemRef(item.key)}>
            <Tab
              key={item.key}
              item={item}
              state={state}
              orientation={rest.orientation}
              className={cn(
                {
                  ['rounded-sm']: variant === 'primary',
                  ['rounded-xl !outline-offset-[7px]']: variant === 'secondary',
                },
                tabClassName
              )}
            />
          </div>
        ))}
        {additionalTab}
        <animated.div
          style={underlineVariantProps}
          className={cn(
            'absolute',
            {
              ['bottom-[-2px] h-[2px]']: variant === 'primary',
              ['border-1 pointer-events-none border border-border-active bg-transparent']:
                variant === 'secondary',
            },
            tabUnderlineClassName
          )}
        />
      </div>
      <div className='relative mt-5' style={{ minHeight: height }}>
        {transition((style, item) => (
          <animated.div
            style={{ ...style }}
            className='inset-0 top-0'
            key={item?.key}
          >
            <TabPanel state={state}>
              <div ref={contentRef}>{item?.props?.children}</div>
            </TabPanel>
          </animated.div>
        ))}
      </div>
    </div>
  );
};
