import { useMemo } from 'react';
import { cn } from '@shared/utils';

const getValueFromObject = <T extends AnyObject>(object: T, key: string) => {
  return object[key] || '';
};
export const useButtonStyles = ({
  variant = 'primary',
  size = 'lg',
  fullWidth = false,
  as,
}: TButtonProps) => {
  const isClearVariant = variant === 'clear';

  const variants = useMemo(
    () => ({
      primary:
        'bg-bg-inverse-primary text-content-inverse active:bg-bg-inverse-primary enabled:hover:bg-content-primary enabled:hover:opacity-80 enabled:active:opacity-100 aria-pressed:opacity-100 disabled:opacity-50',
      secondary:
        'border border-transparent bg-bg-primary text-content-primary enabled:hover:bg-bg-tertiary aria-pressed:border-border-primary aria-pressed:border-border-primary enabled:active:border-border-primary aria-pressed:bg-bg-primary enabled:active:bg-bg-primary disabled:bg-bg-primary disabled:text-content-tertiary',
      tertiary:
        'border border-border-primary bg-transparent enabled:hover:bg-bg-tertiary aria-pressed:bg-bg-tertiary enabled:active:bg-bg-tertiary disabled:text-content-secondary',
      ghost:
        'bg-transparent enabled:hover:bg-bg-tertiary enabled:active:bg-transparent disabled:text-content-secondary',
    }),
    []
  );

  const sizes = useMemo(
    () => ({
      md: 'px-4 py-2 text-xs font-semibold rounded-2xl',
      lg: 'px-6 py-3 text-base font-semibold rounded-2xl',
      base: 'px-2 py-2 text-xs font-semibold rounded-full',
      sm: 'px-2 py-1 text-xs rounded-full',
      icon: 'p-3 font-semibold text-base rounded-2xl',
      'icon-sm': 'p-1 font-semibold text-base rounded-full',
    }),
    []
  );

  const variantStyles = getValueFromObject(variants, variant);
  const sizeStyles = getValueFromObject(sizes, size);

  return useMemo(
    () =>
      cn(
        'flex items-center gap-2 transition-all justify-center outline-none',
        as === 'link'
          ? 'block no-underline hover:no-underline text-center text-content-inherit'
          : '',
        variantStyles,
        !isClearVariant ? sizeStyles : '',
        fullWidth ? 'w-full' : 'max-w-fit'
      ),
    [variantStyles, isClearVariant, sizeStyles, fullWidth, as]
  );
};
