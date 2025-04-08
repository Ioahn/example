import { array, number, object, string } from 'yup';
import { TGender } from '@shared/api';

export const clientProfileValidationScheme = object({
  first_name: string().required('Пожалуйста, заполните это обязательное поле'),
  last_name: string().required('Пожалуйста, заполните это обязательное поле'),
  email: string().required('Пожалуйста, заполните это обязательное поле'),
  gender: string()
    .required('Пожалуйста, заполните это обязательное поле')
    .oneOf([TGender.EMale, TGender.EFemale]),
  birth_year: number().required('Пожалуйста, заполните это обязательное поле'),
  topics: array().required('Пожалуйста, заполните это обязательное поле'),
  phone_number: string().required(
    'Пожалуйста, заполните это обязательное поле'
  ),
  time_zone: string().required('Пожалуйста, заполните это обязательное поле'),
});
