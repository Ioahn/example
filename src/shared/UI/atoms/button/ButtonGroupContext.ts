import { CheckboxGroupState } from '@react-stately/checkbox';
import { createContext } from 'react';

export const ButtonGroupContext =
  createContext<Maybe<CheckboxGroupState>>(null);
