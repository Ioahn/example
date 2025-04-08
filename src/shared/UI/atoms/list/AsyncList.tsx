import { AriaListBoxOptions } from '@react-aria/listbox';
import { ReactNode, RefObject, useEffect, useMemo, useRef } from 'react';
import { AriaListBoxProps, useListBox } from 'react-aria';
import { useListState } from 'react-stately';
import { useMount } from 'react-use';
import { sideEffectTimer } from '@shared/utils';
import { useTrigger } from '@shared/hooks';
import { Loader } from '@shared/UI';
import { LOADING_STATES } from '@shared/constants';
import { ListOption } from './ListOptions';

const useAnchor = <T extends HTMLElement, U extends HTMLElement = HTMLElement>(
  root: RefObject<U>,
  observ: unknown
) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    if (root.current) {
      root.current.scrollTo({ top: root.current.scrollHeight });
    }

    const options: IntersectionObserverInit = {
      root: root.current,
      threshold: 0.1,
      rootMargin: '100px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          root.current?.scrollTo({ top: ref.current?.offsetTop });
        }
      });
    }, options);

    observer.observe(ref.current as HTMLElement);

    return () => observer.disconnect();
  }, [observ, root]);

  useMount(() => {
    if (!ref.current && !root.current) {
      return;
    }
    sideEffectTimer(
      () => root.current?.scrollTo({ top: ref.current?.offsetTop }),
      100
    );
  });

  return ref;
};

export const AsyncList = <T extends AnyObject>(
  props: AriaListBoxProps<T> &
    AriaListBoxOptions<T> &
    PropsWithClassNames & {
      withAnchor?: boolean;
      loadMore: () => void;
      order?: 'asc' | 'desc';
      topIsLoading?: boolean;
    }
) => {
  const state = useListState(props);

  const ref = useRef(null);
  const { listBoxProps } = useListBox(
    { 'aria-label': 'list', ...props },
    state,
    ref
  );

  const anchorRef = useAnchor<HTMLDivElement>(
    ref,
    (props.items as unknown[])?.length
  );

  const triggerRef = useTrigger({
    trigger: props.loadMore,
    root: ref.current as unknown as HTMLElement,
    threshold: 100,
    watch: !!(props.items as unknown[])?.length,
  });

  const [first, last]: [Maybe<ReactNode>, Maybe<ReactNode>] = useMemo(() => {
    let [first, last]: [Maybe<ReactNode>, Maybe<ReactNode>] = [
      <div ref={triggerRef} key='trigger' />,
      props.withAnchor ? <div ref={anchorRef} key='anchor' /> : null,
    ];

    if (props.order === 'desc') {
      [first, last] = [last, first];
    }

    return [first, last];
  }, [anchorRef, props.order, props.withAnchor, triggerRef]);

  return (
    <ul {...listBoxProps} ref={ref} className={props.className}>
      {first}
      {props.topIsLoading && (
        <Loader loadingState={LOADING_STATES.LOADING} className='w-full h-10' />
      )}
      {[...state.collection].map((item) => (
        <ListOption key={item.key} item={item} state={state} />
      ))}
      {last}
    </ul>
  );
};
