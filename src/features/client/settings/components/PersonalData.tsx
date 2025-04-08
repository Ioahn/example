import { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { PictureUpload } from '@features/client';
import { RadioWithOptions } from '@features/specialist';
import { TGender } from '@shared/api';
import { Card, SelectWithOptions, TextField } from '@shared/UI';

export const PersonalData = () => {
  const { control } = useFormContext();

  return (
    <Card variant='secondary' className='flex flex-col gap-4'>
      <PictureUpload />
      <Controller
        name='first_name'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            defaultValue={field.value}
            label='Имя'
            type='text'
            isRequired
            className='w-full md:w-2/3'
            errorMessage={error?.message as ReactNode}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name='last_name'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <TextField
            defaultValue={field.value}
            label='Фамилия'
            type='text'
            className='w-full md:w-2/3'
            errorMessage={error?.message as ReactNode}
            onChange={field.onChange}
          />
        )}
      />
      <Controller
        name='gender'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <RadioWithOptions
            defaultValue={field.value}
            onChange={field.onChange}
            label='Пол'
            options={[
              { label: 'Не выбрано', value: 'none' },
              { label: 'Мужской', value: TGender.EMale },
              { label: 'Женский', value: TGender.EFemale },
            ]}
            errorMessage={error?.message as ReactNode}
            className='flex-row flex-wrap'
          />
        )}
      />
      <Controller
        name='birth_year'
        control={control}
        render={({ field, fieldState: { error } }) => (
          <SelectWithOptions
            defaultValue={`${field.value}`}
            onChange={field.onChange}
            onSelectionChange={field.onChange}
            defaultSelectedKey={`${field.value}`}
            label='Год рождения'
            placeholder='Выберите год'
            buttonClassName='p-6 w-full max-w-none flex justify-between'
            isRequired
            type='year'
            errorMessage={error?.message as ReactNode}
          />
        )}
      />
    </Card>
  );
};
