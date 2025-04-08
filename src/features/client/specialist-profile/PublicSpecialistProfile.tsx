import React from 'react';
import {
  openClientBooking,
  selectShowNotification,
  selectSpecialist,
  selectSpecialistSlot,
} from '@entities/models';
import { ShortSlotInformation } from '@features/client';
import { AboutSpecialists } from '@features/client/specialist-profile/components/AboutSpecialists';
import { MobileButtonOverlay } from '@features/navigation-panel';
import { assert } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, Container } from '@shared/UI';
import {
  AboutSpecialist,
  BookingSchedule,
  Education,
  ShortSpecialistCard,
} from './components';

export const PublicSpecialistProfile = () => {
  const specialist = useAppSelector(selectSpecialist);
  const showNotification = useAppSelector(selectShowNotification);
  const dispatch = useAppDispatch();

  assert(specialist !== null, 'Specialist cant be null');

  const {
    id,
    avatar_url,
    working_areas,
    experience,
    specialization_title,
    first_name,
    last_name,
    languages,
    topics,
    about_me,
    education,
    additional_education,
  } = specialist;

  const slots = useAppSelector(selectSpecialistSlot);

  const onlyAreaBooking =
    specialist.working_areas.length === 1 ? specialist.working_areas[0] : null;

  return (
    <Container className='row-auto grid h-full auto-rows-min grid-cols-6 gap-4 sm:mt-9 md:grid-cols-12'>
      <div className=' col-span-7 flex flex-col gap-2'>
        <ShortSpecialistCard
          avatar_url={avatar_url}
          working_areas={working_areas}
          experience={experience}
          specialization_title={specialization_title}
          first_name={first_name}
          last_name={last_name}
          languages={languages}
          topics={topics}
          showNotification={showNotification}
        />
        <AboutSpecialist className='col-span-7' description={about_me} />
        <Education
          className='col-span-7'
          education={education}
          additional_education={additional_education}
        />
        <AboutSpecialists className='col-span-7' />
      </div>
      <div className='col-span-7 md:col-span-5 max-md:hidden'>
        <BookingSchedule slots={slots}>
          <Button
            fullWidth
            onPress={() =>
              dispatch(openClientBooking({ id, areaType: onlyAreaBooking }))
            }
          >
            Запланировать сессию
          </Button>
        </BookingSchedule>
      </div>
      <div className='md:hidden'>
        <MobileButtonOverlay>
          <div className='flex items-center gap-4'>
            <ShortSlotInformation />
            <Button
              fullWidth
              onPress={() =>
                dispatch(openClientBooking({ id, areaType: onlyAreaBooking }))
              }
            >
              Расписание
            </Button>
          </div>
        </MobileButtonOverlay>
      </div>
    </Container>
  );
};
