import { Controller, useFormContext } from 'react-hook-form';
import { Item } from 'react-stately';
import { getTimezoneOffset } from '@shared/utils';
import { Card, PhoneInput, Select, TextField } from '@shared/UI';
import { TIMEZONES } from '@shared/constants';

export const CommonSettings = () => {
  const { control } = useFormContext();

  return (
    <Card variant='secondary' className='flex flex-col gap-4'>
      <h2 className='font-semibold'>Контакты</h2>
      <PhoneInput
        control={control}
        name='phone_number'
        countries={['RU']}
        defaultCountry='RU'
        isDisabled
        rules={{ required: false }}
      />
      <Controller
        name='email'
        render={({ field }) => (
          <TextField
            label='Email'
            type='email'
            onInput={field.onChange}
            value={field.value}
          />
        )}
      />
      <Controller
        name='time_zone'
        render={({ field }) => (
          <Select
            items={TIMEZONES}
            defaultSelectedKey={field.value}
            onSelectionChange={field.onChange}
            variant='tertiary'
            label='Часовой пояс'
            className='w-full'
            buttonClassName='w-full max-w-none flex justify-between p-6 font-normal'
          >
            {(item) => {
              const { hours, minutes } = getTimezoneOffset(item.timezone);

              const positiveMinutes = Math.abs(minutes);
              const hoursStr = hours >= 0 ? `+${hours}` : `${hours}`;
              const minutesStr =
                positiveMinutes >= 10
                  ? `${positiveMinutes}`
                  : `0${positiveMinutes}`;

              return (
                <Item key={item.timezone} textValue={item.timezone}>
                  {item.ru_label} (GMT{hoursStr}:{minutesStr})
                </Item>
              );
            }}
          </Select>
        )}
      />
    </Card>
  );
};
