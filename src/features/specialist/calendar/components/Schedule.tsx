import { MdOutlineEditCalendar } from 'react-icons/md';
import { openEditCalendar, selectProfileData } from '@entities/models';
import {
  NextSessionWithClient,
  SelectTimeZone,
  WeekView,
} from '@features/specialist';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, Card, Container } from '@shared/UI';

export const Schedule = () => {
  const { first_name } = useAppSelector(selectProfileData);
  const dispatch = useAppDispatch();

  return (
    <Container className='mt-4 grid grid-cols-6 gap-4 max-md:mb-16 sm:mt-8 sm:grid-cols-12'>
      <div className='col-span-6 sm:col-span-12 mb-8'>
        <NextSessionWithClient />
      </div>
      <h1 className='col-span-6 text-md md:text-lg font-semibold sm:col-span-12'>
        Здравствуйте, {first_name}!
      </h1>
      <Card variant='secondary' className='col-span-6 sm:col-span-12'>
        <div className='mb-2 mb-4 flex items-center justify-between sm:mb-8'>
          <h2 className='font-semibold sm:text-md'>Ваше расписание</h2>
          <div className='flex items-center'>
            <div className='hidden sm:block'>
              <SelectTimeZone />
            </div>
            <Button
              variant='secondary'
              size='lg'
              onPress={() => dispatch(openEditCalendar())}
              className='max-md:hidden'
            >
              Настроить
            </Button>

            <Button
              size='icon'
              onPress={() => dispatch(openEditCalendar())}
              className='md:hidden'
            >
              <MdOutlineEditCalendar className='text-md' />
            </Button>
          </div>
        </div>
        <WeekView />
      </Card>
    </Container>
  );
};
