import { FormProvider, useForm } from 'react-hook-form';
import {
  selectClientProfileSetting,
  selectSettings,
  selectTimezone,
  selectUpdateProfileLoadingState,
  sendClientUpdatedProfileData,
} from '@entities/models';
import { PersonalData, TelegramQR } from '@features/client';
import { CommonSettings } from '@features/specialist';
import { TGender } from '@shared/api';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, Container } from '@shared/UI';

export const ClientSettings = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector(selectClientProfileSetting);
  const { phone_number, email } = useAppSelector(selectSettings);
  const { updateProfileLoading } = useAppSelector(
    selectUpdateProfileLoadingState
  );
  const timeZone = useAppSelector(selectTimezone);

  const methods = useForm({
    defaultValues: {
      phone_number: phone_number,
      time_zone: timeZone,
      first_name: settings.first_name as unknown as string,
      last_name: settings.last_name as unknown as string,
      email: (email || '') as unknown as string,
      birth_year: settings.birth_year as unknown as number,
      gender: settings.gender || ('none' as unknown as TGender),
    },
  });

  const handleSubmit = (data: AnyObject) => {
    dispatch(sendClientUpdatedProfileData(data));
  };

  return (
    <Container className='grid grid-cols-6 gap-4 md:grid-cols-12'>
      <form
        className='col-span-6 flex flex-col gap-4 md:col-span-8 md:col-start-3'
        onSubmit={methods.handleSubmit(handleSubmit)}
      >
        <FormProvider {...methods}>
          <PersonalData />
          <TelegramQR />
          <CommonSettings />
        </FormProvider>

        <Button
          type='submit'
          className='self-end'
          loaderState={updateProfileLoading}
        >
          Сохранить
        </Button>
      </form>
    </Container>
  );
};
