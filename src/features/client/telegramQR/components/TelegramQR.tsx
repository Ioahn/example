import { selectProfileData } from '@entities/models';
import {
  getTelegramQRCode,
  selectQrCodeAndUrlTelegram,
  selectTelegramQRLoadingStates,
} from '@features/client';
import { cn } from '@shared/utils';
import { useAppDispatch, useAppSelector, useComponentMap } from '@shared/hooks';
import { Button, Card, Collapse, Image, Link } from '@shared/UI';
import { LOADING_STATES } from '@shared/constants';

function TelegramQRView() {
  const { qrCodeLink, urlLink } = useAppSelector(selectQrCodeAndUrlTelegram);

  return (
    <div className='grid grid-cols-3 gap-6'>
      <div className='col-span-3 flex flex-col gap-2'>
        <h3 className='font-semibold'>Подключите уведомления в Telegram</h3>
        <p className='text-xs'>
          Отсканируйте QR-код или перейдите{' '}
          <Link href={urlLink}>по-ссылке</Link>
        </p>
      </div>
      <div className='md:col-span-1 col-span-3 w-full aspect-w-1 aspect-h-1'>
        <Image src={qrCodeLink} alt='telegramm qr-code' fill />
      </div>
    </div>
  );
}

function ConnectToTelegram() {
  const dispatch = useAppDispatch();

  return (
    <div className='grid grid-cols-3 md:grid-cols-[repeat(2,1fr)_min-content] gap-6'>
      <div className='md:col-span-2 col-span-3 flex flex-col gap-2'>
        <h3 className='font-semibold'>Подключите уведомления в Telegram</h3>
        <p className='text-xs'>и получайте сообщения о сессиях</p>
      </div>
      <div className='md:col-span-1 col-span-3 w-full'>
        <Button
          className='bg-[#65BCFF] enabled:hover:bg-[#65BCFF] active:bg-[#65BCFF] max-md:w-full max-md:max-w-none'
          onPress={() => dispatch(getTelegramQRCode())}
        >
          Подключить
        </Button>
      </div>
    </div>
  );
}

export function TelegramQR({ className }: CommonProps) {
  const { telegramLoaderState } = useAppSelector(selectTelegramQRLoadingStates);
  const { is_telegram_notifications_connected } =
    useAppSelector(selectProfileData);

  const Component = useComponentMap(
    {
      [LOADING_STATES.SUCCESS]: TelegramQRView,
      default: ConnectToTelegram,
    },
    telegramLoaderState
  );

  if (is_telegram_notifications_connected) {
    return null;
  }

  return (
    <Card variant='secondary' className={cn(className)}>
      <Collapse isOpen>
        <Component />
      </Collapse>
    </Card>
  );
}
