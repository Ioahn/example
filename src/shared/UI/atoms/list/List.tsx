import { AriaListBoxOptions } from '@react-aria/listbox';
import { ForwardedRef, ReactNode, forwardRef } from 'react';
import { AriaListBoxProps, useListBox, useObjectRef } from 'react-aria';
import { useListState } from 'react-stately';
import { ListOption } from '@shared/UI';

type ListProps<T> = AriaListBoxProps<T> &
  AriaListBoxOptions<T> &
  PropsWithClassNames & { listClassNames?: string };

function ListInner<T extends AnyObject>(
  props: ListProps<T>,
  ref: ForwardedRef<HTMLUListElement>
) {
  const state = useListState(props);

  const localRef = useObjectRef(ref);
  const { listBoxProps } = useListBox(
    { 'aria-label': 'list', ...props },
    state,
    localRef
  );

  return (
    <ul {...listBoxProps} ref={localRef} className={props.className}>
      {[...state.collection].map((item) => (
        <ListOption
          key={item.key}
          item={item}
          state={state}
          className={props.listClassNames}
        />
      ))}
    </ul>
  );
}

export const List = forwardRef(ListInner) as <T extends AnyObject>(
  props: ListProps<T> & { ref?: ForwardedRef<HTMLUListElement> }
) => ReactNode;
