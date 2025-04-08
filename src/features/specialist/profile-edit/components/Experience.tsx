import { ReactNode } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { MultiSelectWithTopics } from '@features/specialist';
import { TAreaType } from '@shared/api';
import { Card, MultiSelect, SelectWithOptions, TextArea } from '@shared/UI';

const WORKING_AREAS = [
  {
    value: TAreaType.EPsychotherapy,
    label: 'Психотерапия',
    type: TAreaType.EPsychotherapy,
  },
  {
    value: TAreaType.ECoaching,
    label: 'Коучинг',
    type: TAreaType.ECoaching,
  },
];

export const Experience = () => {
  const { control } = useFormContext();

  return (
    <Card variant='secondary' className='flex flex-col gap-4'>
      <h3 className='font-semibold  md:text-md'>Опыт работы</h3>
      <Controller
        name='working_areas'
        control={control}
        render={({ field, formState: { errors } }) => (
          <MultiSelect
            label='Профиль консультирования'
            placeholder='Выберите профиль'
            isRequired
            onChange={field.onChange}
            defaultValue={field.value}
            options={WORKING_AREAS}
            errorMessage={errors?.['working_areas']?.message as string}
          />
        )}
      />
      <Controller
        name='started_practice_year'
        control={control}
        render={({ field, formState: { errors } }) => (
          <SelectWithOptions
            onSelectionChange={field.onChange}
            defaultSelectedKey={`${field.value}`}
            label='Год начала практики'
            placeholder='Выберите год'
            buttonClassName='p-6 w-full max-w-none flex justify-between'
            isRequired
            type='year'
            onChange={field.onChange}
            errorMessage={
              errors?.['started_practice_year']?.message as ReactNode
            }
          />
        )}
      />
      <Controller
        name='specialization_title'
        control={control}
        render={({ field, formState: { errors } }) => (
          <TextArea
            label='Специализация'
            placeholder='Например: Психолог, психотерапевт, бизнес-консультант, коуч (как Вы сами себя идентифицируете в профессии)'
            defaultValue={field.value as unknown as string}
            isRequired
            onChange={field.onChange}
            maxLength={150}
            errorMessage={
              errors?.['specialization_title']?.message as ReactNode
            }
          />
        )}
      />
      <Controller
        name='about_me'
        control={control}
        render={({ field, formState: { errors } }) => (
          <TextArea
            label='О себе'
            placeholder='Например: Уже более 10 лет я помогаю индивидуальным клиентам и командам развиваться и преодолевать ограничения.'
            defaultValue={field.value as unknown as string}
            isRequired
            onChange={field.onChange}
            maxLength={2000}
            errorMessage={errors?.['about_me']?.message as ReactNode}
          />
        )}
      />
      <Controller
        name='topic_ids'
        control={control}
        render={({ field, formState: { errors } }) => (
          <MultiSelectWithTopics
            defaultValue={field.value}
            onChange={field.onChange}
            isRequired
            label='Выберите темы консультирования'
            placeholder='Темы с которыми вы работаете'
            errorMessage={errors?.['topic_ids']?.message as string}
          />
        )}
      />
    </Card>
  );
};
