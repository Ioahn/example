import contrast from 'contrast';
import initials from 'initials';
import { ReactNode, useMemo } from 'react';
import { cn } from '@shared/utils';
import { useComponentMap } from '@shared/hooks';
import { Image } from '@shared/UI';

type RoundedAvatarProps = {
  src?: Maybe<string>;
  colors?: string[];
  name: string;
  variant?: 'round';
  size: 'md' | 'base' | 'sm' | 'lg';
};

type SquareAvatarProps = {
  src?: string;
  colors?: string[];
  name: string;
  variant: 'square';
  aspectRatio: '4:3' | '1:1';
};

type AvatarImageProps = RoundedAvatarProps | SquareAvatarProps;

const defaultColors = [
  '#f3a683',
  '#f19066',
  '#574b90',
  '#f7d794',
  '#f5cd79',
  '#f8a5c2',
  '#f78fb3',
  '#e77f67',
  '#e15f41',
  '#ea8685',
  '#e66767',
  '#cf6a87',
  '#c44569',
  '#596275',
  '#303952',
];

const sumChars = (str: string) =>
  [...str].reduce((acc, char) => acc + char.charCodeAt(0), 0);

function SquareImage({
  src,
  aspectRatio,
  className,
  fallbackRender,
}: CommonProps<Pick<SquareAvatarProps, 'src' | 'aspectRatio'>> & {
  fallbackRender?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'w-full rounded-xl overflow-hidden',
        {
          ['aspect-w-1 aspect-h-1']: aspectRatio === '1:1',
          ['aspect-w-4 aspect-h-4']: aspectRatio === '4:3',
        },
        className
      )}
    >
      {src ? (
        <Image fill src={src} alt='user image' className='object-cover' />
      ) : (
        fallbackRender
      )}
    </div>
  );
}

function RoundedImage({
  src,
  size,
  className,
  fallbackRender,
}: CommonProps<Pick<RoundedAvatarProps, 'src' | 'size'>> & {
  fallbackRender?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'rounded-full overflow-hidden',
        {
          ['w-6 h-6']: size === 'sm',
          ['h-[3.75rem] w-[3.75rem']: size === 'base',
          ['w-11 h-11']: size === 'md',
          ['w-16 h-16']: size === 'lg',
        },
        className
      )}
    >
      {src ? (
        <Image fill src={src} alt='user image' className='object-cover' />
      ) : (
        fallbackRender
      )}
    </div>
  );
}

export function AvatarImage(props: CommonProps<AvatarImageProps>) {
  const {
    name,
    colors = defaultColors,
    variant = 'round',
    src,
    className,
  } = props;
  const abbr = initials(name).toUpperCase();

  const styles = useMemo(() => {
    const i = sumChars(name) % colors.length;
    return {
      ['--background-color']: colors[i],
    };
  }, [colors, name]);

  const ImageComponent = useComponentMap(
    {
      square: SquareImage,
      round: RoundedImage,
      default: RoundedImage,
    },
    variant
  );

  let aspectRatio, size;
  const theme = contrast(styles['--background-color']);

  if (variant === 'square') {
    aspectRatio = (props as SquareAvatarProps).aspectRatio;
  } else {
    size = (props as RoundedAvatarProps).size;
  }

  return (
    <div
      className={cn(
        'relative w-full',
        `theme-color-${theme}`,
        styles,
        className
      )}
    >
      <ImageComponent
        src={src}
        aspectRatio={aspectRatio}
        size={size}
        fallbackRender={
          <div
            className={cn(
              'absolute inset-0 font-semibold flex items-center justify-center bg-[var(--background-color)] group-[.theme-color-dark]:text-content-inverse group-[.theme-color-light]:text-content-primary',
              {
                ['text-2xs']: size === 'sm',
                ['text-xs']: size === 'base' || size === 'md',
                ['text-lg']: size === 'lg',
              }
            )}
          >
            {abbr}
          </div>
        }
      ></ImageComponent>
    </div>
  );
}
