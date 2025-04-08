import { Controller, useFormContext } from 'react-hook-form';
import { TAreaType } from '@shared/api';
import { cn } from '@shared/utils';
import { CardCollapser, RadioButton, RadioGroup } from '@shared/UI';
import { WORKING_AREA_DICT } from '@shared/constants';

export function SelectAreaType({ title }: { title?: string }) {
  const { control } = useFormContext();

  return (
    <CardCollapser variant='primary' title={title}>
      <Controller
        name='area_type'
        control={control}
        render={({ field }) => (
          <RadioGroup defaultValue={field.value} onChange={field.onChange}>
            <div className={cn('flex flex-col gap-4')}>
              {[TAreaType.EPsychotherapy, TAreaType.ECoaching].map((area) => (
                <RadioButton key={area} value={area} aria-label={area}>
                  {WORKING_AREA_DICT[area]}
                </RadioButton>
              ))}
            </div>
          </RadioGroup>
        )}
      />
    </CardCollapser>
  );
}
