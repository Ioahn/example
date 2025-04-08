import { useDisableCarrotQuest } from '@shared/externals';
import { useMemo } from 'react';
import {
  openPublicSpecialistProfile,
  selectClientProfileArea,
  selectPrice,
  selectPurchaseSlotWithDate,
  selectSpecialist,
  selectTimezone,
} from '@entities/models';
import { InvoiceCard, Payment, Promocode } from '@features/client';
import { BackButton } from '@features/navigation-panel';
import { TAreaType } from '@shared/api';
import { assert, cn } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Card, CardSpecialistPreview, Container } from '@shared/UI';

export const Invoice = function Invoice() {
  useDisableCarrotQuest();

  const price = useAppSelector(selectPrice);
  const activeArea = useAppSelector(selectClientProfileArea);
  const slot = useAppSelector(selectPurchaseSlotWithDate);
  const timeZone = useAppSelector(selectTimezone);
  const specialist = useAppSelector(selectSpecialist);
  const dispatch = useAppDispatch();
  assert(specialist !== null, 'Specialist cannot be null');

  const { id, avatar_url, first_name, last_name, specialization_title } =
    specialist;

  const fullPrice = useMemo(() => {
    if (!price) {
      return null;
    }

    const { one_session_price, full_amount, discount_percent_value } = price;

    if (discount_percent_value) {
      return (
        <div className='flex gap-2'>
          <p
            className={cn({
              ['text-content-accent']: activeArea === TAreaType.EPsychotherapy,
              ['text-content-accent-vivid']: activeArea === TAreaType.ECoaching,
            })}
          >
            {full_amount}₽
          </p>{' '}
          <p className='line-through text-content-secondary'>
            {one_session_price}₽
          </p>
        </div>
      );
    }

    return <div>{full_amount}₽</div>;
  }, [price, activeArea]);

  if (!slot || !timeZone || !price) {
    return null;
  }

  return (
    <Container className='grid grid-cols-6 gap-y-4 gap-x-8 md:grid-cols-12 pt-4 items-stretch'>
      <div className='md:col-span-12 col-span-6 max-md:hidden'>
        <BackButton />
      </div>
      <div className='md:col-span-4 col-span-6 flex flex-col gap-4'>
        <CardSpecialistPreview
          firstName={first_name}
          lastName={last_name}
          avatarUrl={avatar_url}
          specializationTitle={specialization_title}
          onPress={() => dispatch(openPublicSpecialistProfile(id))}
        >
          <InvoiceCard
            fullPrice={fullPrice}
            area={activeArea as TAreaType}
            timeZone={timeZone}
            slotDate={slot.slot_date}
          />
        </CardSpecialistPreview>
        <Card className='bg-content-accent/20'>
          Сессия будет проходить на платформе по видеосвязи. Оповещение придет
          по <span className='font-semibold'>SMS</span> или в{' '}
          <span className='font-semibold'>Telegram</span> за 24 часа и за 1 час
          до начала сессии.
        </Card>

        <Card className='bg-content-accent-vivid/20'>
          Перенос сессий возможен не позднее чем{' '}
          <span className='font-semibold'>за 24 часа</span> до начала, при
          пропуске сессии средства не возмещаются.
        </Card>
      </div>
      <div className='md:col-span-8 col-span-6 flex flex-col gap-4'>
        <Promocode />
        <Payment />
      </div>
    </Container>
  );
};
