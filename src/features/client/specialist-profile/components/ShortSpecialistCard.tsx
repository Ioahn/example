import { Item } from 'react-stately';
import {
  ANCHOR_OUR_SPECIALISTS_ID,
  SpecialistPreview,
  TopicTag,
} from '@features/client';
import { TSpecialistProfileResponseSchema, TTopicSchema } from '@shared/api';
import { cn } from '@shared/utils';
import { Button, Card, Image, Link, Notify, TagGroup } from '@shared/UI';
import eye from '@public/svg/Eye.svg';
import VividCheckMark from '@public/svg/VividCheckMark.svg';

//TODO добавить утилиту TS для перевода из snake_case в camelCase
type Props = Pick<
  TSpecialistProfileResponseSchema,
  | 'first_name'
  | 'last_name'
  | 'experience'
  | 'working_areas'
  | 'avatar_url'
  | 'languages'
  | 'specialization_title'
  | 'topics'
> & {
  showNotification?: boolean;
};

export const ShortSpecialistCard: FCC<Props> = ({
  first_name,
  last_name,
  experience,
  working_areas,
  avatar_url,
  languages,
  specialization_title,
  topics,
  showNotification,
  className,
}) => (
  <Card variant='secondary' className={cn('flex flex-col gap-6', className)}>
    <SpecialistPreview
      title={
        <div className='flex items-center gap-4'>
          <p className='text-md font-bold select-none'>
            {first_name} {last_name}
          </p>
          <Link href={`#${ANCHOR_OUR_SPECIALISTS_ID}`}>
            <Image src={VividCheckMark} width={24} alt='check mark' />
          </Link>
        </div>
      }
      experience={experience}
      working_areas={working_areas}
      avatar_url={avatar_url}
      languages={languages}
      specialization_title={specialization_title}
    />
    {showNotification && (
      <Notify
        size='sm'
        type='info'
        renderIcon={<Image src={eye} width={20} height={20} alt='eye' />}
      >
        Работает с темами из вашего профиля
      </Notify>
    )}
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
  </Card>
);
