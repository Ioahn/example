import { Key } from 'react';
import { Item } from 'react-stately';
import { selectTimezone, updateTimezone } from '@entities/models';
import { getTimezoneOffset } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Select } from '@shared/UI';
import { TIMEZONES } from '@shared/constants';

export const SelectTimeZone = () => {
  const timeZone = useAppSelector(selectTimezone);
  const dispatch = useAppDispatch();

  return (
    <div className='flex items-center gap-2'>
      <span className='text-content-tertiary flex-shrink-0'>Тайм зона</span>
      <Select
        items={TIMEZONES}
        defaultSelectedKey={timeZone}
        buttonClassName='text-base h-full font-bold bg-transparent p-1 rounded-xl aria-pressed:bg-bg-tertiary'
        variant='clear'
        onSelectionChange={(timezone: Key) =>
          dispatch(updateTimezone(timezone as string))
        }
      >
        {(item) => {
          const { hours, minutes } = getTimezoneOffset(item.timezone);

          // write set minutes to positive value
          const positiveMinutes = Math.abs(minutes);
          const hoursStr = hours >= 0 ? `+${hours}` : `${hours}`;
          const minutesStr =
            positiveMinutes >= 10
              ? `${positiveMinutes}`
              : `0${positiveMinutes}`;

          return (
            <Item key={item.timezone} textValue={item.timezone}>
              {item.ru_label} (GMT{hoursStr}:{minutesStr})
            </Item>
          );
        }}
      </Select>
    </div>
  );
};
