import { AriaListBoxOptions } from '@react-aria/listbox';
import { RefObject, useRef } from 'react';
import { useListBox } from 'react-aria';
import { ListState } from 'react-stately';
import { Option } from './Option';

interface ListBoxProps extends AriaListBoxOptions<unknown> {
  listBoxRef?: RefObject<HTMLUListElement>;
  state: ListState<unknown>;
  width?: number;
}

export const ListBox = (props: ListBoxProps) => {
  const ref = useRef(null);
  const { listBoxRef = ref, state, width } = props;
  const { listBoxProps } = useListBox(props, state, listBoxRef);

  return (
    <ul
      {...listBoxProps}
      ref={listBoxRef}
      className='m-2 flex list-none flex-col gap-1 focus-visible:outline-none'
      style={{ ...(width && { width: `${width}px` }) }}
    >
      {[...state.collection].map((item) => (
        <Option key={item.key} item={item} state={state} />
      ))}
    </ul>
  );
};
