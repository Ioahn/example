import { Operation, PaymentStats } from '@features/specialist';
import { Container } from '@shared/UI';

export const Finance = () => {
  return (
    <Container className='mt-8 grid grid-cols-6 gap-4 sm:grid-cols-12'>
      <div className='col-span-6 mt-4 flex items-center justify-between md:col-span-8 md:col-start-3'>
        <h1 className='font-semibold max-md:text-md sm:text-lg'>
          Статистика и выплаты
        </h1>
      </div>
      <PaymentStats className='col-span-6 md:col-span-8 md:col-start-3' />
      <Operation className='col-span-6 md:col-span-8 md:col-start-3' />
    </Container>
  );
};
