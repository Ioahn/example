import { PaymentMethod, TransactionList } from '@features/client';
import { Container } from '@shared/UI';

export const ClientPayment = () => {
  return (
    <Container className='grid grid-cols-6 gap-4 md:grid-cols-12'>
      <div className='col-span-6 md:mt-4 mt-2 flex items-center md:col-span-8 md:col-start-3'>
        <h1 className='font-semibold max-md:text-md sm:text-lg'>
          Списание и оплата
        </h1>
      </div>
      <div className='col-span-6 md:mt-4 mt-2 items-center md:col-span-8 md:col-start-3'>
        <PaymentMethod />
      </div>
      <div className='col-span-6 md:mt-4 mt-2 items-center md:col-span-8 md:col-start-3'>
        <TransactionList />
      </div>
    </Container>
  );
};
