import { ComponentProps, useMemo } from 'react';
import { Item } from 'react-stately';
import { Select } from '@shared/UI';

type YearLabelValue = {
  value: string;
  label: string;
};

function generateYearList(startAge: number): YearLabelValue[] {
  const currentYear = new Date().getFullYear();
  const endYear = currentYear - startAge;
  const years: YearLabelValue[] = [];

  for (let year = endYear; year >= 1950; year--) {
    years.push({
      value: year.toString(),
      label: year.toString(),
    });
  }

  return years;
}

type Props = Omit<ComponentProps<typeof Select>, 'children'> & {
  type: string;
  onChange: (value: unknown) => void;
  defaultValue?: string;
};

export const SelectWithOptions: FCC<Props> = ({
  type,
  onChange,
  defaultValue,
  ...rest
}) => {
  const options = useMemo(() => {
    if (type === 'year') {
      return generateYearList(0);
    }
  }, [type]);

  return (
    <Select
      items={options}
      variant='tertiary'
      onSelectionChange={(value) => onChange(value)}
      defaultSelectedKey={`${defaultValue}`}
      buttonClassName='p-4'
      {...rest}
    >
      {({ label, value }) => (
        <Item key={label} textValue={value}>
          <div className='font-normal'>{label}</div>
        </Item>
      )}
    </Select>
  );
};
