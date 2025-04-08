import { createAction } from '@reduxjs/toolkit';
import { useDebounce } from 'react-use';
import { useAppDispatch } from '@shared/hooks/store-hooks';

export const onMountAppAction = createAction('APP_MOUNT');

export const useOnMountApp = () => {
  const dispatch = useAppDispatch();

  useDebounce(() => dispatch(onMountAppAction()), 300);
};
