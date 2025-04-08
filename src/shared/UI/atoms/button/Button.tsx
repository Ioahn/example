import { ElementType } from 'react';
import { AriaButtonProps, useButton, useObjectRef } from 'react-aria';
import { useVibrate } from 'react-use';
import { cn } from '@shared/utils';
import { useComponentMap } from '@shared/hooks';
import { Link, Loader } from '@shared/UI';
import { LOADING_STATES } from '@shared/constants';
import { useButtonStyles } from './useButtonStyles';

export const Button = function Button<T extends ElementType = 'button'>({
  as = 'button',
  loaderState,
  ...props
}: TButtonProps & PropsWithClassNames & AriaButtonProps<T>) {
  const buttonRef = useObjectRef(props.buttonRef);
  const { className, children, startIcon, endIcon, href } = props;

  const Component = useComponentMap(
    {
      button: 'button',
      link: Link,
      default: 'button',
    },
    as
  );
  const { buttonProps, isPressed } = useButton(
    {
      ...props,
      isDisabled: props.isDisabled || loaderState === LOADING_STATES.LOADING,
      elementType: as,
    },
    buttonRef
  );

  const styles = useButtonStyles({ ...props, as });

  useVibrate(isPressed, [50], false);

  return (
    <Component
      {...buttonProps}
      className={cn(styles, className)}
      ref={buttonRef}
      aria-pressed={isPressed}
      href={href}
    >
      {startIcon}
      {loaderState === undefined ? (
        children
      ) : (
        <Loader loadingState={loaderState} fixedWidth className='flex-shrink-0'>
          {children}
        </Loader>
      )}
      {endIcon}
    </Component>
  );
};
