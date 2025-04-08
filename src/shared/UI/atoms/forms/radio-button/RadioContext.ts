import { RadioGroupState } from '@react-stately/radio';
import { createContext } from 'react';

export const RadioContext = createContext<Maybe<RadioGroupState>>(null);
