import { ComponentProps, memo, useMemo } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectTopics } from '@entities/models';
import { Card, MultiSelect } from '@shared/UI';

export const TopicsSelect: FCC<
  CommonFieldType & Omit<ComponentProps<typeof MultiSelect>, 'defaultValue'>
> = memo(() => {
  const { control } = useFormContext();
  const topics = useSelector(selectTopics);

  const options = useMemo(
    () =>
      topics.map(({ category, topics }) => ({
        group: category,
        options: topics.map(({ name, area, id }) => ({
          label: name,
          type: area,
          value: id,
        })),
      })),
    [topics]
  );

  if (topics.length === 0) {
    return null;
  }

  return (
    <Card variant='secondary' className='flex flex-col gap-4'>
      <Controller
        name='topics'
        control={control}
        render={({ field }) => (
          <MultiSelect
            onChange={field.onChange}
            defaultValue={field.value}
            options={options}
          />
        )}
      ></Controller>
    </Card>
  );
});
