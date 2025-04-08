import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useMemo } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { object, string } from 'yup';
import {
  resetPromoCodeLoadingState,
  selectClientProfileArea,
  selectPromoCodeLoadingState,
  selectPromocodeSession,
  setPromoCode,
} from '@entities/models';
import { TAreaType } from '@shared/api';
import { cn } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, Card, TextField } from '@shared/UI';
import { LOADING_STATES } from '@shared/constants';

const resolver = object().shape({
  promocode: string().required('Введите промокод'),
});

export const Promocode = function Promocode() {
  const dispatch = useAppDispatch();
  const activeArea = useAppSelector(selectClientProfileArea);
  const promocodeSession = useAppSelector(selectPromocodeSession);

  const { control, handleSubmit, formState, setError, watch } = useForm({
    resolver: yupResolver(resolver),
  });
  const { promoCodeLoadingState } = useAppSelector(selectPromoCodeLoadingState);

  const onSubmit = (data: { promocode?: string }) => {
    dispatch(setPromoCode(data.promocode as string));
  };

  const promocode = watch('promocode');

  useEffect(() => {
    if (promoCodeLoadingState === LOADING_STATES.REJECTED) {
      dispatch(resetPromoCodeLoadingState());
    }
  }, [promocode, dispatch]);

  const discount = useMemo(() => {
    if (!promocodeSession || !promocodeSession.discount_percent_value) {
      return null;
    }

    const { discount_percent_value } = promocodeSession;

    return (
      <div
        className={cn({
          ['text-content-accent']: activeArea === TAreaType.EPsychotherapy,
          ['text-content-accent-vivid']: activeArea === TAreaType.ECoaching,
        })}
      >
        -{discount_percent_value}%
      </div>
    );
  }, [promocodeSession, activeArea]);

  const message = useMemo(() => {
    if (promoCodeLoadingState === LOADING_STATES.REJECTED) {
      return <p className='text-xs text-content-error'>Неверный промокод</p>;
    }

    if (promoCodeLoadingState === LOADING_STATES.SUCCESS) {
      return (
        <p
          className={cn('text-xs', {
            ['text-content-accent']: activeArea === TAreaType.EPsychotherapy,
            ['text-content-accent-vivid']: activeArea === TAreaType.ECoaching,
          })}
        >
          Промокод применен
        </p>
      );
    }

    return null;
  }, [activeArea, promoCodeLoadingState]);

  useEffect(() => {
    if (promoCodeLoadingState === LOADING_STATES.REJECTED) {
      setError('promocode', { message: 'Неверный промокод' });
    }
  }, [promoCodeLoadingState, setError]);

  return (
    <Card className='flex flex-col gap-4' variant='secondary'>
      <h3 className='font-semibold'>Промокод</h3>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className='grid grid-cols-3 gap-3 md:grid-cols-[repeat(2,1fr)_min-content]'
      >
        <div className='xl:col-span-2 col-span-3'>
          <Controller
            control={control}
            name='promocode'
            render={({ field, fieldState: { error } }) => (
              <TextField
                inputContainerClassName='min-h-12'
                type='text'
                placeholder='Введите промокод'
                hasError={!!error?.message}
                autoComplete='off'
                onChange={field.onChange}
                endIcon={discount}
                isDisabled={promoCodeLoadingState == LOADING_STATES.SUCCESS}
              />
            )}
          />
        </div>
        <div className='xl:col-span-1 col-span-3 max-xl:row-start-3'>
          <Button
            type='submit'
            loaderState={promoCodeLoadingState}
            isDisabled={
              !formState.isValid ||
              promoCodeLoadingState == LOADING_STATES.SUCCESS
            }
            className={cn('min-h-12 flex-shrink-0', {
              ['bg-content-accent enabled:hover:bg-content-accent active:bg-content-accent']:
                activeArea === TAreaType.EPsychotherapy,
              ['bg-content-accent-vivid  enabled:hover:bg-content-accent-vivid active:bg-content-accent-vivid']:
                activeArea === TAreaType.ECoaching,
            })}
          >
            Применить
          </Button>
        </div>

        <div className='col-span-3'>{message}</div>
      </form>
    </Card>
  );
};
