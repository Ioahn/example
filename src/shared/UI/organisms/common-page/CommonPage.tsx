import { ComponentProps } from 'react';
import { useComponentMap } from '@shared/hooks';
import {
  BaseFooter,
  BaseHeader,
  HeaderWithOverlay,
  PrimaryHeader,
} from '@shared/UI';

type Props = {
  headerType?: 'primary' | 'base' | 'withOverlay';
  navigationProps?:
    | ComponentProps<typeof BaseHeader>
    | ComponentProps<typeof HeaderWithOverlay>
    | ComponentProps<typeof PrimaryHeader>;
};

export const CommonPage: FCC<Props> = ({
  children,
  headerType,
  navigationProps,
}) => {
  const Header = useComponentMap(
    {
      primary: PrimaryHeader,
      secondary: BaseHeader,
      withOverlay: HeaderWithOverlay,
      default: PrimaryHeader,
    },
    headerType
  );

  return (
    <div className='flex min-h-screen flex-col gap-4 bg-bg-primary'>
      <Header {...navigationProps} />
      <main className='flex-grow'>{children}</main>
      <BaseFooter />
    </div>
  );
};
