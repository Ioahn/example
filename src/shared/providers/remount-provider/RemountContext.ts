import { createContext } from 'react';

export const RemountContext =
  createContext<Maybe<{ remountComponent: () => void }>>(null);
