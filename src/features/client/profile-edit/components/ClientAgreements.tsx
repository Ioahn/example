import { Controller, useFormContext } from 'react-hook-form';
import { Card, Checkbox, Link } from '@shared/UI';
import { DOCS } from '@shared/constants';

export const ClientAgreements = () => {
  const { control } = useFormContext();

  return (
    <Card variant='secondary' className='flex flex-col gap-4'>
      <Controller
        control={control}
        name='privacy_policy'
        render={({ field }) => (
          <Checkbox
            value={field.value}
            onChange={field.onChange}
            aria-label='Условия пользовательского соглашения'
          >
            Принимаю условия{' '}
            <Link
              href={`/docs/${DOCS.Privacy_Policy}`}
              className='text-content-secondary underline'
              target='_blank'
            >
              Пользовательского соглашения
            </Link>{' '}
          </Checkbox>
        )}
      />

      <Controller
        control={control}
        name='mailings'
        render={({ field }) => (
          <Checkbox
            value={field.value}
            onChange={field.onChange}
            aria-label='Согласие на получение рассылок'
          >
            Даю{' '}
            <Link
              href={`/docs/${DOCS.Consent_for_Receiving_Advertising_Newsletters}`}
              className='text-content-secondary underline'
              target='_blank'
            >
              согласие
            </Link>{' '}
            на получение СМС-уведомлений
          </Checkbox>
        )}
      />
    </Card>
  );
};
