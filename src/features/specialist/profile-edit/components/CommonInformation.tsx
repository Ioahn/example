import { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { RadioWithOptions } from '@features/specialist';
import { TGender, TLanguage } from '@shared/api';
import {
  Card,
  FileUploadInput,
  MultiSelect,
  SelectWithOptions,
  TextField,
} from '@shared/UI';

const LANG_OPTIONS = [
  {
    value: TLanguage.ERu,
    label: 'Русский',
  },
  {
    value: TLanguage.EEn,
    label: 'Английский',
  },
];

export const CommonInformation = () => {
  const { control } = useFormContext();

  return (
    <Card variant='secondary' className='flex flex-col gap-4'>
      <Controller
        name='avatar'
        control={control}
        render={({ field, formState: { errors } }) => (
          <FileUploadInput
            {...field}
            label='Загрузить фото'
            description='Используйте фотографию, которая характеризует вас как специалиста'
            accept={{ 'image/*': ['.jpeg', '.png'] }}
            errorMessage={errors?.['avatar']?.message as ReactNode}
            maxFiles={1}
          />
        )}
      />
      <Controller
        name='first_name'
        control={control}
        render={({ field, formState: { errors } }) => (
          <TextField
            {...field}
            label='Имя'
            type='text'
            isRequired
            className='w-full md:w-2/3'
            errorMessage={errors?.['first_name']?.message as ReactNode}
          />
        )}
      />
      <Controller
        name='last_name'
        control={control}
        render={({ field, formState: { errors } }) => (
          <TextField
            {...field}
            label='Фамилия'
            type='text'
            isRequired
            className='w-full md:w-2/3'
            errorMessage={errors?.['last_name']?.message as ReactNode}
          />
        )}
      />
      <Controller
        name='middle_name'
        control={control}
        render={({ field, formState: { errors } }) => (
          <TextField
            {...field}
            label='Отчество'
            type='text'
            isRequired
            className='w-full md:w-2/3'
            errorMessage={errors?.['middle_name']?.message as ReactNode}
          />
        )}
      />
      <Controller
        name='gender'
        control={control}
        render={({ field, formState: { errors } }) => (
          <RadioWithOptions
            {...field}
            onChange={field.onChange}
            label='Пол'
            options={[
              { label: 'Мужской', value: TGender.EMale },
              { label: 'Женский', value: TGender.EFemale },
            ]}
            isRequired
            errorMessage={errors?.['gender']?.message as ReactNode}
          />
        )}
      />
      <Controller
        name='birth_year'
        control={control}
        render={({ field, formState: { errors } }) => (
          <SelectWithOptions
            {...field}
            onSelectionChange={field.onChange}
            defaultSelectedKey={`${field.value}`}
            label='Год рождения'
            placeholder='Выберите год'
            buttonClassName='p-6 w-full max-w-none flex justify-between'
            isRequired
            type='year'
            errorMessage={errors?.['birth_year']?.message as ReactNode}
          />
        )}
      />
      <Controller
        name='languages'
        control={control}
        render={({ field, formState: { errors } }) => (
          <MultiSelect
            {...field}
            label='Язык работы'
            placeholder='Введите язык'
            isRequired
            defaultValue={field.value}
            options={LANG_OPTIONS}
            errorMessage={errors?.['languages']?.message as string}
          />
        )}
      />
    </Card>
  );
};
