import { Controller, useFormContext } from 'react-hook-form';
import { TTopicCategoryMapSchema, TTopicSchema } from '@shared/api';
import { CardCollapser, Checkbox, CheckboxGroup } from '@shared/UI';

type Props = {
  category: string;
  topics: TTopicSchema[];
};

export const Categories: FCC<{ categories: TTopicCategoryMapSchema[] }> = ({
  categories,
}) => {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name='choseTopics'
      render={({ field }) => (
        <CheckboxGroup
          className='flex flex-col gap-6'
          onChange={field.onChange}
          defaultValue={field.value}
          aria-label='Выберите темы'
        >
          {categories.map(({ category, topics }) => (
            <CategoryFilter
              category={category}
              topics={topics}
              key={category}
            />
          ))}
        </CheckboxGroup>
      )}
    />
  );
};

export const CategoryFilter: FCC<Props> = ({ className, category, topics }) => {
  return (
    <CardCollapser title={category} className={className} variant='primary'>
      <div className='flex flex-col gap-4'>
        {topics?.map((props) => (
          <Checkbox value={props.id} key={props.id}>
            {props.name}
          </Checkbox>
        ))}
      </div>
    </CardCollapser>
  );
};
