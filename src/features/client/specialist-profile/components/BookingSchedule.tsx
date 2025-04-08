import React from 'react';
import { RiInformationFill } from 'react-icons/ri';
import {
  selectClientSpecialist,
  selectPurchaseSlot,
  selectTimezone,
  setPurchasedSlots,
} from '@entities/models';
import { openChatByInterlocutorId } from '@features/chat';
import { cn } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import {
  Button,
  Card,
  EmptySchedule,
  Notify,
  ScheduleSelector,
  Timezone,
} from '@shared/UI';

type Props = {
  title?: string;
  slots: { id: string; date: number }[];
};

export const BookingSchedule: FCC<Props> = function BookingSchedule({
  className,
  children,
  slots,
  title = 'Расписание',
}) {
  const timeZone = useAppSelector(selectTimezone);
  const activeSlot = useAppSelector(selectPurchaseSlot) as string;
  const specialist = useAppSelector(selectClientSpecialist);
  const dispatch = useAppDispatch();

  if (slots.length === 0) {
    return (
      <Card variant='secondary' className={cn('flex flex-col', className)}>
        <div className='flex justify-between items-center'>
          <h3 className='md:text-md font-semibold'>{title}</h3>
        </div>
        <EmptySchedule className={className} />
      </Card>
    );
  }

  return (
    <Card variant='secondary' className={cn('flex flex-col gap-6', className)}>
      <div className='flex justify-between items-center'>
        <h3 className='md:text-md font-semibold'>{title}</h3>
        <Timezone timeZone={timeZone} className='max-md:text-right' />
      </div>

      <Notify
        type='info'
        renderIcon={
          <RiInformationFill className='fill-content-accent text-md' />
        }
        withCloseButton={false}
        className='max-md:text-2xs'
      >
        Перенос сессий возможен не позднее чем за 24 часа до начала, при
        пропуске сессии средства не возмещаются.
      </Notify>
      <ScheduleSelector
        defaultActiveTime={activeSlot}
        schedule={slots}
        timeZone={timeZone}
        onSelect={(slot) => dispatch(setPurchasedSlots(slot))}
      />

      {children}

      <div className='text-center text-2xs md:text-base'>
        Не нашли подходящего времени?{' '}
        {specialist ? (
          <Button
            className='text-content-accent inline-block'
            variant='clear'
            onPress={() => dispatch(openChatByInterlocutorId(specialist.id))}
          >
            Напишите своему специалисту
          </Button>
        ) : (
          <Button
            className='text-content-accent inline-block'
            variant='clear'
            onPress={() => carrotquest.open()}
          >
            Напишите нам
          </Button>
        )}
      </div>
    </Card>
  );
};
