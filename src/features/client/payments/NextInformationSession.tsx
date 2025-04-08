import {
  openClientProfile,
  openPublicSpecialistProfile,
  selectOrderState,
  selectTimezone,
} from '@entities/models';
import { InvoiceCard } from '@features/client';
import { TelegramNotificationsWidget } from '@features/client';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import {
  Button,
  Card,
  CardSpecialistPreview,
  CommonPage,
  Container,
} from '@shared/UI';

export function NextInformationSession() {
  const dispatch = useAppDispatch();
  const orderState = useAppSelector(selectOrderState);
  const timeZone = useAppSelector(selectTimezone);

  if (!orderState || !orderState?.purchase) {
    return;
  }

  const { specialist, area, scheduled_utc_date } = orderState.purchase;

  return (
    <CommonPage>
      <Container>
        <div className='grid md:grid-cols-12 grid-cols-6 gap-6'>
          <CardSpecialistPreview
            className='md:col-span-4 md:col-start-5 col-span-6'
            firstName={specialist.first_name}
            lastName={specialist.last_name}
            avatarUrl={specialist.avatar_url}
            specializationTitle={specialist.first_name}
            onPress={() =>
              dispatch(openPublicSpecialistProfile(specialist.id as string))
            }
          >
            <InvoiceCard
              area={area}
              timeZone={timeZone}
              slotDate={scheduled_utc_date}
            />
          </CardSpecialistPreview>
          <TelegramNotificationsWidget className='md:col-span-4 md:col-start-5 col-span-6' />

          <Card className='bg-content-accent/20 md:col-span-4 md:col-start-5 col-span-6'>
            Сессия будет проходить на платформе по видеосвязи. Оповещение придет
            по <span className='font-semibold'>SMS</span> или в{' '}
            <span className='font-semibold'>Telegram</span> за 24 часа и за 1
            час до начала сессии.
          </Card>

          <Card className='bg-content-accent-vivid/20 md:col-span-4 md:col-start-5 col-span-6'>
            Перенос сессий возможен не позднее чем{' '}
            <span className='font-semibold'>за 24 часа</span> до начала, при
            пропуске сессии средства не возмещаются.
          </Card>

          <Button
            className='md:col-span-4 md:col-start-5 col-span-6'
            fullWidth
            onPress={() => dispatch(openClientProfile())}
          >
            Перейти в личный кабинет
          </Button>
        </div>
      </Container>
    </CommonPage>
  );
}
