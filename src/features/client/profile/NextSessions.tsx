import { animated, easings, useSpring } from '@react-spring/web';
import React from 'react';
import { Item } from 'react-stately';
import {
  openClientInvoice,
  planningSession,
  selectClientProfile,
  selectClientSpecialist,
  selectClientSpecialistSlot,
  selectShortProfile,
} from '@entities/models';
import { BookingSchedule, SessionBage } from '@features/client';
import { TAreaType } from '@shared/api';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, Card, Image, List } from '@shared/UI';
import bigStar from '@public/svg/BlueBigStar.svg';

const EmptyNextSessions = () => {
  const dispatch = useAppDispatch();
  const specialist = useAppSelector(selectClientSpecialist);

  const props = useSpring({
    config: {
      duration: 100000 / 4,
      easing: easings.linear,
    },
    from: { x: 0 },
    to: { x: 1 },
    loop: true,
  });

  return (
    <Card variant='secondary' className='flex flex-col items-center'>
      <div className='min-h-[11rem] w-full relative'>
        <animated.div
          className='absolute inset-[2rem] pointer-events-none select-none'
          style={{
            transform: props.x
              .to([0, 1], [0, 360])
              .to((value) => `rotateZ(${value}deg)`),
          }}
        >
          <Image src={bigStar} fill alt='sensea' />
        </animated.div>
      </div>
      <div className='font-semibold'>Нет запланированных сессий</div>
      <div className='flex gap-4 mt-4'>
        <Button variant='secondary' onPress={() => dispatch(planningSession())}>
          {/*{specialist && 'Выбрать подходящее время'}*/}
          {!specialist && 'Выбрать специалиста'}
        </Button>
      </div>
    </Card>
  );
};

export const NextSessions = () => {
  const dispatch = useAppDispatch();
  const { scheduled_future_sessions } = useAppSelector(
    (state) => selectClientProfile(state) || {}
  );
  const slots = useAppSelector(selectClientSpecialistSlot);
  const { current_area } = useAppSelector(selectShortProfile);
  const specialist = useAppSelector(selectClientSpecialist);

  if (!specialist) {
    return <EmptyNextSessions />;
  }

  if (!scheduled_future_sessions || scheduled_future_sessions.length === 0) {
    return (
      <BookingSchedule slots={slots} title='Запланируйте следующую сессию'>
        <Button
          fullWidth
          onPress={() =>
            dispatch(
              openClientInvoice({
                id: specialist.id,
                areaType: current_area as TAreaType,
              })
            )
          }
        >
          Далее
        </Button>
      </BookingSchedule>
    );
  }

  return (
    <List
      items={scheduled_future_sessions}
      isVirtualized
      className='flex flex-col gap-4'
    >
      {(item) => (
        <Item key={item.id} textValue={item.area}>
          <SessionBage
            id={item.id}
            area={item.area}
            date={item.utc_date}
            specialistName={specialist?.first_name}
            isAbleToCancel={item.is_able_to_cancel}
            isAbleToMove={item.is_able_to_move}
          />
        </Item>
      )}
    </List>
  );
};
