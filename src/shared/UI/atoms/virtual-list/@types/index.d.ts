type TriggerProps = {
  hasMoreNext?: boolean;
  hasMorePrev?: boolean;
  rootRef: import('react').RefObject<Maybe<HTMLDivElement>>;
  onLoadTop?: () => void;
  onLoadBottom?: () => void;
};
