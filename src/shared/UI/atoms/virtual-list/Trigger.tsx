import { RefObject } from 'react';
import { useTrigger } from '@shared/hooks';

export type TriggerProps = {
  hasMoreNext?: boolean;
  hasMorePrev?: boolean;
  rootRef: RefObject<Maybe<HTMLDivElement>>;
  onLoadTop?: () => void;
  onLoadBottom?: () => void;
};

export const Trigger: FCC<TriggerProps> = function Trigger({
  children,
  hasMoreNext,
  onLoadTop,
  hasMorePrev,
  onLoadBottom,
  rootRef,
}) {
  const prevTriggerRef = useTrigger({
    trigger: onLoadTop,
    root: rootRef.current as unknown as HTMLElement,
    threshold: 30,
    watch: hasMorePrev,
  });

  const nextTriggerRef = useTrigger({
    trigger: onLoadBottom,
    root: rootRef.current as unknown as HTMLElement,
    threshold: 30,
    watch: hasMoreNext,
  });

  return (
    <>
      <div
        ref={prevTriggerRef}
        className='absolute top-0 w-full pointer-events-none'
      />
      {children}
      <div
        ref={nextTriggerRef}
        className='absolute bottom-0 w-full pointer-events-none'
      />
    </>
  );
};
