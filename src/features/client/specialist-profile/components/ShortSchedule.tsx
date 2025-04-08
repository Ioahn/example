import { useMemo } from 'react';
import { Item } from 'react-stately';
import { Price, ScheduleButton, Slots } from '@features/client';
import { TAreaType, TShortWeekDayScheduleSlotsSchema } from '@shared/api';
import { cn, convertUnixTimeIntl } from '@shared/utils';
import { Button, Tabs } from '@shared/UI';

type Props = {
  schedule_slots: TShortWeekDayScheduleSlotsSchema[];
  one_session_price: number;
  area: TAreaType;
};

export const ShortSchedule: FCC<Props> = ({
  className,
  one_session_price,
  schedule_slots,
}) => {
  const data = useMemo(
    () =>
      schedule_slots
        ?.filter(({ slots }) => slots && slots?.length !== 0)
        .map(({ date, slots }) => {
          const data = convertUnixTimeIntl(+date);

          return {
            key: data.dayOfWeek + data.time + data.date,
            data,
            slots,
          };
        }),
    [schedule_slots]
  );

  return (
    <div className={cn('flex flex-col', className)}>
      <Price one_session_price={one_session_price} />
      {(data || []).length > 0 ? (
        <>
          <p className='mb-4 mt-8 font-bold'>Доступные даты</p>
          <Tabs
            aria-label='выбор'
            variant='secondary'
            items={data}
            tabClassName='flex-[1_0_auto]'
            tabUnderlineClassName='rounded-xl outline outline-[3px] outline-border-primary'
            defaultSelectedKey={data?.[0].key}
          >
            {({ data, slots, key }) => (
              <Item
                key={key}
                title={
                  <ScheduleButton className='rounded-xl'>
                    <p className='text-xs text-content-secondary'>
                      {data.dayOfWeek}
                    </p>
                    <p className='whitespace-nowrap'>{data.date}</p>
                  </ScheduleButton>
                }
              >
                <p className='font-bold'>Доступное время</p>

                <Slots slots={slots} className='mt-4' />
              </Item>
            )}
          </Tabs>
        </>
      ) : (
        <p className='mb-4 mt-8'>
          Нет свободных дат. Пожалуйста,{' '}
          <Button
            className='text-content-accent inline-block'
            variant='clear'
            onPress={() => carrotquest.open()}
          >
            свяжитесь с нами
          </Button>
          {', '}
          чтобы обсудить все возможные варианты.
        </p>
      )}
    </div>
  );
};
