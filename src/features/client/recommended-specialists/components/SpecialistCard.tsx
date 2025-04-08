import { RiBriefcase4Line } from 'react-icons/ri';
import { TAreaType, TSpecialistSearchEntrySchema } from '@shared/api';
import { cn, getNumberLocalText } from '@shared/utils';
import {
  AvatarImage,
  Button,
  Card,
  IconWithDescription,
  Slot,
  Topic,
} from '@shared/UI';

export type SpecialistCardProps = {
  timeZone: string;
  area: TAreaType;
} & TSpecialistSearchEntrySchema;

export function SpecialistCard({
  first_name,
  last_name,
  experience,
  className,
  area,
  topics,
  future_dates_with_free_slots,
  timeZone,
  minimal_session_price,
}: CommonProps<SpecialistCardProps>) {
  return (
    <Card
      variant='secondary'
      className={cn(`group specialist-${area}`, className)}
    >
      <div className='grid gap-4 md:grid-cols-[7rem_1fr] grid-cols-[5rem_1fr] md:grid-row-2'>
        <AvatarImage
          name={`${first_name} ${last_name}`}
          variant='square'
          aspectRatio='4:3'
          className='col-span-1'
        />
        <div className='col-span-1 flex flex-col gap-4'>
          <p className='font-semibold md:text-md'>{`${first_name} ${last_name}`}</p>
          <IconWithDescription
            icon={<RiBriefcase4Line />}
            description='Опыт'
            value={getNumberLocalText(experience, ['лет', 'год', 'года'])}
          />
        </div>
        <div className='col-span-1 flex flex-col'>
          <p className='max-md:text-xs'>
            Работает с темами из{' '}
            <span className='group-[.specialist-coaching]:text-content-accent group-[.specialist-psychotherapy]:text-content-accent-vivid'>
              запроса
            </span>
          </p>
          <div className='flex gap-2'>
            {topics.slice(0, 2).map((topic) => (
              <Topic {...topic} key={topic.name} />
            ))}
          </div>
        </div>
      </div>
      <div className='flex gap-4 items-end'>
        <div className='flex flex-col gap-4'>
          <p>Ближайшие слоты</p>
          <div className='flex gap-4'>
            {future_dates_with_free_slots.map((slot) => (
              <Slot timeZone={timeZone} date={slot.date} key={slot.date}>
                <span
                  className={cn({
                    ['text-content-accent-vivid']: area === TAreaType.ECoaching,
                    ['text-content-accent']: area === TAreaType.EPsychotherapy,
                  })}
                >
                  {getNumberLocalText(slot.slots_num, [
                    'слот',
                    'слотов',
                    'слота',
                  ])}
                </span>
              </Slot>
            ))}
          </div>
        </div>
        <Button className='flex flex-col'>
          <div>Записаться</div>
          <div>{minimal_session_price}₽ / 50 мин</div>
        </Button>
      </div>
    </Card>
  );
}
