import { SeparatorProps, useSeparator } from 'react-aria';
import { cn } from '@shared/utils';

enum Orientation {
  HORIZONTAL = 'horizontal',

  VERTICAL = 'vertical',
}

export const Separator: FCC<SeparatorProps> = ({
  className,
  orientation = Orientation.HORIZONTAL,
  ...rest
}) => {
  const { separatorProps } = useSeparator({ ...rest, orientation });

  return (
    <div
      {...separatorProps}
      className={cn('bg-content-secondary', className, {
        ['w-full h-[1px]']: orientation === Orientation.HORIZONTAL,
        ['w-1 h-full']: orientation === Orientation.VERTICAL,
      })}
    />
  );
};
