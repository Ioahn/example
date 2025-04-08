import { RiInformationFill } from 'react-icons/ri';
import {
  editCalendarLoaders,
  openCalendar,
  saveSchedule,
  selectProfileData,
  selectTimezone,
  selectWorkingWeek,
} from '@entities/models';
import { SelectTimeZone, WeekEditView } from '@features/specialist';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, Card, Container, Notify } from '@shared/UI';

export const ScheduleEdit = () => {
  const settings = useAppSelector(selectWorkingWeek);
  const { first_name, is_onboarding } = useAppSelector(selectProfileData);
  const timeZone = useAppSelector(selectTimezone);
  const { saveScheduleLoader } = useAppSelector(editCalendarLoaders);
  const dispatch = useAppDispatch();

  return (
    <Container className='mt-4 grid grid-cols-6 gap-4 sm:mt-8 sm:grid-cols-12'>
      <h1 className='col-span-6 text-md md:text-lg font-semibold sm:col-span-12'>
        Здравствуйте, {first_name}!
      </h1>
      <Card variant='secondary' className='col-span-6 sm:col-span-12'>
        <div className='mb-2 mb-4 flex items-center justify-between sm:mb-8'>
          <h2 className='font-semibold sm:text-md'>
            Настройте ваше расписание
          </h2>

          <div className='flex items-center gap-2'>
            <div className='hidden sm:block'>
              <SelectTimeZone />
            </div>
            <div className='flex gap-2 max-md:hidden'>
              <Button
                variant='secondary'
                onPress={() => dispatch(openCalendar())}
              >
                Отмена
              </Button>
              <Button
                onPress={() => dispatch(saveSchedule())}
                loaderState={saveScheduleLoader}
              >
                Сохранить
              </Button>
            </div>
          </div>
        </div>

        {is_onboarding && (
          <Notify
            type='info'
            withCloseButton
            renderIcon={
              <RiInformationFill className='fill-content-accent text-md' />
            }
            className='mb-2'
          >
            После выбора постоянного расписания вы можете поменять его в любой
            момент по кнопке “Настроить” в правом углу экрана.
          </Notify>
        )}

        <WeekEditView settings={settings} timeZone={timeZone} />
      </Card>
      <div className='flex gap-2 md:hidden w-full justify-between mb-2 col-span-6'>
        <Button variant='secondary' onPress={() => dispatch(openCalendar())}>
          Отмена
        </Button>
        <Button
          onPress={() => dispatch(saveSchedule())}
          loaderState={saveScheduleLoader}
        >
          Сохранить
        </Button>
      </div>
    </Container>
  );
};
