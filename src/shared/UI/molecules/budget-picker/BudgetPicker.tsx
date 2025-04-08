import { CardCollapser, RangePicker } from '@shared/UI';

type Props = CommonProps & {
  category: string;
  onChange: (arg: number[]) => void;
  maxValue?: number;
  minValue?: number;
  defaultValue?: number[];
  label?: string;
  variant?: CardProps['variant'];
};

export function BudgetPicker({
  className,
  category,
  onChange,
  label,
  minValue = 0,
  maxValue = 100000,
  defaultValue = [0, 100000],
  variant,
}: Props) {
  return (
    <CardCollapser title={category} className={className} variant={variant}>
      <RangePicker
        label={label}
        formatOptions={{
          style: 'currency',
          currency: 'RUB',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }}
        maxValue={maxValue}
        minValue={minValue}
        step={1000}
        defaultValue={defaultValue}
        onChange={onChange}
      />
    </CardCollapser>
  );
}
