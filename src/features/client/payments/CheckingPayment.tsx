import { PaymentFinish, RotatingStar } from '@shared/UI';

export function CheckingPayment() {
  return (
    <PaymentFinish>
      <div className='absolute inset-0 flex items-center justify-center'>
        <div className='flex flex-col justify-center items-center text-center gap-6'>
          <div className='aspect-h-1 aspect-w-2 md:w-[260px] w-[170px]'>
            <RotatingStar />
          </div>
          <h2 className='text-xl font-semibold'>Проверяем оплату</h2>
          <p className='text-md text-content-secondary'>
            Это займет несколько секунд
          </p>
        </div>
      </div>
    </PaymentFinish>
  );
}
