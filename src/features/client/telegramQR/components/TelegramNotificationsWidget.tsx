import { openSettings, selectProfileData } from '@entities/models';
import { TAccountType } from '@shared/api';
import { cn } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, Card, Image } from '@shared/UI';

export const TelegramNotificationsWidget = ({ className }: CommonProps) => {
  const dispatch = useAppDispatch();
  const { account_type } = useAppSelector(selectProfileData);

  return (
    <Card
      variant='secondary'
      className={cn(
        `grid grid-cols-3 grid-rows-[2fr_0.5fr] gap-4 md:[grid-template-areas:'text_text_image''button_button_image'] [grid-template-areas:'image_._.''text_text_text''button_button_button']`,
        className
      )}
    >
      <div className='flex flex-col gap-2 [grid-area:text]'>
        <p className='font-semibold max-md:text-2xs'>
          Подключите уведомления в Telegram
        </p>
        <p className='text-xs text-content-secondary'>
          и получайте сообщения о сессиях
        </p>
      </div>
      <div className='relative w-full aspect-h-1 aspect-w-1 [grid-area:image]'>
        <Image
          src='/Telegramm.png'
          alt='Telegramm'
          fill
          className='object-contain'
        />
      </div>
      <Button
        className='bg-[#65BCFF] enabled:hover:bg-[#65BCFF] active:bg-[#65BCFF] [grid-area:button]'
        onPress={() => dispatch(openSettings(account_type as TAccountType))}
      >
        Подключить
      </Button>
    </Card>
  );
};
