import React from 'react';
import { selectClientSpecialist, selectProfileData } from '@entities/models';
import {
  EnterSessionBage,
  NextSessions,
  Specialists,
  TelegramNotificationsWidget,
} from '@features/client';
import { cn } from '@shared/utils';
import { useAppSelector } from '@shared/hooks';
import { Container } from '@shared/UI';

export const ClientProfile = () => {
  const { first_name } = useAppSelector(selectProfileData);
  const specialist = useAppSelector(selectClientSpecialist);
  const { is_telegram_notifications_connected } =
    useAppSelector(selectProfileData);

  return (
    <Container className='grid grid-cols-6 gap-y-4 gap-x-8 md:grid-cols-12 pt-4'>
      <EnterSessionBage className='md:col-span-12 col-span-6' />
      <div className='md:col-span-12 col-span-6 mt-4 flex items-center justify-between'>
        <h1 className='font-semibold max-md:text-md sm:text-lg'>
          Здравствуйте, {first_name}!
        </h1>
      </div>
      {specialist && (
        <div className='md:col-span-4 col-span-6 row-span-1 flex flex-col gap-4'>
          <Specialists />
          {!is_telegram_notifications_connected && (
            <TelegramNotificationsWidget />
          )}
        </div>
      )}
      <div
        className={cn(
          specialist
            ? 'md:col-span-8 col-span-6 row-span-6'
            : 'md:col-span-12 col-span-12 row-span-12'
        )}
      >
        <NextSessions />
      </div>
    </Container>
  );
};
