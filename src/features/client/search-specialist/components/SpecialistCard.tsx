import { Item } from 'react-stately';
import { PriceAndLink, SpecialistPreview, TopicTag } from '@features/client';
import { TSpecialistSearchEntrySchema, TTopicSchema } from '@shared/api';
import { cn } from '@shared/utils';
import { Button, Card, TagGroup } from '@shared/UI';

export const SpecialistCard: FCC<TSpecialistSearchEntrySchema> = ({
  id,
  first_name,
  last_name,
  avatar_url,
  working_areas,
  specialization_title,
  experience,
  languages,
  topics,
  about_me,
  minimal_session_price,
  className,
}) => {
  return (
    <Card
      variant='secondary'
      size='md'
      className={cn('flex flex-col gap-6', className)}
    >
      <SpecialistPreview
        title={
          <div className='flex gap-4'>
            <p className='text-md font-bold'>
              {first_name} {last_name}
            </p>
          </div>
        }
        experience={experience}
        working_areas={working_areas}
        avatar_url={avatar_url}
        languages={languages}
        specialization_title={specialization_title}
      />
      <TagGroup<TTopicSchema>
        items={topics}
        aria-label='topics'
        maxTags={5}
        buttonRender={(onClick) => (
          <Button
            variant='clear'
            size='sm'
            className='font-normal text-content-tertiary'
            onPress={onClick}
          >
            Показать все
          </Button>
        )}
        buttonHide={(onClick) => (
          <Button
            variant='clear'
            size='sm'
            className='font-normal text-content-tertiary'
            onPress={onClick}
          >
            Свернуть
          </Button>
        )}
        className='text-xs'
      >
        {({ name, area }) => (
          <Item textValue={name}>
            <TopicTag name={name} area={area} />
          </Item>
        )}
      </TagGroup>
      <div className='line-clamp-4 text-content-secondary'>{about_me}</div>
      <PriceAndLink price={minimal_session_price} id={id} />
    </Card>
  );
};
