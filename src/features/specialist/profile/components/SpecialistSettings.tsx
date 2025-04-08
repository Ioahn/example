import { FormProvider, useForm } from 'react-hook-form';
import {
  applySettings,
  selectSettings,
  selectTimezone,
} from '@entities/models';
import { CommonSettings } from '@features/specialist';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, Container } from '@shared/UI';

export const SpecialistSettings = () => {
  const dispatch = useAppDispatch();
  const { phone_number, email } = useAppSelector(selectSettings);
  const timeZone = useAppSelector(selectTimezone);
  const methods = useForm({
    defaultValues: {
      // TODO без префикса подкидывать или изменить в компоненте
      phone_number: phone_number,
      time_zone: timeZone,
      email,
    },
  });

  const handleSubmit = ({
    time_zone,
    email,
  }: {
    time_zone: string;
    email: string;
  }) => {
    dispatch(applySettings({ time_zone, email }));
  };

  return (
    <Container className='grid grid-cols-6 gap-4 md:grid-cols-12'>
      <div className='col-span-6 mt-4 flex items-center justify-between md:col-span-8 md:col-start-3'>
        <h1 className='font-semibold max-md:text-md sm:text-lg'>Настройки</h1>
      </div>
      <form
        className='col-span-6 flex flex-col gap-4 md:col-span-8 md:col-start-3'
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <FormProvider {...methods}>
          <CommonSettings />
        </FormProvider>

        <Button type='submit' className='self-end'>
          Сохранить
        </Button>
      </form>
    </Container>
  );
};
