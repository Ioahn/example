import { ComponentProps, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectTopics } from '@entities/models';
import { TAreaType, TTopicCategoryMapSchema } from '@shared/api';
import { MultiSelect } from '@shared/UI';

export const MultiSelectWithTopics: FCC<
  CommonFieldType & Omit<ComponentProps<typeof MultiSelect>, 'defaultValue'>
> = (props) => {
  const { watch } = useFormContext();
  const working_areas = watch('working_areas');
  const topics = useSelector(selectTopics);

  const filteredTopics = useMemo(() => {
    const areas =
      working_areas?.map(({ value }: { value: TAreaType }) => value) || [];

    return topics.reduce((acc, { category, topics }) => {
      const filteredTopics = topics.filter(({ area }) => areas.includes(area));

      if (filteredTopics.length === 0) {
        return acc;
      }

      return [
        ...acc,
        {
          category,
          topics: filteredTopics,
        },
      ];
    }, [] as TTopicCategoryMapSchema[]);
  }, [topics, working_areas]);

  const options = useMemo(
    () =>
      filteredTopics.map(({ category, topics }) => ({
        group: category,
        options: topics.map(({ name, area, id }) => ({
          label: name,
          type: area,
          value: id,
        })),
      })),
    [filteredTopics]
  );

  if (topics.length === 0) {
    return null;
  }

  return <MultiSelect {...props} options={options} />;
};
