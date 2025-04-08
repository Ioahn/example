import { VirtualizerItem } from '@react-aria/virtualizer';
import { useListState } from '@react-stately/list';
import { LayoutInfo, ReusableView } from '@react-stately/virtualizer';
import React, {
  ForwardedRef,
  ReactNode,
  forwardRef,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { FocusScope, useListBox, useObjectRef } from 'react-aria';
import { ListProps, Node } from 'react-stately';
import { cn } from '@shared/utils';
import { VirtualItemOption } from './VirtualItemOption';
import { VirtualListContext } from './VirtualListContext';
import { VirtualListLayout } from './VirtualListLayout';
import { VirtualSection } from './VirtualSection';
import { Virtualizer } from './Virtualizer';

type Props<T> = ListProps<T> &
  PropsWithClassNames & {
    items: T[];
    estimatedRowHeight?: number;
    isLoadingTop?: boolean;
    isLoadingBottom?: boolean;
    shouldFocusOnHover?: boolean;
    shouldUseVirtualFocus?: boolean;
    padding?: number;
    placeholderHeight?: number;
    loadingRenderWrapper?: (item: Node<T>) => ReactNode;
    placeholderRenderWrapper?: (item: Node<T>) => ReactNode;
    itemOptionRenderWrapper?: (item: Node<T>) => ReactNode;
    autoFocus?: boolean;
    onScroll?: () => void;
  };

export const VirtualList = forwardRef(function VirtualList<T extends AnyObject>(
  props: Props<T>,
  forwardRef: ForwardedRef<HTMLDivElement>
) {
  const {
    className,
    padding = 0,
    placeholderHeight = 0,
    estimatedRowHeight = 40,
    isLoadingTop,
    isLoadingBottom,
    autoFocus,
    shouldFocusOnHover = false,
    shouldUseVirtualFocus = false,
    onScroll,
    loadingRenderWrapper = defaultLoadingRenderWrapper,
    placeholderRenderWrapper = defaultPlaceholderRenderWrapper,
    itemOptionRenderWrapper = defaultItemRenderWrapper,
  } = props;

  const layout = useRef(
    new VirtualListLayout<T>({
      estimatedRowHeight,
      padding,
      placeholderHeight,
    })
  ).current;

  const state = useListState(props);
  const ref = useObjectRef(forwardRef);
  const { listBoxProps } = useListBox(
    {
      ...props,
      layoutDelegate: layout,
      isVirtualized: true,
    },
    state,
    ref
  );

  const layoutOptions = useMemo(
    () => ({
      isLoadingTop,
      isLoadingBottom,
    }),
    [isLoadingTop, isLoadingBottom]
  );

  const focusedKey = state.selectionManager.focusedKey;
  const persistedKeys = useMemo(
    () => (focusedKey != null ? new Set([focusedKey]) : null),
    [focusedKey]
  );

  const renderWrapper = useCallback(
    (
      parent: Maybe<ReusableView<AnyObject, ReactNode>>,
      reusableView: ReusableView<AnyObject, ReactNode>,
      children: ReusableView<AnyObject, ReactNode>[],
      renderChildren: (views: ReusableView<AnyObject, ReactNode>[]) => ReactNode
    ): ReactNode => {
      if (reusableView.viewType === 'section') {
        return (
          <VirtualSection
            key={reusableView.key}
            item={reusableView.content as Node<T>}
            layoutInfo={reusableView.layoutInfo!}
            headerLayoutInfo={
              children.find((c) => c.viewType === 'header')
                ?.layoutInfo as LayoutInfo
            }
            virtualizer={reusableView.virtualizer}
          >
            {renderChildren(children.filter((c) => c.viewType === 'item'))}
          </VirtualSection>
        );
      }

      return (
        <VirtualizerItem
          key={reusableView.key}
          layoutInfo={reusableView.layoutInfo!}
          virtualizer={reusableView.virtualizer}
          parent={parent?.layoutInfo}
        >
          {reusableView.rendered}
        </VirtualizerItem>
      );
    },
    []
  );

  return (
    <VirtualListContext.Provider
      value={{
        state,
        shouldFocusOnHover,
        shouldUseVirtualFocus,
      }}
    >
      <FocusScope>
        <Virtualizer
          {...listBoxProps}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          layout={layout}
          persistedKeys={persistedKeys}
          collection={state.collection}
          autoFocus={autoFocus}
          scrollDirection='vertical'
          ref={ref}
          layoutOptions={layoutOptions}
          onScroll={onScroll}
          renderWrapper={renderWrapper}
          className={cn(
            'list-none select-none block box-border w-full',
            className
          )}
        >
          {useCallback(
            (type, item) => {
              const Element = {
                ['loadingTop']: loadingRenderWrapper(item as Node<T>),
                ['loadingBottom']: loadingRenderWrapper(item as Node<T>),
                ['placeholder']: placeholderRenderWrapper(item as Node<T>),
                ['item']: itemOptionRenderWrapper(item as Node<T>),
              }[type];

              return Element || null;
            },
            [
              itemOptionRenderWrapper,
              loadingRenderWrapper,
              placeholderRenderWrapper,
            ]
          )}
        </Virtualizer>
      </FocusScope>
    </VirtualListContext.Provider>
  );
});

const defaultLoadingRenderWrapper = <T,>(item: Node<T>) => {
  console.log(item);
  return <div>Загрузка</div>;
};

const defaultPlaceholderRenderWrapper = <T,>(item: Node<T>) => {
  console.log(item);
  return <div>Пусто</div>;
};

const defaultItemRenderWrapper = <T,>(item: Node<T>) => {
  return <VirtualItemOption item={item} />;
};
