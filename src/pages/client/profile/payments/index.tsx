import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { wrapper } from '@app/store';
import {
  getClientPaymentMethodThunkSSR,
  getClientTransactionsThunkSSR,
} from '@entities/models';
import { CommonPage } from '@shared/UI';

const DynamicClientPayment = dynamic(() =>
  import('@features/client').then(({ ClientPayment }) => ClientPayment)
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await Promise.all([
      store.dispatch(getClientPaymentMethodThunkSSR()),
      store.dispatch(getClientTransactionsThunkSSR()),
    ]);

    return { props: {} };
  }
);

const ClientPayment = () => {
  return <DynamicClientPayment />;
};

ClientPayment.getLayout = (page: ReactNode) => <CommonPage>{page}</CommonPage>;

export default ClientPayment;
