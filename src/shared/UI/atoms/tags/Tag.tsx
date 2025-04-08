import { ListState } from '@react-stately/list';
import { useRef } from 'react';
import { AriaTagProps, useTag } from 'react-aria';
import { KeyboardFocus } from '@shared/UI';

interface TagProps<T> extends AriaTagProps<T> {
  state: ListState<T>;
}

export const Tag = <T,>(props: TagProps<T>) => {
  const { item, state } = props;
  const ref = useRef(null);
  const { rowProps, gridCellProps } = useTag(props, state, ref);

  return (
    <KeyboardFocus within>
      <div ref={ref} {...rowProps} className='rounded-sm'>
        <div {...gridCellProps}>{item.rendered}</div>
      </div>
    </KeyboardFocus>
  );
};
