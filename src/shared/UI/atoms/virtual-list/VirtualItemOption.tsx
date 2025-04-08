import { isFocusVisible } from '@react-aria/interactions';
import React, { useContext, useRef } from 'react';
import { FocusRing, mergeProps, useHover, useOption } from 'react-aria';
import { Node } from 'react-stately';
import { cn } from '@shared/utils';
import { ContextType, VirtualListContext } from './VirtualListContext';

type Props<T> = {
  item: Node<T>;
};

export const VirtualItemOption = function VirtualItemOption<T>(
  props: Props<T>
) {
  const { item } = props;

  const { rendered, key } = item;
  const { state, shouldFocusOnHover, shouldUseVirtualFocus } = useContext(
    VirtualListContext
  ) as ContextType;

  const ref = useRef<HTMLDivElement>(null);

  const { optionProps, isSelected, isDisabled, isFocused } = useOption(
    {
      'aria-label': item['aria-label'],
      key,
    },
    state,
    ref
  );

  const { hoverProps, isHovered } = useHover({
    ...props,
    isDisabled,
  });

  const isKeyboardModality = isFocusVisible();

  return (
    <FocusRing>
      <div
        {...mergeProps(optionProps, shouldFocusOnHover ? {} : hoverProps)}
        ref={ref}
        className={cn('', {
          'is-focused':
            shouldUseVirtualFocus && isFocused && isKeyboardModality,
          'is-disabled': isDisabled,
          'is-selected': isSelected,
          'is-selectable': state.selectionManager.selectionMode !== 'none',
          'is-hovered':
            (isHovered && !shouldFocusOnHover) ||
            (isFocused && !isKeyboardModality),
        })}
      >
        {rendered}
      </div>
    </FocusRing>
  );
};
