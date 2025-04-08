import { ScrollView, VirtualizerItem } from '@react-aria/virtualizer';
import {
  Layout,
  Rect,
  ReusableView,
  useVirtualizerState,
} from '@react-stately/virtualizer';
import {
  ForwardedRef,
  HTMLAttributes,
  ReactNode,
  forwardRef,
  useCallback,
} from 'react';
import { mergeProps, useObjectRef } from 'react-aria';
import { Collection, Key } from 'react-stately';
import { assert } from '@shared/utils';
import { Trigger } from './Trigger';

export type RenderWrapper<T extends AnyObject, V> = (
  parent: Maybe<ReusableView<T, V>>,
  reusableView: ReusableView<T, V>,
  children: ReusableView<T, V>[],
  renderChildren: (views: ReusableView<T, V>[]) => ReactNode[]
) => ReactNode;

interface VirtualizerProps<T extends object, V, O>
  extends Omit<HTMLAttributes<HTMLElement>, 'children'> {
  children: (type: string, content: T) => V;
  renderWrapper?: RenderWrapper<T, V>;
  layout: Layout<T, O>;
  collection: Collection<T>;
  persistedKeys?: Set<Key> | null;
  collapsedKeys?: Set<Key> | null;
  scrollDirection?: 'horizontal' | 'vertical' | 'both';
  layoutOptions?: O;
  triggerProps?: TriggerProps;
}

export const Virtualizer = forwardRef(function Virtualizer<
  T extends AnyObject,
  V extends ReactNode,
  O,
>(props: VirtualizerProps<T, V, O>, ref: ForwardedRef<HTMLDivElement | null>) {
  const {
    children: renderView,
    renderWrapper,
    layout,
    collection,
    scrollDirection,
    persistedKeys,
    layoutOptions,
    triggerProps,
    ...otherProps
  } = props;

  const fallbackRef = useObjectRef<HTMLDivElement>(ref);

  const state = useVirtualizerState({
    layout,
    collection,
    renderView,
    onVisibleRectChange(rect) {
      assert(!!fallbackRef.current, 'onVisibleRectChange');

      fallbackRef.current.scrollLeft = rect.x;
      fallbackRef.current.scrollTop = rect.y;
    },
    persistedKeys,
    layoutOptions,
  });

  const onVisibleRectChange = useCallback(
    (rect: Rect) => {
      state.setVisibleRect(rect);
    },
    [state]
  );

  return (
    <ScrollView
      {...mergeProps(otherProps, { onVisibleRectChange })}
      ref={fallbackRef}
      contentSize={state.contentSize}
      onScrollStart={state.startScrolling}
      onScrollEnd={state.endScrolling}
      scrollDirection={scrollDirection}
    >
      <Trigger {...triggerProps} rootRef={fallbackRef}>
        {renderChildren(
          null,
          state.visibleViews,
          renderWrapper || defaultRenderWrapper
        )}
      </Trigger>
    </ScrollView>
  );
});

const renderChildren = <T extends object, V>(
  parent: Maybe<ReusableView<T, V>>,
  views: ReusableView<T, V>[],
  renderWrapper: RenderWrapper<T, V>
): ReactNode => {
  return views.map((view) => {
    return renderWrapper(
      parent,
      view,
      view.children ? Array.from(view.children) : [],
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      (childViews) => renderChildren(view, childViews, renderWrapper)
    );
  });
};

const defaultRenderWrapper = <T extends object, V extends ReactNode>(
  parent: Maybe<ReusableView<T, V>>,
  reusableView: ReusableView<T, V>
) => {
  return (
    <VirtualizerItem
      key={reusableView.key}
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      layoutInfo={reusableView.layoutInfo}
      virtualizer={reusableView.virtualizer}
      parent={parent?.layoutInfo}
    >
      {reusableView.rendered}
    </VirtualizerItem>
  );
};
