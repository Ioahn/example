import { useContext } from 'react';
import { RemountContext } from './RemountContext';

export const useRemountComponent = () => {
  return useContext(RemountContext);
};
