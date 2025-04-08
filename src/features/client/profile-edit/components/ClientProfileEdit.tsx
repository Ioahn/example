import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import {
  selectUpdateProfileLoadingState,
  sendClientUpdatedProfileData,
} from '@entities/models';
import {
  ClientAgreements,
  CommonInformation,
  profileEditValidateScheme,
} from '@features/client';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, Container } from '@shared/UI';
import { LOADING_STATES } from '@shared/constants';

export const ClientProfileEdit = () => {
  const methods = useForm({
    resolver: yupResolver(profileEditValidateScheme),
  });
  const dispatch = useAppDispatch();
  const { updateProfileLoading } = useAppSelector(
    selectUpdateProfileLoadingState
  );
  const sendClientInformation = (fields: AnyObject) => {
    dispatch(sendClientUpdatedProfileData(fields));
  };

  return (
    <Container className='grid h-full grid-cols-6 items-center sm:mt-9 sm:grid-cols-12'>
      <div className='col-span-6 col-start-1 sm:col-span-8 sm:col-start-3 md:col-span-6 md:col-start-4 lg:col-span-5 lg:col-start-5'>
        <h1 className='mb-5 text-lg font-semibold max-md:text-left max-md:text-md'>
          Профиль
        </h1>
        <form
          onSubmit={methods.handleSubmit(sendClientInformation)}
          className='flex flex-col gap-4'
        >
          <FormProvider {...methods}>
            <CommonInformation />
            <ClientAgreements />
            <Button
              type='submit'
              className='self-end'
              loaderState={updateProfileLoading}
              isDisabled={
                updateProfileLoading === LOADING_STATES.REJECTED ||
                !methods.formState.isValid
              }
            >
              Продолжить
            </Button>
          </FormProvider>
        </form>
      </div>
    </Container>
  );
};
