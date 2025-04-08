import { Checkbox, CheckboxGroup } from '@shared/UI';

type Props = {
  options: {
    label: string;
    value: string;
  }[];
};
export const CheckboxWithOptions: FCC<Props> = ({ options, ...rest }) => {
  return (
    <CheckboxGroup {...rest}>
      <div className='flex items-center gap-4'>
        {options.map(({ label, value }) => (
          <Checkbox key={label} value={value} aria-label={label}>
            {label}
          </Checkbox>
        ))}
      </div>
    </CheckboxGroup>
  );
};
