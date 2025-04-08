import { CheckboxGroupState } from '@react-stately/checkbox';
import { createContext } from 'react';

export const CheckboxContext = createContext<Maybe<CheckboxGroupState>>(null);
