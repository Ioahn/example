import { yupResolver } from '@hookform/resolvers/yup';
import { ReactNode } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RiArrowRightLine } from 'react-icons/ri';
import { object, string } from 'yup';
import { TBodySubscribeOnNewsletter } from '@shared/api';
import { Button, TextField } from '@shared/UI';
import { LOADING_STATES } from '@shared/constants';
import { sendSubscribeThunk, useSubscribeFormSlice } from './slice';

const resolver = object({
  email: string().required('Пожалуйста, заполните это обязательное поле'),
});

export function SubscribeForm() {
  const { control, handleSubmit, formState } = useForm({
    resolver: yupResolver(resolver),
  });

  const [{ loadingSubscribeForm }, request] = useSubscribeFormSlice();

  const onSubmit = (data: TBodySubscribeOnNewsletter) => {
    request(sendSubscribeThunk(data));
  };

  return (
    <div className='flex flex-col text-center gap-4 w-full'>
      <div className='flex flex-col text-center gap-4'>
        <h3 className='font-galaxy'>Подпишитесь на новости</h3>
        <p className='font-rock'>
          Узнавайте первыми о новых статьях от психотерапевтов и коучей Sense-A!
        </p>
      </div>
      <form
        className='flex items-center gap-4 max-md:flex-col w-full'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex-grow w-full'>
          <Controller
            name='email'
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                defaultValue={field.value}
                type='text'
                isRequired
                inputContainerClassName='bg-bg-secondary p-2 min-h-[3.25rem]'
                errorMessage={error?.message as ReactNode}
                onChange={field.onChange}
                placeholder='Ваш email'
              />
            )}
          />
        </div>

        <div className='max-md:w-full'>
          <Button
            endIcon={<RiArrowRightLine />}
            type='submit'
            className='max-md:max-w-none max-md:w-full'
            isDisabled={
              !formState.isValid ||
              loadingSubscribeForm === LOADING_STATES.SUCCESS
            }
            loaderState={loadingSubscribeForm}
          >
            Подписаться
          </Button>
        </div>
      </form>
    </div>
  );
}
