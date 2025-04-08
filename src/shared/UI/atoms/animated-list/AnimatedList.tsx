import { animated } from '@react-spring/web';
import { RefObject, useRef } from 'react';
import { mergeProps, useListBox } from 'react-aria';
import { mergeRefs } from 'react-merge-refs';
import { ListProps, useListState } from 'react-stately';
import { cn } from '@shared/utils';
import { useAnimatedUnderline, useTouchScroll } from '@shared/hooks';
import { Slot } from './Slot';

type Props<T extends AnyObject> = PropsWithClassNames &
  ListProps<T> & {
    orientation?: 'horizontal' | 'vertical';
    underlineClassName?: string;
  };

export const AnimatedList = function SlotList<T extends AnyObject>(
  props: Props<T>
) {
  const { className, orientation = 'horizontal', underlineClassName } = props;

  const state = useListState({
    ...props,
    selectionMode: 'single',
    disallowEmptySelection: true,
  });

  const ref = useRef(null);
  const { listBoxProps } = useListBox(
    { ...props, 'aria-label': 'animated-list' },
    state,
    ref
  );

  const { renderElements, containerRef, underlineProps } = useAnimatedUnderline(
    {
      activeElement: state.selectionManager.firstSelectedKey as string,
      items: [...state.collection],
    }
  );

  const touchProps = useTouchScroll(containerRef);

  const ulRef = mergeRefs([
    ref,
    containerRef,
  ]) as unknown as RefObject<HTMLUListElement>;

  return (
    <ul
      {...mergeProps(listBoxProps, touchProps)}
      ref={ulRef}
      className={cn(
        'relative overflow-hidden hide-scrollbar',
        {
          ['flex gap-4 overflow-x-auto py-1 -mx-1 px-1']:
            orientation === 'horizontal',
        },
        className
      )}
    >
      {renderElements((item, itemRef) => (
        <Slot
          key={item.key}
          state={state}
          item={item}
          ref={itemRef(item.key) as unknown as RefObject<HTMLLIElement>}
        />
      ))}
      <animated.div style={underlineProps} className={underlineClassName} />
    </ul>
  );
};
