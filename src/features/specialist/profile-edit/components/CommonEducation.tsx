import { Controller, useFormContext } from 'react-hook-form';
import { FieldArray } from '@features/specialist/profile/components/FieldArray';
import { Card, SelectWithOptions, TextField } from '@shared/UI';

export const CommonEducation = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Card variant='secondary' className='flex flex-col gap-4'>
      <h3 className='font-semibold  md:text-md'>Образование</h3>
      <FieldArray
        name='education'
        withRemove
        template={{ name: undefined, year: undefined }}
        errorMessage={errors?.['education']?.message as string}
      >
        {(fields) =>
          fields.map((field, index) => (
            <div key={field.id} className='flex flex-col gap-4'>
              <Controller
                control={control}
                name={`education.${index}.name`}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    label='Учебное заведение'
                    placeholder='Введите учебное заведение'
                    type='text'
                    isRequired
                    maxLength={100}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name={`education.${index}.year`}
                control={control}
                render={({ field, fieldState }) => (
                  <SelectWithOptions
                    {...field}
                    onSelectionChange={field.onChange}
                    defaultSelectedKey={`${field.value}`}
                    label='Год окончания'
                    placeholder='Выберите год'
                    buttonClassName='p-6 w-full max-w-none flex justify-between'
                    isRequired
                    type='year'
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
            </div>
          ))
        }
      </FieldArray>
      <div className='h-4' />
      <h3 className='font-semibold  md:text-md'>Дополнительное образование</h3>
      <FieldArray
        name='additional_education'
        withRemove
        template={{ name: '', year: '' }}
        errorMessage={errors?.['additional_education']?.message as string}
      >
        {(fields) =>
          fields.map((field, index) => (
            <div key={field.id} className='flex flex-col gap-4'>
              <Controller
                control={control}
                name={`additional_education.${index}.name`}
                render={({ field, fieldState }) => (
                  <TextField
                    {...field}
                    defaultValue={field.value}
                    onChange={field.onChange}
                    label='Курс'
                    placeholder='Введите учебное заведение'
                    type='text'
                    maxLength={100}
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
              <Controller
                name={`additional_education.${index}.year`}
                control={control}
                render={({ field, fieldState }) => (
                  <SelectWithOptions
                    {...field}
                    onSelectionChange={field.onChange}
                    defaultSelectedKey={`${field.value}`}
                    label='Год окончания'
                    placeholder='Выберите год'
                    buttonClassName='p-6 w-full max-w-none flex justify-between'
                    type='year'
                    errorMessage={fieldState.error?.message}
                  />
                )}
              />
            </div>
          ))
        }
      </FieldArray>
    </Card>
  );
};
