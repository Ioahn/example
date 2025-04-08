import { DOMAttributes, FocusableElement } from '@react-types/shared';
import { PlacementAxis } from 'react-aria';
import { cn } from '@shared/utils';

type Props = DOMAttributes<FocusableElement> & {
  placement: PlacementAxis | null;
};

export const PositioningArrow: FCC<Props> = function PositioningArrow({
  placement,
  ...props
}) {
  if (!placement) {
    return null;
  }

  return (
    <div
      {...props}
      className={cn(`absolute border-[0.5rem] border-transparent`, {
        [`left-0 -ml-[1rem] -mt-[0.5rem] border-r-[0.5rem] border-r-content-inverse`]:
          placement.includes('right'),
        [`right-0 -mr-[1rem] -mt-[0.5rem] border-l-[0.5rem] border-l-content-inverse`]:
          placement.includes('left'),
        [`top-0 -ml-[0.5rem] -mt-[1rem] border-b-[0.5rem] border-b-content-inverse`]:
          placement.includes('bottom'),
        [`bottom-0 -mb-[1rem] -ml-[0.5rem] border-t-[0.5rem] border-t-content-inverse`]:
          placement.includes('top'),
      })}
    />
  );
};
