import { cloneElement } from 'react';
import { FocusRing, FocusRingProps } from 'react-aria';
import { cn } from '@shared/utils';

export const KeyboardFocus = (props: FocusRingProps) => (
  <FocusRing
    {...props}
    focusRingClass='outline-offset-4 outline-content-tertiary/50'
  >
    {cloneElement(props.children, {
      className: cn(props?.children?.props?.className, 'outline-none'),
    })}
  </FocusRing>
);
