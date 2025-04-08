import { zip } from 'ramda';
import React from 'react';
import { RiAddLine } from 'react-icons/ri';
import { Item } from 'react-stately';
import {
  buyProductBySavedMethod,
  buyProductByUrl,
  selectAgreement,
  selectClientPayments,
  selectClientProfileArea,
  selectPaymentProcessLoadingState,
  selectPrice,
  selectProfileData,
  selectPurchasedSlotsStatus,
  setAgreement,
} from '@entities/models';
import { MobileButtonOverlay } from '@features/navigation-panel';
import { TAreaType } from '@shared/api';
import { cn } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import {
  Button,
  Card,
  Checkbox,
  Collapse,
  Image,
  Link,
  Tabs,
} from '@shared/UI';
import { DOCS } from '@shared/constants';
import CommonCard from '@public/svg/CommonCard.svg';
import Mastercard from '@public/svg/Mastercard.svg';
import Mir from '@public/svg/Mir.svg';
import Visa from '@public/svg/Visa.svg';

const FirstPayment = () => {
  const dispatch = useAppDispatch();
  const isDirty = useAppSelector(selectPurchasedSlotsStatus);
  const { paymentLoadingState } = useAppSelector(
    selectPaymentProcessLoadingState
  );
  const agreement = useAppSelector(selectAgreement);
  const activeArea = useAppSelector(selectClientProfileArea);
  const price = useAppSelector(selectPrice);

  return (
    <div className='flex flex-col gap-8'>
      <Checkbox
        isSelected={agreement}
        value='agree'
        onChange={() => dispatch(setAgreement(!agreement))}
        className='items-start'
      >
        <div className='flex flex-col'>
          <p className='max-md:text-xs'>Сохранить карту</p>
          <p className='text-xs max-md:text-2xs'>
            Ваша карта будет хранится безопасно согласно{' '}
            <Link
              href={`/docs/${DOCS.Privacy_Policy}`}
              className='text-content-accent'
              target='_blank'
            >
              Политике использования
            </Link>
          </p>
        </div>
      </Checkbox>
      <MobileButtonOverlay>
        <Button
          fullWidth
          onPress={() => dispatch(buyProductByUrl())}
          isDisabled={!isDirty}
          loaderState={paymentLoadingState}
          className={cn({
            ['bg-content-accent enabled:hover:bg-content-accent active:bg-content-accent']:
              activeArea === TAreaType.EPsychotherapy,
            ['bg-content-accent-vivid  enabled:hover:bg-content-accent-vivid active:bg-content-accent-vivid']:
              activeArea === TAreaType.ECoaching,
          })}
        >
          <div className='flex flex-col'>
            <p>Перейти на оплату</p>
            <p className='md:hidden font-normal text-2xs'>
              {price?.full_amount}₽
            </p>
          </div>
        </Button>
      </MobileButtonOverlay>
    </div>
  );
};

const HasPayment = () => {
  const dispatch = useAppDispatch();
  const isDirty = useAppSelector(selectPurchasedSlotsStatus);
  const { paymentLoadingState } = useAppSelector(
    selectPaymentProcessLoadingState
  );
  const activeArea = useAppSelector(selectClientProfileArea);
  const price = useAppSelector(selectPrice);

  return (
    <div className='flex flex-col gap-8'>
      <MobileButtonOverlay>
        <Button
          fullWidth
          onPress={() => dispatch(buyProductBySavedMethod())}
          isDisabled={!isDirty}
          loaderState={paymentLoadingState}
          className={cn('max-md:p-2', {
            ['bg-content-accent enabled:hover:bg-content-accent active:bg-content-accent']:
              activeArea === TAreaType.EPsychotherapy,
            ['bg-content-accent-vivid  enabled:hover:bg-content-accent-vivid active:bg-content-accent-vivid']:
              activeArea === TAreaType.ECoaching,
          })}
        >
          <div className='flex flex-col'>
            <p>Оплатить</p>
            <p className='md:hidden font-normal text-2xs'>
              {price?.full_amount}₽
            </p>
          </div>
        </Button>
      </MobileButtonOverlay>
    </div>
  );
};

export const ExistingPaymentMethod = () => {
  const payment_method = useAppSelector(selectClientPayments);
  const pan = payment_method?.pan.slice(-4) || '0000';

  return (
    <div className='relative min-h-[40px] p-2 flex gap-1 outline outline-1 outline-border-primary rounded-md'>
      <Image
        src={CommonCard}
        width={33}
        alt='Common Card'
        className='shrink-0'
      />
      <p className='text-3xs font-semibold self-end'>...{pan}</p>
    </div>
  );
};

export const NewPaymentMethod = () => {
  return (
    <div className='min-h-[40px] w-16 relative p-1 rounded-md flex items-center justify-center gap-4 outline outline-1 outline-border-primary'>
      <RiAddLine className='text-lg text-content-secondary' />
    </div>
  );
};

const PaymentMethods = () => {
  const { has_payment_method } = useAppSelector(selectProfileData);

  const tabs = [
    {
      id: 1,
      title: <ExistingPaymentMethod />,
      component: <HasPayment />,
      show: has_payment_method,
    },
    {
      id: 2,
      title: <NewPaymentMethod />,
      component: <FirstPayment />,
      show: true,
    },
  ].filter(({ show }) => show);

  if (has_payment_method) {
    return (
      <Tabs
        aria-label='payment method'
        items={tabs}
        variant='secondary'
        tabContainerClassName='mb-4'
        tabUnderlineClassName='rounded-md outline outline-[3px] outline-border-primary'
        defaultSelectedKey={1}
      >
        {({ id, title, component }) => (
          <Item key={id} title={title}>
            {component}
          </Item>
        )}
      </Tabs>
    );
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex gap-2'>
        {zip(['Mastercard', 'Visa', 'Mir'], [Mastercard, Visa, Mir]).map(
          ([key, image]) => (
            <Image key={key} src={image} alt={key} width={66} />
          )
        )}
      </div>
      <FirstPayment />
    </div>
  );
};

export const Payment = () => {
  return (
    <Card variant='secondary' className='overflow-hidden'>
      <Collapse isOpen>
        <h2 className='md:text-md font-semibold mb-4'>Способы оплаты</h2>
        <PaymentMethods />
      </Collapse>
    </Card>
  );
};
