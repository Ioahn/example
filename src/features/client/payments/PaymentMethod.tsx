import { RiEdit2Line } from 'react-icons/ri';
import { selectClientPayments } from '@entities/models';
import { EditPaymentInformation, OpenModalButton } from '@features/client';
import { useAppSelector } from '@shared/hooks';
import { Card, Image } from '@shared/UI';
import maestro from '@public/svg/Maestro.svg';

export const PaymentMethod = () => {
  const payment_method = useAppSelector(selectClientPayments);

  const { pan = '' } = payment_method || {};

  return (
    <Card variant='secondary' className='flex flex-col gap-8'>
      <h2 className='font-semibold text-md'>Способ оплаты</h2>
      <div className='flex items-center justify-between gap-4'>
        <div className='flex grow gap-2 p-4 border items-center border-content-secondary/10 rounded-xl'>
          <Image
            src={maestro}
            alt='credit card'
            width={16 * 4}
            height={16 * 4}
            className='object-contain w-14'
          />
          <div className='uppercase font-semibold text-content-secondary/50'>
            {pan}
          </div>
        </div>
        <OpenModalButton
          startIcon={<RiEdit2Line className='text-lg text-content-inverse' />}
          modalRender={() => <EditPaymentInformation />}
          withDot={false}
          variant='primary'
          className='enabled:bg-content-primary'
        />
      </div>
    </Card>
  );
};
