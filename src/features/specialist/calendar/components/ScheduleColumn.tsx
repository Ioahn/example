import { ZonedDateTime, fromAbsolute, today } from '@internationalized/date';
import { Key, useState } from 'react';
import {
  RiCalendarCloseLine,
  RiCalendarEventLine,
  RiChat3Line,
} from 'react-icons/ri';
import { Item } from 'react-stately';
import {
  excludeSlot,
  selectEditableSlot,
  setEditableSlot,
  unexcludeSlot,
  updateSlotOnce,
} from '@entities/models';
import { openChatByInterlocutorId } from '@features/chat';
import { ScheduleCell } from '@features/specialist';
import { TAreaType, TScheduleSlotSchema } from '@shared/api';
import { cn, convertUnixTimeIntl } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import {
  AvatarThumbnail,
  DatePicker,
  MenuButton,
  MenuListItem,
} from '@shared/UI';

type Props = { slots?: TScheduleSlotSchema[]; timeZone: string };

const Slot = ({
  client,
  timeZone,
  is_excluded,
  ...props
}: TScheduleSlotSchema & { timeZone: string }) => {
  const dispatch = useAppDispatch();
  const editableSlot = useAppSelector(selectEditableSlot);

  const [time, setTime] = useState(
    fromAbsolute(props.slot_date * 1000, timeZone)
  );

  const [isInvalid, setIsInvalid] = useState(false);

  const applyTime = () => {
    const newData = time.toDate().getTime() / 1000;
    dispatch(setEditableSlot(''));

    if (newData === props.slot_date || isInvalid) {
      setTime(fromAbsolute(props.slot_date * 1000, timeZone));

      return;
    }

    dispatch(updateSlotOnce({ id: props.id, newData }));
  };

  if (editableSlot === props.id) {
    return (
      <ScheduleCell
        className={cn(
          'flex w-full md:p-4 select-none p-2 gap-2 rounded-xl bg-bg-secondary outline-1 outline-offset-0 outline-border-primary sm:flex-col sm:gap-0 transition-all',
          {
            ['bg-content-accent']:
              props.is_booked_as === TAreaType.EPsychotherapy,
            ['bg-content-accent-vivid']:
              props.is_booked_as === TAreaType.ECoaching,
            ['bg-content-error']: isInvalid,
          }
        )}
        disabled={is_excluded}
        active
      >
        <DatePicker
          hideTimeZone
          defaultValue={time}
          onChange={(e) => setTime(e as ZonedDateTime)}
          value={time}
          area={props.is_booked_as as TAreaType}
          shouldCloseOnSelect={false}
          minValue={today(timeZone)}
          onBlur={applyTime}
          onKeyDown={(event) => event.key === 'Enter' && applyTime()}
          onValidationChange={setIsInvalid}
        />
      </ScheduleCell>
    );
  }

  return (
    <ScheduleCell
      className={cn(
        'flex w-full cursor-pointer select-none gap-2 rounded-xl bg-bg-secondary outline-1 outline-offset-0 outline-border-primary sm:flex-col sm:gap-0',
        {
          ['text-content-inverse']: !!client,
          ['bg-content-accent']: props.is_booked_as?.includes(
            TAreaType.EPsychotherapy
          ),
          ['bg-content-accent-vivid']: props.is_booked_as?.includes(
            TAreaType.ECoaching
          ),
        }
      )}
      disabled={is_excluded}
    >
      {convertUnixTimeIntl(+props.slot_date, timeZone).time}
      {client && (
        <div className='flex items-start'>
          <AvatarThumbnail
            className='text-sm'
            size='sm'
            img={client.avatar_url as unknown as string}
            name={`${client.first_name} ${(
              client.last_name?.[0] || ''
            )?.toUpperCase?.()}`}
          />
        </div>
      )}
    </ScheduleCell>
  );
};

const SlotWithMenu: FCC<TScheduleSlotSchema> = ({
  client,
  children,
  id,
  is_excluded,
}) => {
  const [menuOpened, setMenuOpened] = useState(false);

  const dispatch = useAppDispatch();
  const onSelect = (key: Key) => {
    if (key === 'postpone') {
      dispatch(setEditableSlot(id as string));

      return;
    }

    if (key === 'hide') {
      dispatch(excludeSlot(id));

      return;
    }

    if (key === 'show') {
      dispatch(unexcludeSlot(id));

      return;
    }

    if (key === 'send_message') {
      client && dispatch(openChatByInterlocutorId(client?.id));
    }
  };

  const menu = [
    {
      id: 'hide',
      show: !client && !is_excluded,
      text: 'Скрыть слот',
      icon: <RiCalendarCloseLine />,
      className: 'text-content-accent-vivid',
    },
    {
      id: 'show',
      show: !client && is_excluded,
      text: 'Вернуть слот',
      icon: <RiCalendarCloseLine />,
      className: 'text-content-accent-vivid',
    },
    {
      id: 'postpone',
      show: !!client,
      text: 'Перенести сессию',
      icon: <RiCalendarEventLine />,
    },
    {
      id: 'send_message',
      show: !!client,
      text: 'Написать сообщение',
      icon: <RiChat3Line />,
    },
  ].filter(({ show }) => show);

  return (
    <MenuButton
      label={children}
      items={menu}
      buttonProps={{
        variant: 'clear',
        fullWidth: true,
        className:
          'before:content-[""] relative before:absolute before:inset-0 aria-expanded:before:rounded-xl aria-expanded:before:border aria-expanded:before:border-2 aria-expanded:before:border-border-active aria-expanded:before:outline-[3px] aria-expanded:before:outline before:outline-border-primary',
      }}
      onAction={onSelect}
      onOpenChange={setMenuOpened}
      isOpen={menuOpened}
      shouldFocusWrap
    >
      {({ id, text, icon, className }) => (
        <Item key={id} textValue={id}>
          <MenuListItem text={text} icon={icon} className={className} />
        </Item>
      )}
    </MenuButton>
  );
};

export const ScheduleColumn = ({ slots = [], timeZone }: Props) => {
  const editableSlot = useAppSelector(selectEditableSlot);

  return (
    <div className='flex gap-2 p-2 max-md:flex-wrap sm:flex-col'>
      {slots.map((slot) =>
        editableSlot !== slot?.id ? (
          <SlotWithMenu key={slot.id} {...slot}>
            <Slot {...slot} timeZone={timeZone} />
          </SlotWithMenu>
        ) : (
          <Slot {...slot} key={slot.id} timeZone={timeZone} />
        )
      )}
    </div>
  );
};
