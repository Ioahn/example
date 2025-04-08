import { animated, useTransition } from '@react-spring/web';
import { ReactElement, useMemo, useRef, useState } from 'react';
import { AriaTagGroupProps, useTagGroup } from 'react-aria';
import { useListState } from 'react-stately';
import { cn } from '@shared/utils';
import { useToggle } from '@shared/hooks';
import { Collapse } from '@shared/UI';
import { Tag } from './Tag';

type Props = PropsWithClassNames & {
  maxTags?: number;
  buttonRender?: (onClick: () => void) => ReactElement;
  buttonHide?: (onClick: () => void) => ReactElement;
};
export const TagGroup = <T extends AnyObject>(
  props: AriaTagGroupProps<T> & Props
) => {
  const {
    label,
    description,
    errorMessage,
    className,
    maxTags = 0,
    buttonRender,
    buttonHide,
  } = props;
  const ref = useRef<HTMLDivElement>(null);

  const state = useListState(props);
  const { gridProps, labelProps, descriptionProps, errorMessageProps } =
    useTagGroup(props, state, ref);

  const [isExpand, setIsExpand] = useToggle(!maxTags, (expanded) => {
    if (!ref.current) return;

    const { top, bottom } = ref.current.getBoundingClientRect();
    const isVisible = top >= 0 && bottom <= window.innerHeight;

    if (!expanded && !isVisible) {
      ref.current.scrollIntoView({
        behavior: 'auto',
        block: 'start',
      });
    }
  });

  const expandedTopics = useMemo(() => {
    const items = [...state.collection];

    return !isExpand && maxTags < items.length
      ? items.slice(0, maxTags)
      : items;
  }, [state, isExpand, maxTags]);

  const [transitionCompleted, setTransitionCompleted] = useState(true);

  const transition = useTransition(expandedTopics, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    initial: { opacity: 1 },
    trail: 15,
    onRest: () => setTransitionCompleted(true),
    onStart: () => setTransitionCompleted(false),
  });

  return (
    <div className={cn(className)}>
      <div {...labelProps}>{label}</div>
      <Collapse isOpen>
        <div
          {...gridProps}
          ref={ref}
          className={cn('flex flex-wrap items-center gap-2', className)}
        >
          {transition((styles, item) => (
            <animated.div key={item.key} style={styles}>
              <Tag item={item} state={state} />
            </animated.div>
          ))}
          {!isExpand &&
            maxTags < state.collection.size &&
            buttonRender?.(setIsExpand)}
          {isExpand && transitionCompleted && buttonHide?.(setIsExpand)}
        </div>
      </Collapse>
      {description && (
        <div {...descriptionProps} className='description'>
          {description}
        </div>
      )}
      {errorMessage && typeof errorMessage !== 'function' && (
        <div {...errorMessageProps} className='error-message'>
          {errorMessage}
        </div>
      )}
    </div>
  );
};
