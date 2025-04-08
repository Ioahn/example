import type { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Card, SelectWithOptions, TextField } from '@shared/UI';

export const CommonInformation = () => {
  const { control } = useFormContext();

  return (
    <Card variant='secondary' className='flex flex-col gap-4'>
      <Controller
        control={control}
        name='first_name'
        render={({ field, fieldState: { error } }) => (
          <TextField
            label='Имя'
            type='text'
            isRequired
            placeholder='Введите ваше имя'
            errorMessage={error?.message as ReactNode}
            autoComplete='off'
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        control={control}
        name='birth_year'
        render={({ field, fieldState: { error } }) => (
          <SelectWithOptions
            type='year'
            label='Год рождения'
            placeholder='Выберите год'
            onSelectionChange={field.onChange}
            defaultSelectedKey={`${field.value}`}
            buttonClassName='p-6 sm:w-2/3 w-full max-w-none flex justify-between'
            errorMessage={error?.message as ReactNode}
            onChange={field.onChange}
            isRequired
          />
        )}
      />
    </Card>
  );
};
