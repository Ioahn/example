import { ListState } from '@react-stately/list';
import { createContext } from 'react';

export type ContextType = {
  state: ListState<unknown>;
  shouldFocusOnHover: boolean;
  shouldUseVirtualFocus: boolean;
};

export const VirtualListContext = createContext<Maybe<ContextType>>(null);
