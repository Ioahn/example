import { GregorianCalendar } from '@internationalized/date';
import { Key, useCallback, useMemo } from 'react';
import { useDateFormatter } from 'react-aria';
import { IconType } from 'react-icons';
import {
  RiCalendarCloseLine,
  RiCalendarEventLine,
  RiMoreFill,
  RiVideoAddLine,
} from 'react-icons/ri';
import { Item } from 'react-stately';
import {
  cancelClientSlotTime,
  openClientPostponeSchedule,
} from '@entities/models';
import { TAreaType } from '@shared/api';
import { cn, fl } from '@shared/utils';
import { useAppDispatch } from '@shared/hooks';
import { Card, MenuButton, MenuListItem } from '@shared/UI';
import { WORKING_AREA_DICT } from '@shared/constants';

type TSessionProps = {
  id: string;
  area: TAreaType;
  date: number;
  specialistName?: string;
  isAbleToCancel: boolean;
  isAbleToMove: boolean;
};

type TSessionMenu = { id: string; icon: IconType; text: string };

const useSessionMenu = ({
  id,
  isAbleToCancel,
  isAbleToMove,
}: Pick<TSessionProps, 'id' | 'isAbleToCancel' | 'isAbleToMove'>): [
  TSessionMenu[],
  (action: Key) => void,
] => {
  const dispatch = useAppDispatch();
  const onPressHandler = useCallback(
    (action: Key) => {
      if (action === 'change_session') {
        dispatch(openClientPostponeSchedule(id));
      }

      if (action === 'cancel_session') {
        dispatch(cancelClientSlotTime(id));
      }
    },
    [dispatch, id]
  );

  const items = useMemo(
    () =>
      [
        {
          id: 'change_session',
          icon: RiCalendarEventLine,
          text: 'Перенести сессию',
          show: isAbleToMove,
        },
        {
          id: 'cancel_session',
          icon: RiCalendarCloseLine,
          text: 'Отменить сессию',
          show: isAbleToCancel,
        },
      ].filter(({ show }) => show),
    [isAbleToCancel, isAbleToMove]
  );

  return [items, onPressHandler];
};
export const SessionBage: FCC<TSessionProps> = ({
  id,
  area,
  date,
  specialistName,
  isAbleToMove,
  isAbleToCancel,
}) => {
  const [menuItems, onPressHandler] = useSessionMenu({
    id,
    isAbleToMove,
    isAbleToCancel,
  });
  const weekDateFormatter = useDateFormatter({
    weekday: 'long',
    timeZone: 'UTC',
    calendar: typeof GregorianCalendar,
  });

  const dayWithMonth = useDateFormatter({
    month: 'long',
    day: '2-digit',
    calendar: typeof GregorianCalendar,
  });

  const time = useDateFormatter({
    timeStyle: 'short',
    calendar: typeof GregorianCalendar,
  });

  const dateInMs = new Date(date * 1000);

  return (
    <Card variant='secondary' className='flex gap-4 items-center'>
      <div
        className={cn('flex items-center rounded-full p-3', {
          ['bg-content-accent-vivid']: area === TAreaType.ECoaching,
          ['bg-content-accent']: area === TAreaType.EPsychotherapy,
        })}
      >
        <RiVideoAddLine className='text-lg text-content-inverse' />
      </div>
      <div>
        <div className='font-semibold'>
          {fl(weekDateFormatter.format(dateInMs))},{' '}
          {dayWithMonth.format(dateInMs)} <span className='font-normal'>в</span>{' '}
          {time.format(dateInMs)}
        </div>
        <div className='text-content-secondary select-none'>
          {specialistName}, {WORKING_AREA_DICT[area]}
        </div>
      </div>
      {menuItems.length > 0 && (
        <div className='ml-auto'>
          <MenuButton<TSessionMenu>
            label={<RiMoreFill className='text-md' />}
            items={menuItems}
            onAction={onPressHandler}
            placement='bottom end'
            buttonProps={{
              variant: 'ghost',
              size: 'icon',
              className: 'rounded-full',
            }}
          >
            {(item) => (
              <Item key={item.id} textValue={item.id}>
                <MenuListItem {...item} icon={<item.icon />} />
              </Item>
            )}
          </MenuButton>
        </div>
      )}
    </Card>
  );
};
