import { array, boolean, mixed, number, object, string } from 'yup';
import { TGender } from '@shared/api';

export const profileEditValidationScheme = object({
  avatar: mixed().required('Пожалуйста, добавьте обязательную фотографию'),
  first_name: string().required('Пожалуйста, заполните это обязательное поле'),
  last_name: string().required('Пожалуйста, заполните это обязательное поле'),
  middle_name: string().required('Пожалуйста, заполните это обязательное поле'),
  gender: string()
    .required('Пожалуйста, заполните это обязательное поле')
    .oneOf([TGender.EMale, TGender.EFemale]),
  birth_year: number().required('Пожалуйста, заполните это обязательное поле'),
  languages: array().required('Пожалуйста, заполните это обязательное поле'),
  working_areas: array().required(
    'Пожалуйста, заполните это обязательное поле'
  ),
  started_practice_year: number().required(
    'Пожалуйста, заполните это обязательное поле'
  ),
  specialization_title: string()
    .required('Пожалуйста, заполните это обязательное поле')
    .max(150, 'Максимальное количество символов - 150 знаков'),
  about_me: string()
    .required('Пожалуйста, заполните это обязательное поле')
    .max(2000, 'Максимальное количество символов - 2000 знаков'),
  topic_ids: array().required('Пожалуйста, заполните это обязательное поле'),
  education: array()
    .of(
      object({
        name: string()
          .required('Пожалуйста, заполните это обязательное поле')
          .max(100, 'Максимальное количество символов - 100 знаков'),
        year: number().required('Пожалуйста, заполните это обязательное поле'),
      })
    )
    .min(1, 'Пожалуйста, добавьте как минимум 1 образование'),
  additional_education: array().of(
    object({
      name: string()
        .required('Пожалуйста, заполните это обязательное поле')
        .max(100, 'Максимальное количество символов - 100 знаков'),
      year: number().required('Пожалуйста, заполните это обязательное поле'),
    })
  ),
});

export const specialistAgreementsScheme = object({
  mailings: boolean().oneOf([true]).required(),
});
