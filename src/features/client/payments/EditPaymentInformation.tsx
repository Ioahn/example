import { RiDeleteBin2Line, RiInformationFill } from 'react-icons/ri';
import { Item } from 'react-stately';
import {
  addNewPaymentMethod,
  removePaymentMethod,
  selectPaymentProcessLoadingState,
  selectProfileData,
} from '@entities/models';
import {
  ExistingPaymentMethod,
  NewPaymentMethod,
  SecureHandlerWrapper,
} from '@features/client';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, Link, Notify, Tabs } from '@shared/UI';

const RemovePaymentMethod = () => {
  const dispatch = useAppDispatch();
  return (
    <div className='flex flex-col gap-2'>
      <SecureHandlerWrapper notification='Вы уверены?'>
        <Button
          endIcon={<RiDeleteBin2Line className='text-lg' />}
          onPress={() => {
            dispatch(removePaymentMethod());
          }}
          className='bg-content-error enabled:hover:bg-content-error/80'
        >
          Удалить метод оплаты
        </Button>
      </SecureHandlerWrapper>
      <SecureHandlerWrapper notification='Вы уверены?'>
        <Button
          onPress={() => {
            dispatch(addNewPaymentMethod());
          }}
        >
          Изменить метод оплаты
        </Button>
      </SecureHandlerWrapper>
    </div>
  );
};

const AddPayment = () => {
  const dispatch = useAppDispatch();
  const { paymentLoadingState } = useAppSelector(
    selectPaymentProcessLoadingState
  );

  return (
    <div className='flex flex-col gap-4'>
      <Notify
        type='warning'
        renderIcon={
          <RiInformationFill className='fill-content-accent text-md' />
        }
        className='mb-2'
      >
        Для закрепления карты необходимо провести оплату в размере 10 рублей,
        которые будут возвращены немедленно.
      </Notify>
      <Notify
        type='info'
        renderIcon={
          <RiInformationFill className='fill-content-accent text-md' />
        }
        className='mb-2'
      >
        Мы храним вашу карту безопасно, читайте в{' '}
        <Link href='/' className='text-black' target='_blank'>
          Политике использования
        </Link>
        .
      </Notify>
      <Button
        fullWidth
        onPress={() => dispatch(addNewPaymentMethod())}
        loaderState={paymentLoadingState}
      >
        Добавить новую карту
      </Button>
    </div>
  );
};

export const EditPaymentInformation = () => {
  const { has_payment_method } = useAppSelector(selectProfileData);

  const tabs = [
    {
      id: 1,
      title: <ExistingPaymentMethod />,
      component: <RemovePaymentMethod />,
      show: has_payment_method,
    },
    {
      id: 2,
      title: <NewPaymentMethod />,
      component: <AddPayment />,
      show: true,
    },
  ].filter(({ show }) => show);

  return (
    <div className='flex flex-col gap-4 p-8'>
      <p className='md:text-lg text-md font-semibold'>
        Радактировать способ оплаты
      </p>
      <Tabs
        aria-label='edit payment method'
        items={tabs}
        variant='secondary'
        tabContainerClassName='mb-4'
        tabUnderlineClassName='rounded-md outline outline-[3px] outline-border-primary'
        defaultSelectedKey={2}
      >
        {({ id, title, component }) => (
          <Item key={id} title={title}>
            {component}
          </Item>
        )}
      </Tabs>
    </div>
  );
};
