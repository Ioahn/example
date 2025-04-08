import { Controller, useFormContext } from 'react-hook-form';
import { CardCollapser, Checkbox, CheckboxGroup } from '@shared/UI';
import { RESET_KEY } from '@shared/constants';

type Props = {
  name: string;
  options: OptionButtonGroup[];
  title?: string;
};

export function SelectRequirement({ name, options, title }: Props) {
  const { control } = useFormContext();

  return (
    <CardCollapser title={title} variant='primary'>
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <CheckboxGroup
            className='flex flex-col gap-6'
            onChange={field.onChange}
            defaultValue={field.value}
            aria-label={title}
            resetKey={RESET_KEY}
          >
            {options.map(({ id, value, label }) => (
              <Checkbox key={id} value={value}>
                {label}
              </Checkbox>
            ))}
          </CheckboxGroup>
        )}
      />
    </CardCollapser>
  );
}
