import { FC, useEffect, useMemo, useState } from 'react';
import { Item } from 'react-stately';
import { Select } from '@shared/UI';

type IconComponent = {
  country: IncompatibleType;
  label: string;
};

type Props = {
  name: string;
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  options: { value?: string; label: string }[];
  iconComponent: FC<IconComponent>;
  disabled?: boolean;
  readOnly?: boolean;
  tabIndex?: number | string;
  className: string;
};

export const PhoneCountrySelect: FCC<Props> = ({
  iconComponent: IconComponent,
  name,
  options,
  onChange,
  ...rest
}) => {
  const [getCountryCode, setCountryCodeFn] = useState<AnyFunction>();

  const optionsWithKey = useMemo(
    () =>
      options
        .filter((el) => el.value)
        .map((option) => ({
          ...option,
          id: option.value,
        })),
    [options]
  );

  useEffect(() => {
    import('react-phone-number-input').then(({ getCountryCallingCode }) => {
      setCountryCodeFn(() => getCountryCallingCode);
    });
  }, []);

  return (
    <Select
      aria-label={name}
      items={optionsWithKey}
      defaultSelectedKey={rest.value}
      buttonClassName='h-full max-w-[6rem]  rounded-2xl border border-border-primary bg-transparent px-1 enabled:hover:bg-bg-tertiary enabled:active:bg-bg-tertiary disabled:text-content-secondary aria-pressed:bg-bg-tertiary'
      variant='clear'
      isDisabled={rest.disabled}
      key={rest.value}
      buttonChildren={
        <span className='flex items-center gap-1'>
          <span className='w-6 outline outline-1 outline-[#f5f5f5] rounded-sm'>
            {IconComponent && (
              <IconComponent country={rest.value} label={name} />
            )}
          </span>
        </span>
      }
      menuWidth={0}
      onSelectionChange={(id) => onChange(id as string)}
      placeholder={
        (
          <span className='flex items-center gap-1'>
            <span className='w-6'></span>
          </span>
        ) as unknown as string
      }
    >
      {(item) => (
        <Item key={item.id} textValue={item.label}>
          <span className='flex items-center gap-1'>
            <span className='w-6 flex-shrink-0 outline outline-1 outline-[#f5f5f5] rounded-sm'>
              {IconComponent && (
                <IconComponent country={item.id} label={item.label} />
              )}
            </span>
            <span>+{getCountryCode?.(item.value)}</span>
          </span>
        </Item>
      )}
    </Select>
  );
};
