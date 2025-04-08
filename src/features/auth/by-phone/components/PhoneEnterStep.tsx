import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { object, string } from 'yup';
import {
  changeAreaAuth,
  selectAccountType,
  selectAuthByPhoneLoaderState,
  setPhoneNumber,
} from '@entities/models';
import { TAccountType } from '@shared/api';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, Card, Link, PhoneInput } from '@shared/UI';
import { DOCS } from '@shared/constants';

const phoneValidator = object().shape({
  phone_number: string()
    .required('Номер телефона не может быть пустым')
    .test('validate-phone-number', 'Номер телефона не действителен', (value) =>
      isValidPhoneNumber(value)
    ),
});

export const PhoneEnterStep = () => {
  const { control, handleSubmit, setError, formState } = useForm({
    defaultValues: {
      phone_number: '',
    },
    resolver: yupResolver(phoneValidator),
  });

  const account = useAppSelector(selectAccountType);
  const { authByPhoneLoading, errorMessageWhenSendPhone } = useAppSelector(
    selectAuthByPhoneLoaderState
  );

  const dispatch = useAppDispatch();
  const onSubmit = ({ phone_number }: { phone_number: string }) => {
    dispatch(setPhoneNumber(phone_number));
  };
  const onPress = useCallback(() => {
    if (account === TAccountType.EClient) {
      dispatch(changeAreaAuth(TAccountType.ESpecialist));
      return;
    }

    dispatch(changeAreaAuth(TAccountType.EClient));
  }, [account, dispatch]);

  useEffect(() => {
    setError('phone_number', { message: errorMessageWhenSendPhone as string });
  }, [errorMessageWhenSendPhone, setError]);

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-stretch gap-8'
      >
        <Card variant='secondary'>
          <p className='md:mb-8 mb-4 text-xs max-md:text-center'>
            Введите свой номер телефона и получите код подтверждения по SMS
          </p>
          <PhoneInput
            control={control as IncompatibleType}
            name='phone_number'
            defaultCountry='RU'
            errorMessage={formState.errors?.phone_number?.message}
          />
        </Card>
        <div className='flex flex-col items-stretch gap-1'>
          <Button
            type='submit'
            fullWidth
            className='max-md:text-xs'
            loaderState={authByPhoneLoading}
            isDisabled={!formState.isValid}
          >
            Получить код
          </Button>
          <Button
            variant='ghost'
            onPress={onPress}
            className='text-content-primary max-md:text-xs'
            fullWidth
          >
            {account === TAccountType.EClient
              ? 'Вход для специалистов'
              : 'Вход для клиентов'}
          </Button>
        </div>
        <div className='text-center text-xs text-content-secondary'>
          Нажимая «Получить код», Вы даете согласие на{' '}
          <Link
            href={
              account === TAccountType.EClient
                ? `/docs/${DOCS.Consent_for_Clients_Personal_Data_Processing}`
                : `/docs/${DOCS.Consent_for_Specialists_Personal_Data_Processing}`
            }
            className='text-content-secondary underline'
            target='_blank'
          >
            обработку персональных данных
          </Link>{' '}
          в соответствии с{' '}
          <Link
            href={`/docs/${DOCS.Privacy_Policy}`}
            className='text-content-secondary underline'
            target='_blank'
          >
            Политикой обработки персональных данных
          </Link>
        </div>
      </form>
    </>
  );
};
