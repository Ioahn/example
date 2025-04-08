import { ReactNode } from 'react';
import { RiCalendar2Line, RiTimeLine, RiWalletLine } from 'react-icons/ri';
import { TAreaType } from '@shared/api';
import { addMinutesToMilliseconds } from '@shared/utils';
import { Card, FormattedDate, FormattedTime, WorkingAreas } from '@shared/UI';
import { WORKING_AREA_DICT } from '@shared/constants';

type InvoiceCardProps = {
  fullPrice?: ReactNode | string;
  area: TAreaType;
  slotDate: number;
  timeZone: string;
};

export const InvoiceCard = function InvoiceCard({
  fullPrice,
  area,
  slotDate,
  timeZone,
}: InvoiceCardProps) {
  return (
    <Card className='flex flex-col gap-4' size='sm'>
      <div className='flex justify-between items-center'>
        <p className='font-semibold max-md:text-2xs'>О Сессии:</p>
        <WorkingAreas
          areas={[area]}
          labelsMap={WORKING_AREA_DICT}
          className='max-md:text-2xs'
        />
      </div>
      <div className='flex flex-col gap-2 text-content-secondary md:text-xs max-md:text-2xs'>
        <div className='flex gap-1 items-center'>
          <RiCalendar2Line />
          <span className='font-semibold'>Дата:</span>
          <FormattedDate
            date={slotDate}
            day='2-digit'
            month='long'
            timeZone={timeZone}
          />
        </div>
        <div className='flex gap-1 items-center'>
          <RiTimeLine />
          <span className='font-semibold'>Время:</span>
          <div className='flex'>
            <FormattedTime date={slotDate} timeZone={timeZone} />
            -
            <FormattedTime
              date={addMinutesToMilliseconds(slotDate, 50)}
              timeZone={timeZone}
            />
          </div>
        </div>
        {fullPrice && (
          <div className='flex gap-1 items-center'>
            <RiWalletLine />
            <span className='font-semibold'>Стоимость:</span>
            {fullPrice}
          </div>
        )}
      </div>
    </Card>
  );
};
