import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import {
  openClientInvoice,
  openProfile,
  selectClientSpecialist,
  selectClientSpecialistSlot,
  selectFeedbackSelector,
  selectShortProfile,
  sendFeedback,
} from '@entities/models';
import { BookingSchedule, ShortSlotInformation } from '@features/client';
import { MobileButtonOverlay } from '@features/navigation-panel';
import { assert } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, Card, Container, Rating } from '@shared/UI';

const feedbackFormValidationScheme = object({
  video_quality_rating: string().required(
    'Пожалуйста, заполните это обязательное поле'
  ),
  overall_experience_rating: string().required(
    'Пожалуйста, заполните это обязательное поле'
  ),
});

export const Feedback = () => {
  const dispatch = useAppDispatch();
  const { feedbackLoadingState } = useAppSelector(selectFeedbackSelector);
  const slots = useAppSelector(selectClientSpecialistSlot);
  const { current_area } = useAppSelector(selectShortProfile);
  const specialist = useAppSelector(selectClientSpecialist);
  const { handleSubmit, control, formState } = useForm({
    resolver: yupResolver(feedbackFormValidationScheme),
  });

  const formSubmit = (formState: AnyObject) => {
    dispatch(sendFeedback(formState));
  };

  assert(!!specialist, 'Specialist cant be null');
  assert(!!current_area, 'Current area cant be null');

  return (
    <Container className='grid h-full grid-cols-6 items-center sm:mt-9 sm:grid-cols-12'>
      <div className='col-span-6 md:col-span-4'>
        <form onSubmit={handleSubmit(formSubmit)}>
          <Card variant='secondary' className='flex flex-col gap-6'>
            <Controller
              control={control}
              name='overall_experience_rating'
              render={({ field }) => (
                <Rating
                  label='Как прошла сессия?'
                  maxValue={5}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />

            <Controller
              control={control}
              name='video_quality_rating'
              render={({ field }) => (
                <Rating
                  label='Оцените качество связи'
                  maxValue={5}
                  onChange={field.onChange}
                  value={field.value}
                />
              )}
            />
          </Card>
          <div className='flex max-md:flex-col md:justify-between mt-4'>
            <Button
              variant='secondary'
              className='max-md:w-full max-md:max-w-full'
              onPress={() => dispatch(openProfile())}
            >
              Пропустить
            </Button>
            <Button
              type='submit'
              className='max-md:w-full max-md:max-w-full'
              isDisabled={!formState.isValid}
              loaderState={feedbackLoadingState}
            >
              Продолжить
            </Button>
          </div>
        </form>
      </div>
      <div className='col-span-6 md:col-span-8'>
        <BookingSchedule slots={slots} title='Запланируйте следующую сессию'>
          <MobileButtonOverlay>
            <div className='flex items-center'>
              <ShortSlotInformation className='md:hidden' />
              <Button
                fullWidth
                onPress={() =>
                  dispatch(
                    openClientInvoice({
                      id: specialist.id,
                      areaType: current_area,
                    })
                  )
                }
              >
                Далее
              </Button>
            </div>
          </MobileButtonOverlay>
        </BookingSchedule>
      </div>
    </Container>
  );
};
