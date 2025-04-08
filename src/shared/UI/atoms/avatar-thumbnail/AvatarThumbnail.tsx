import { ReactElement, useMemo } from 'react';
import { usePress } from 'react-aria';
import { cn } from '@shared/utils';
import { AvatarImage } from '@shared/UI';

type Props = {
  img?: Maybe<string>;
  name: string;
  description?: string | ReactElement;
  size: 'md' | 'base' | 'sm' | 'lg';
  colors?: string[];
  onPress?: () => void;
};

const usePropsWithCond = <T extends AnyObject>(props: T, cond: boolean) => {
  return useMemo(() => {
    if (!cond) {
      return {} as T;
    }

    return props;
  }, [cond, props]);
};

export const AvatarThumbnail: FCC<Props> = ({
  img,
  colors,
  size = 'base',
  name,
  description,
  className,
  onPress,
}) => {
  const { pressProps = {} } = usePropsWithCond(
    usePress({ onPress }),
    !!onPress
  );

  return (
    <div className={cn('flex items-center gap-2', className)} {...pressProps}>
      <AvatarImage
        variant='round'
        size={size}
        name={name}
        colors={colors}
        src={img}
      />
      <div className='flex flex-col gap-1 w-full overflow-hidden'>
        <span
          className={cn(
            `min-w-0 font-semibold select-none whitespace-nowrap overflow-hidden [text-overflow:ellipsis] text-2xs`,
            {
              ['text-lg']: size === 'lg',
              ['text-xs']: size === 'base',
            }
          )}
        >
          {name}
        </span>
        {description && (
          <span
            className={cn(
              'overflow-wrap-anywhere text-content-tertiary text-2xs font-semibold',
              {
                ['font-normal text-xs']: size === 'base',
              }
            )}
          >
            {description}
          </span>
        )}
      </div>
    </div>
  );
};
