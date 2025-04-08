import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { selectProfileLoading, sendUpdatedProfileData } from '@entities/models';
import {
  CommonEducation,
  CommonInformation,
  Experience,
  SpecialistAgreements,
  profileEditValidationScheme,
  specialistAgreementsScheme,
} from '@features/specialist';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, Container } from '@shared/UI';

export const SpecialistProfileEdit = () => {
  const methods = useForm({
    defaultValues: {
      education: [
        {
          name: undefined,
          year: undefined,
        },
      ],
    },
    resolver: yupResolver(
      profileEditValidationScheme.concat(specialistAgreementsScheme)
    ),
  });
  const dispatch = useAppDispatch();
  const loaderState = useAppSelector(selectProfileLoading);
  const onSubmit = (data: AnyObject) => dispatch(sendUpdatedProfileData(data));

  return (
    <Container className='grid grid-cols-6 md:grid-cols-12'>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className='col-span-6  flex flex-col gap-4 md:col-span-8 md:col-start-3'
      >
        <FormProvider {...methods}>
          <h1 className='text-lg font-semibold'>Заполните свой профиль</h1>
          <CommonInformation />
          <Experience />
          <CommonEducation />
          <SpecialistAgreements />
          <div className='flex items-center justify-between'>
            <Button variant='ghost'>Назад</Button>
            <Button type='submit' loaderState={loaderState}>
              Продолжить
            </Button>
          </div>
        </FormProvider>
      </form>
    </Container>
  );
};
