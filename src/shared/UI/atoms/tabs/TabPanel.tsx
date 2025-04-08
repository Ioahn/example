import { TabListState } from '@react-stately/tabs';
import { PropsWithChildren, useRef } from 'react';
import { useTabPanel } from 'react-aria';

type Props<T> = {
  state: TabListState<T>;
};
export const TabPanel = <T,>({
  state,
  children,
  ...props
}: Props<T> & PropsWithChildren) => {
  const ref = useRef(null);
  const { tabPanelProps } = useTabPanel(props, state, ref);

  return (
    <div {...tabPanelProps} ref={ref} className='outline-none'>
      {children}
    </div>
  );
};
