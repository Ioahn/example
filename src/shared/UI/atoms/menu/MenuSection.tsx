import { Node } from '@react-types/shared/src/collections';
import { useRef } from 'react';
import { mergeProps, useHover, useMenuSection, usePress } from 'react-aria';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { TreeState, useOverlayTriggerState } from 'react-stately';
import { useMedia } from 'react-use';
import { cn } from '@shared/utils';
import { MenuItem, Popover } from '@shared/UI';

type TMenuSection<T> = {
  state: TreeState<T>;
  section: Node<T>;
};

export const MenuSection = <T,>({ section, state }: TMenuSection<T>) => {
  const { itemProps, headingProps, groupProps } = useMenuSection({
    heading: section.rendered,
    'aria-label': section['aria-label'],
  });
  const toggleState = useOverlayTriggerState({});
  const triggerRef = useRef(null);

  const { hoverProps, isHovered } = useHover({
    onHoverStart: () => toggleState.open(),
    onHoverEnd: () => toggleState.close(),
  });

  const { pressProps, isPressed } = usePress({
    onPress: () => toggleState.open(),
  });

  const isDesktop = useMedia('(min-width: 640px)', false);

  return (
    <>
      <li
        {...itemProps}
        className={cn(
          'group cursor-pointer rounded-lg px-2 py-3 outline-none',
          {
            ['bg-bg-primary']: isPressed || isHovered || toggleState.isOpen,
          }
        )}
      >
        <div
          {...mergeProps(headingProps, pressProps, hoverProps)}
          ref={triggerRef}
          className='flex justify-between items-center gap-4'
        >
          {section.rendered}
          <RiArrowDropRightLine className='text-md text-content-tertiary' />
        </div>

        <Popover
          triggerRef={triggerRef}
          state={toggleState}
          placement={isDesktop ? 'right top' : undefined}
          offset={16}
          crossOffset={-16}
          className='overflow-visible'
        >
          <ul
            {...mergeProps(groupProps, hoverProps)}
            className='p-2 flex list-none flex-col relative gap-1 z-10 focus-visible:outline-none before:absolute before:-inset-8 before:-z-10'
          >
            {[...section.childNodes].map((node) => (
              <MenuItem key={node.key} item={node} state={state} />
            ))}
          </ul>
        </Popover>
      </li>
    </>
  );
};
