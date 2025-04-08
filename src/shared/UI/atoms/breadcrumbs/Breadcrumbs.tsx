import {
  Children,
  PropsWithChildren,
  ReactElement,
  cloneElement,
  useRef,
} from 'react';
import {
  AriaBreadcrumbItemProps,
  AriaBreadcrumbsProps,
  useBreadcrumbItem,
  useBreadcrumbs,
} from 'react-aria';
import { cn } from '@shared/utils';
import { useComponentMap } from '@shared/hooks';
import { Link } from '@shared/UI';

type Props = AriaBreadcrumbsProps & PropsWithChildren;

export const Breadcrumbs = function Breadcrumbs(props: Props) {
  const { navProps } = useBreadcrumbs(props);
  const childCount = Children.count(props.children);

  return (
    <nav {...navProps}>
      <ol className='flex gap-1'>
        {Children.map(props.children, (child, i) =>
          cloneElement(child as ReactElement, {
            isCurrent: i === childCount - 1,
          })
        )}
      </ol>
    </nav>
  );
};

export const BreadcrumbItem = function BreadcrumbItem(
  props: AriaBreadcrumbItemProps & PropsWithClassNames & { divider?: string }
) {
  const ref = useRef(null);
  const { itemProps } = useBreadcrumbItem(
    { ...props, elementType: 'span' },
    ref
  );

  const { divider = '/' } = props;

  const Component = useComponentMap(
    {
      span: 'span',
      link: Link,
      default: 'span',
    },
    props.href ? 'link' : 'span'
  );

  return (
    <li
      className={cn('flex gap-1 font-grain', props.className, {
        ['text-content-tertiary']: !props.isCurrent,
      })}
    >
      <Component
        {...itemProps}
        ref={ref}
        className={cn({
          ['text-content-tertiary']: !props.isCurrent,
        })}
      >
        {props.children}
      </Component>
      {!props.isCurrent && (
        <span aria-hidden='true' className=''>
          {divider}
        </span>
      )}
    </li>
  );
};
