import { boolean, number, object, string } from 'yup';

export const profileEditValidateScheme = object({
  first_name: string().required('Пожалуйста, заполните это обязательное поле'),
  birth_year: number().required('Пожалуйста, заполните это обязательное поле'),
  privacy_policy: boolean().oneOf([true]).required(),
  mailings: boolean().oneOf([true]).required(),
});
