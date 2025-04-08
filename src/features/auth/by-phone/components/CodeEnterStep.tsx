import { type ReactNode, useCallback, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  selectCodeFromSmsLoaderState,
  sendPhoneAgain,
  sendSmsCode,
} from '@entities/models';
import { ButtonWithTimer } from '@features/auth';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, Card, DigitInput } from '@shared/UI';

const DIGIT_LENGTH = 4;

export const CodeEnterStep = () => {
  const { control, handleSubmit, formState, setError, reset } = useForm({
    defaultValues: {
      code: '',
    },
  });
  const dispatch = useAppDispatch();
  const { errorMessageWhenSendSms, sendCodeFromSmsLoading } = useAppSelector(
    selectCodeFromSmsLoaderState
  );

  const onSubmit = useCallback(
    ({ code }: { code: string }) => {
      dispatch(sendSmsCode(code));
    },
    [dispatch]
  );

  const onButtonTimerPress = () => {
    dispatch(sendPhoneAgain());

    reset();
  };

  useEffect(() => {
    setError('code', { message: errorMessageWhenSendSms as string });
  }, [errorMessageWhenSendSms, setError]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='flex flex-col items-stretch gap-8'
    >
      <Card variant='secondary'>
        <p className='mb-8 text-xs'>Введите проверочный код из SMS</p>
        <Controller
          control={control}
          name='code'
          render={({ field, fieldState: { error } }) => (
            <DigitInput
              length={DIGIT_LENGTH}
              value={field.value}
              onChange={field.onChange}
              className='w-full'
              errorMessage={error?.message as ReactNode}
            />
          )}
        />
      </Card>

      <div className='flex flex-col items-stretch gap-1'>
        <Button
          type='submit'
          fullWidth
          loaderState={sendCodeFromSmsLoading}
          isDisabled={!formState.isValid}
        >
          Подтвердить
        </Button>
        <ButtonWithTimer onPress={onButtonTimerPress}>
          Не пришел код? Отправить снова
        </ButtonWithTimer>
      </div>
    </form>
  );
};
