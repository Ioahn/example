import { useEffect, useRef, useState } from 'react';
import { useIntersection } from 'react-use';
import { callFnByPredicates } from '@shared/utils';

type Props = {
  onVisible?: () => void;
  onHidden?: () => void;
};

export const OnFullyVisible: FCC<Props> = ({
  onHidden,
  onVisible,
  className,
  children,
}) => {
  const [isVisible, setVisibility] = useState(false);
  const intersectionRef = useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: '0px',
    threshold: 1,
  });

  useEffect(() => {
    if (!intersection?.intersectionRatio) {
      return;
    }

    callFnByPredicates([
      [
        [true, false, false],
        () => {
          onVisible?.();
          setVisibility(true);
        },
      ],
      [
        [false, true, true],
        () => {
          onHidden?.();
          setVisibility(false);
        },
      ],
    ])([
      intersection.intersectionRatio >= 1,
      intersection.intersectionRatio < 1,
      isVisible,
    ]);
  }, [intersection, isVisible, onHidden, onVisible]);

  return (
    <div ref={intersectionRef} className={className}>
      {children}
    </div>
  );
};
