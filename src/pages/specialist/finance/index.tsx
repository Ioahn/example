import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { wrapper } from '@app/store';
import { getFinancesThunkSSR } from '@entities/models';
import { CommonPage } from '@shared/UI';

const DynamicFinance = dynamic(() =>
  import('@features/specialist').then(({ Finance }) => Finance)
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getFinancesThunkSSR());

    return { props: {} };
  }
);

const FinancePage = () => {
  return <DynamicFinance />;
};

FinancePage.getLayout = (page: ReactNode) => <CommonPage>{page}</CommonPage>;

export default FinancePage;
