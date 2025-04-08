import NextLink, { LinkProps } from 'next/link';
import { forwardRef } from 'react';
import { AriaLinkOptions, useObjectRef } from 'react-aria';
import { cn } from '@shared/utils';
import { KeyboardFocus } from '@shared/UI';

export const Link = forwardRef<
  HTMLAnchorElement,
  ForwardProps<AriaLinkOptions & LinkProps>
>(({ className, children, ...rest }, linkRef) => {
  const ref = useObjectRef(linkRef);

  const { href } = rest;

  return (
    <KeyboardFocus>
      <NextLink
        className={cn(
          'rounded text-blue-400 hover:underline hover:underline-offset-1 outline-none',
          className
        )}
        href={href}
        ref={ref}
      >
        {children}
      </NextLink>
    </KeyboardFocus>
  );
});
