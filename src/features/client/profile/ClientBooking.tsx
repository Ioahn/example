import React from 'react';
import {
  openClientInvoice,
  openPublicSpecialistProfile,
  selectClientProfileArea,
  selectSpecialist,
  selectSpecialistSlot,
} from '@entities/models';
import {
  BookingPrice,
  BookingSchedule,
  ShortSlotInformation,
} from '@features/client';
import { BackButton, MobileButtonOverlay } from '@features/navigation-panel';
import { TAreaType } from '@shared/api';
import { assert } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, CardSpecialistPreview, Container } from '@shared/UI';

export const ClientBooking = () => {
  const dispatch = useAppDispatch();
  const slots = useAppSelector(selectSpecialistSlot);
  const specialist = useAppSelector(selectSpecialist);
  const area = useAppSelector(selectClientProfileArea);

  assert(specialist !== null, 'Specialist cannot be null');

  const {
    id,
    avatar_url,
    first_name,
    last_name,
    specialization_title,
    working_areas,
  } = specialist;

  return (
    <Container className='grid grid-cols-6 gap-y-4 gap-x-8 md:grid-cols-12 pt-4 items-stretch'>
      <div className='md:col-span-12 col-span-6 max-md:hidden'>
        <BackButton />
      </div>
      <div className='md:col-span-4 col-span-6'>
        <div className='flex flex-col gap-4'>
          <CardSpecialistPreview
            firstName={first_name}
            lastName={last_name}
            avatarUrl={avatar_url}
            specializationTitle={specialization_title}
            onPress={() => dispatch(openPublicSpecialistProfile(id))}
          />
          <BookingPrice />
        </div>
      </div>
      <div className='md:col-span-8 col-span-6 flex flex-col gap-4'>
        <BookingSchedule slots={slots}>
          <MobileButtonOverlay>
            <div className='flex items-center gap-4'>
              <ShortSlotInformation className='md:hidden' />
              <Button
                fullWidth
                onPress={() =>
                  dispatch(
                    openClientInvoice({
                      id: specialist.id,
                      areaType: (area || working_areas[0]) as TAreaType,
                    })
                  )
                }
              >
                Далее
              </Button>
            </div>
          </MobileButtonOverlay>
        </BookingSchedule>
      </div>
    </Container>
  );
};
