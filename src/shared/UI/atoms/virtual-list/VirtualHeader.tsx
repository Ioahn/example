import {
  VirtualizerItemOptions,
  useVirtualizerItem,
} from '@react-aria/virtualizer';
import { LayoutInfo } from '@react-stately/virtualizer';
import { ReactNode, useRef } from 'react';
import { useListBoxSection } from 'react-aria';
import { Node } from 'react-stately';

interface ListBoxSectionProps<T>
  extends Omit<VirtualizerItemOptions, 'ref' | 'layoutInfo'> {
  layoutInfo: LayoutInfo;
  item: Node<T>;
  children?: ReactNode;
}

export const VirtualHeader = function VirtualSection<T>(
  props: ListBoxSectionProps<T>
) {
  const { children, layoutInfo, virtualizer, item } = props;
  const { headingProps, itemProps } = useListBoxSection({
    heading: item.rendered,
    'aria-label': item['aria-label'],
  });

  const headerRef = useRef<HTMLDivElement | null>(null);

  useVirtualizerItem({
    layoutInfo,
    virtualizer,
    ref: headerRef,
  });

  return (
    <>
      <div {...headingProps} className='text-red-800'>
        <div {...itemProps}>{children}</div>
      </div>
    </>
  );
};
