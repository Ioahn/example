import { wrapper } from '@app/store';
import { PaymentError } from '@shared/UI';

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  return {
    props: {},
  };
});

const FailurePayment = () => {
  return <PaymentError />;
};

export default FailurePayment;
