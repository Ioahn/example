import { yupResolver } from '@hookform/resolvers/yup';
import { ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RiArrowRightLine } from 'react-icons/ri';
import { object, string } from 'yup';
import {
  sendRequestThunk,
  useRequestFormSlice,
} from '@features/landing/common/request-form/slice';
import { TB2BApplicationRequestSchema } from '@shared/api';
import {
  Button,
  Card,
  Checkbox,
  Container,
  Image,
  Link,
  TextField,
} from '@shared/UI';
import { LOADING_STATES } from '@shared/constants';

const resolver = object({
  name: string().required('Пожалуйста, заполните это обязательное поле'),
  email: string().required('Пожалуйста, заполните это обязательное поле'),
  phone_number: string().required(
    'Пожалуйста, заполните это обязательное поле'
  ),
  company_name: string().required(
    'Пожалуйста, заполните это обязательное поле'
  ),
});

export function RequestForm() {
  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(resolver),
  });

  const [{ loadingRequestForm }, request] = useRequestFormSlice();

  const onSubmit = (data: TB2BApplicationRequestSchema) => {
    request(sendRequestThunk(data));
  };

  return (
    <section id='business-request-form'>
      <Container type='landing'>
        <Card
          variant='secondary'
          className='bg-black text-content-inverse flex flex-col md:flex-row gap-4 md:p-14 px-4 py-8'
        >
          <div className='md:w-1/2 flex flex-col items-center text-center'>
            <h3 className='font-galaxy'>Оставьте заявку</h3>
            <div className='h-8 md:h-[3.75rem]' />
            <p className='font-rock'>
              Мы индивидуально подходим к потребностям бизнеса и знаем, что{' '}
              <span className='text-content-accent-vivid'>
                каждый случай — особенный.
              </span>
            </p>
            <div className='md:h-10 h-6' />
            <p className='font-base'>
              Оставьте заявку и вместе с командой экспертов мы составим{' '}
              <span className='text-content-accent'>
                индивидуальную программу
              </span>{' '}
              под ваши задачи.
            </p>
            <div className='md:h-10 h-6' />
            <div className='w-[400px] aspect-w-16 aspect-h-7 relative max-md:hidden'>
              <Image
                src='/landing/buisness/email-form.png'
                alt='email form'
                width={400}
                height={500}
                className='object-contain'
              />
            </div>
          </div>
          <div className='md:w-1/2 w-full relative'>
            <form
              className='flex flex-col gap-4 md:gap-2 text-xs justify-between h-full'
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name='name'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    defaultValue={field.value}
                    label='Имя'
                    type='text'
                    isRequired
                    className='w-full'
                    errorMessage={error?.message as ReactNode}
                    onChange={field.onChange}
                    variant='secondary'
                    inputClassName='text-content-inverse'
                  />
                )}
              />
              <Controller
                name='email'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    defaultValue={field.value}
                    label='Email'
                    type='text'
                    isRequired
                    className='w-full'
                    errorMessage={error?.message as ReactNode}
                    onChange={field.onChange}
                    variant='secondary'
                    inputClassName='text-content-inverse'
                  />
                )}
              />
              <Controller
                name='phone_number'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    label='Мобильный телефон'
                    isRequired
                    className='w-full'
                    errorMessage={error?.message as ReactNode}
                    onChange={field.onChange}
                    variant='secondary'
                    inputClassName='text-content-inverse'
                  />
                )}
              />
              <Controller
                name='company_name'
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    defaultValue={field.value}
                    label='Компания'
                    type='text'
                    isRequired
                    className='w-full'
                    errorMessage={error?.message as ReactNode}
                    onChange={field.onChange}
                    variant='secondary'
                    inputClassName='text-content-inverse'
                  />
                )}
              />
              <Controller
                name='name'
                control={control}
                render={({ field }) => (
                  <Checkbox
                    isRequired
                    value={field.value}
                    onChange={field.onChange}
                  >
                    Я подтверждаю{' '}
                    <Link
                      href='/docs/privacy-policy'
                      target='_blank'
                      className='text-inherit'
                    >
                      Политику приватности
                    </Link>
                  </Checkbox>
                )}
              />

              <div className='h-4 md:h-9' />

              <Button
                endIcon={<RiArrowRightLine />}
                variant='secondary'
                type='submit'
                className='max-md:max-w-none max-md:w-full'
                isDisabled={
                  !formState.isValid ||
                  loadingRequestForm === LOADING_STATES.SUCCESS
                }
                loaderState={loadingRequestForm}
              >
                Оставить заявку
              </Button>

              <div className='w-[255px] aspect-w-16 aspect-h-7 relative md:hidden self-center'>
                <Image
                  src='/landing/buisness/email-form.png'
                  alt='email form'
                  width={255}
                  height={300}
                  className='object-contain'
                />
              </div>
            </form>
          </div>
        </Card>
      </Container>
    </section>
  );
}
