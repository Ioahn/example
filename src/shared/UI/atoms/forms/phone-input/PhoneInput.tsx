import dynamic from 'next/dynamic';
import React, { ComponentProps, ReactElement, forwardRef } from 'react';
import type { DefaultInputComponentProps } from 'react-phone-number-input/index';
import type {
  DefaultFormValues,
  Props as PhoneInputWithCountryProps,
} from 'react-phone-number-input/react-hook-form';
import { TextField } from '@shared/UI';
import { PhoneCountrySelect } from './PhoneCountrySelect';

type PhoneInputWithCountrySelectType = (
  props: PhoneInputWithCountryProps<IncompatibleType, IncompatibleType>
) => ReactElement;

const PhoneInputWithCountry = dynamic(
  () => import('react-phone-number-input/react-hook-form'),
  { ssr: false }
) as PhoneInputWithCountrySelectType;

type Props = PhoneInputWithCountryProps<
  DefaultInputComponentProps,
  DefaultFormValues
> &
  ComponentProps<typeof TextField>;

export const PhoneInput: FCC<Props> = React.memo(
  ({ label, errorMessage, ...rest }) => (
    <div className='flex flex-col gap-2'>
      {label && <div className='text-xs'>{label}</div>}
      <PhoneInputWithCountry
        inputComponent={forwardRef((props, ref) => (
          <TextField
            {...props}
            isDisabled={rest.isDisabled}
            ref={ref}
            className='max-w-[calc(100%-5rem)]'
            hasError={errorMessage}
          />
        ))}
        countrySelectComponent={(props) => (
          <PhoneCountrySelect {...props} disabled={rest.isDisabled} />
        )}
        numberInputProps={{
          placeholder: 'Номер телефона',
          'aria-label': 'Номер телефона',
        }}
        className='flex gap-2'
        fullWidth
        useNationalFormatForDefaultCountryValue={false}
        international
        {...rest}
      />
      {errorMessage && typeof errorMessage !== 'function' && (
        <div className='ml-2 text-xs text-content-accent-vivid'>
          {errorMessage}
        </div>
      )}
    </div>
  )
);
