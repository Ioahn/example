import { RiErrorWarningLine } from 'react-icons/ri';
import { Button, Container } from '@shared/UI';

export const PaymentError = () => {
  return (
    <div className='bg-bg-primary'>
      <Container className='grid h-screen grid-cols-6 items-center sm:grid-cols-12'>
        <div className='col-span-6 flex flex-col gap-8 sm:col-span-4 sm:col-start-5 items-center'>
          <RiErrorWarningLine className='text-[12rem] text-content-error' />
          <h1 className='text-xl font-semibold'>Ошибка оплаты</h1>
          <p className='text-center text-content-secondary'>
            Транзакция не удалась. Мы не можем обработать этот платеж прямо
            сейчас.
          </p>
          <div className='flex flex-col gap-4 w-full'>
            <Button as='link' href='/client/profile/booking' fullWidth>
              Повторить попытку
            </Button>

            <Button
              as='link'
              href='/client/profile'
              variant='secondary'
              fullWidth
            >
              На главную
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};
