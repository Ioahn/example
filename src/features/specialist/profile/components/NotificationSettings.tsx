import { Controller, useFormContext } from 'react-hook-form';
import { Card, Checkbox } from '@shared/UI';

export const NotificationSettings = () => {
  const { control } = useFormContext();

  return (
    <Card variant='secondary' className='flex flex-col gap-3'>
      <h2 className='font-semibold'>Уведомления</h2>
      <Controller
        control={control}
        name='session'
        render={({ field }) => (
          <Checkbox value={field.value} onChange={field.onChange} isDisabled>
            Запланированные сессии
          </Checkbox>
        )}
      />
      <Controller
        control={control}
        name='messages'
        render={({ field }) => (
          <Checkbox value={field.value} onChange={field.onChange}>
            Сообщения
          </Checkbox>
        )}
      />
      <p className='-mt-2 ml-9'>
        Изменение времени, сообщения специалиста, напоминания о списаниях
      </p>
      <Controller
        control={control}
        name='suggestions'
        render={({ field }) => (
          <Checkbox value={field.value} onChange={field.onChange}>
            Советы и предложения
          </Checkbox>
        )}
      />
      <p className='-mt-2 ml-9'>Только самые важные новости и предложения</p>
    </Card>
  );
};
