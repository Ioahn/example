import dynamic from 'next/dynamic';
import { wrapper } from '@app/store';

const DynamicSuccessPaymentResult = dynamic(() =>
  import('@features/client').then(
    ({ SuccessPaymentResult }) => SuccessPaymentResult
  )
);

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  return {
    props: {},
  };
});

const SuccessPaymentResult = () => <DynamicSuccessPaymentResult />;

export default SuccessPaymentResult;
