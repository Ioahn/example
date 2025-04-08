import { yupResolver } from '@hookform/resolvers/yup';
import { ReactNode, useEffect } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { RiCloseLine } from 'react-icons/ri';
import {
  selectSpecialistLoaders,
  selectSpecialistUpdatedData,
  updatePrivateProfile,
} from '@entities/models';
import {
  MultiSelectWithTopics,
  RadioWithOptions,
  profileEditValidationScheme,
} from '@features/specialist';
import { FieldArray } from '@features/specialist/profile/components/FieldArray';
import { TAreaType, TGender, TLanguage } from '@shared/api';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import {
  Button,
  FileUploadInput,
  MultiSelect,
  SelectWithOptions,
  TextArea,
  TextField,
} from '@shared/UI';
import { LOADING_STATES } from '@shared/constants';

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

export const UpdateProfileForm = ({ onClose }: { onClose: () => void }) => {
  const {
    avatar_url,
    working_areas,
    specialization_title,
    first_name,
    middle_name,
    last_name,
    languages,
    topics,
    about_me,
    education,
    additional_education,
    gender,
    started_practice_year,
    birth_year,
  } = useAppSelector(selectSpecialistUpdatedData);
  const { updateSpecialistProfileLoader } = useAppSelector(
    selectSpecialistLoaders
  );

  const dispatch = useAppDispatch();
  const { control, ...rest } = useForm({
    defaultValues: {
      avatar: avatar_url as unknown as AnyObject,
      first_name: first_name as unknown as string,
      last_name: last_name as unknown as string,
      middle_name: middle_name as unknown as string,
      languages: LANG_OPTIONS.filter(({ value }) => languages?.includes(value)),
      gender: gender as TGender,
      birth_year: birth_year as unknown as number,
      started_practice_year: started_practice_year as unknown as number,
      working_areas: WORKING_AREAS.filter(({ value }) =>
        working_areas?.includes(value)
      ),
      education,
      additional_education,
      specialization_title: specialization_title as unknown as string,
      about_me: about_me as unknown as string,
      topic_ids: topics?.map(({ name, area, id }) => ({
        label: name,
        type: area,
        value: id,
      })),
    },
    resolver: yupResolver(profileEditValidationScheme),
  });

  const onHandleSubmit = (fields: AnyObject) => {
    dispatch(updatePrivateProfile(fields));
  };

  useEffect(() => {
    if (updateSpecialistProfileLoader === LOADING_STATES.SUCCESS) {
      onClose();
    }
  }, [dispatch, onClose, updateSpecialistProfileLoader]);

  return (
    <form
      className='flex h-full flex-col gap-4 overflow-y-scroll scroll-auto p-6'
      onSubmit={rest.handleSubmit(onHandleSubmit)}
    >
      <FormProvider {...rest} control={control}>
        <div className='flex justify-between items-start'>
          <h2 className='md:text-lg text-md font-semibold'>
            Редактирование профиля
          </h2>
          <Button
            variant='ghost'
            size='base'
            onPress={onClose}
            endIcon={<RiCloseLine className='text-md' />}
            className='rounded-full'
          />
        </div>
        <Controller
          name='avatar'
          control={control}
          render={({ field, formState: { errors } }) => (
            <FileUploadInput
              defaultValue={field.value as unknown as string}
              onChange={field.onChange}
              label='Загрузить фото'
              description='Используйте фотографию, которая характеризует вас как специалиста'
              accept={{ 'image/*': ['.jpeg', '.png'] }}
              maxFiles={1}
              ref={field.ref}
              errorMessage={errors?.['avatar']?.message as ReactNode}
            />
          )}
          rules={{ required: true }}
        />
        <Controller
          name='first_name'
          control={control}
          render={({ field, formState: { errors } }) => (
            <TextField
              defaultValue={field.value as unknown as string}
              onChange={field.onChange}
              label='Имя'
              type='text'
              isRequired
              errorMessage={errors?.['first_name']?.message as ReactNode}
            />
          )}
        />
        <Controller
          name='last_name'
          control={control}
          render={({ field, formState: { errors } }) => (
            <TextField
              defaultValue={field.value as unknown as string}
              onChange={field.onChange}
              label='Фамилия'
              type='text'
              isRequired
              errorMessage={errors?.['last_name']?.message as ReactNode}
            />
          )}
        />
        <Controller
          name='middle_name'
          control={control}
          render={({ field, formState: { errors } }) => (
            <TextField
              defaultValue={field.value as unknown as string}
              onChange={field.onChange}
              label='Отчество'
              type='text'
              isRequired
              errorMessage={errors?.['middle_name']?.message as ReactNode}
            />
          )}
        />
        <Controller
          name='gender'
          control={control}
          render={({ field, formState: { errors } }) => (
            <RadioWithOptions
              className='flex-row'
              defaultValue={field.value as unknown as string}
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
              onSelectionChange={field.onChange}
              defaultSelectedKey={`${field.value}`}
              label='Год рождения'
              placeholder='Выберите год'
              buttonClassName='p-6 w-full max-w-none flex justify-between'
              isRequired
              type='year'
              onChange={field.onChange}
              errorMessage={errors?.['birth_year']?.message as ReactNode}
            />
          )}
        />
        <Controller
          name='languages'
          control={control}
          render={({ field, formState: { errors } }) => (
            <MultiSelect
              label='Язык работы'
              placeholder='Введите язык'
              isRequired
              onChange={field.onChange}
              defaultValue={field.value}
              options={LANG_OPTIONS}
              errorMessage={errors?.['languages']?.message as string}
            />
          )}
        />
        <h3 className='mt-2 text-md font-semibold'>Опыт работы</h3>
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
              maxLength={200}
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
        <h3 className='mt-2 text-md font-semibold'>Образование</h3>
        <FieldArray
          name='education'
          withRemove
          template={{ name: undefined, year: undefined }}
          errorMessage={rest.formState.errors?.['education']?.message as string}
        >
          {(fields) =>
            fields.map((field, index) => (
              <div key={field.id} className='flex flex-col gap-4'>
                <Controller
                  control={control}
                  name={`education.${index}.name`}
                  render={({ field, fieldState }) => (
                    <TextField
                      defaultValue={field.value}
                      onChange={field.onChange}
                      label='Учебное заведение'
                      placeholder='Введите учебное заведение'
                      type='text'
                      isRequired
                      errorMessage={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  name={`education.${index}.year`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <SelectWithOptions
                      onSelectionChange={field.onChange}
                      defaultSelectedKey={`${field.value}`}
                      label='Год окончания'
                      placeholder='Выберите год'
                      buttonClassName='p-6 w-full max-w-none flex justify-between'
                      isRequired
                      type='year'
                      onChange={field.onChange}
                      errorMessage={fieldState.error?.message}
                    />
                  )}
                />
              </div>
            ))
          }
        </FieldArray>
        <h3 className='mt-2 font-semibold'>Дополнительное образование</h3>
        <FieldArray
          name='additional_education'
          template={{ name: undefined, year: undefined }}
          errorMessage={
            rest.formState.errors?.['additional_education']?.message as string
          }
          withRemove
        >
          {(fields) =>
            fields.map((field, index) => (
              <div key={field.id} className='flex flex-col gap-4'>
                <Controller
                  control={control}
                  name={`additional_education.${index}.name`}
                  render={({ field, fieldState }) => (
                    <TextField
                      defaultValue={field.value}
                      onChange={field.onChange}
                      label='Курс'
                      placeholder='Введите учебное заведение'
                      type='text'
                      isRequired
                      errorMessage={fieldState.error?.message}
                    />
                  )}
                />
                <Controller
                  name={`additional_education.${index}.year`}
                  control={control}
                  render={({ field, fieldState }) => (
                    <SelectWithOptions
                      onSelectionChange={field.onChange}
                      defaultSelectedKey={`${field.value}`}
                      label='Год окончания'
                      placeholder='Выберите год'
                      buttonClassName='p-6 w-full max-w-none flex justify-between'
                      type='year'
                      onChange={field.onChange}
                      isRequired
                      errorMessage={fieldState.error?.message}
                    />
                  )}
                />
              </div>
            ))
          }
        </FieldArray>
        <div className='mt-4 flex items-center justify-end'>
          <Button variant='ghost' onPress={onClose}>
            Отмена
          </Button>
          <Button
            type='submit'
            isDisabled={!rest.formState.isDirty}
            loaderState={updateSpecialistProfileLoader}
          >
            Применить
          </Button>
        </div>
      </FormProvider>
      <div className='max-md:min-h-[10rem]' />
    </form>
  );
};
