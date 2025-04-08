import { AriaRadioProps } from '@react-types/radio';
import { ComponentProps } from 'react';
import { cn } from '@shared/utils';
import { RadioButton, RadioGroup } from '@shared/UI';

type Props = ComponentProps<typeof RadioGroup> & {
  options: {
    label: string;
    value: AriaRadioProps['value'];
  }[];
};

export const RadioWithOptions: FCC<Props> = ({
  options,
  className,
  ...rest
}) => {
  return (
    <RadioGroup {...rest}>
      <div className={cn('flex flex-col gap-4', className)}>
        {options.map(({ label, value }) => (
          <RadioButton
            key={label}
            value={value}
            aria-label={label}
            hasError={!!rest.errorMessage}
          >
            {label}
          </RadioButton>
        ))}
      </div>
    </RadioGroup>
  );
};
