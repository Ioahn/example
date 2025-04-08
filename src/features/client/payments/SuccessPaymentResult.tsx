import { useDebounce } from 'react-use';
import {
  checkOrderStatus,
  selectOrderCheckLoadingState,
} from '@entities/models';
import { CheckingPayment, NextInformationSession } from '@features/client';
import { useAppDispatch, useAppSelector, useComponentMap } from '@shared/hooks';
import { LOADING_STATES } from '@shared/constants';

export const SuccessPaymentResult = () => {
  const dispatch = useAppDispatch();
  const { orderCheckLoadingState } = useAppSelector(
    selectOrderCheckLoadingState
  );

  const Component = useComponentMap(
    {
      [LOADING_STATES.LOADING]: CheckingPayment,
      [LOADING_STATES.SUCCESS]: NextInformationSession,
      default: CheckingPayment,
    },
    orderCheckLoadingState
  );

  useDebounce(() => dispatch(checkOrderStatus()), 300);

  return <Component />;
};
