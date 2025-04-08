import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { wrapper } from '@app/store';
import { getSpecialistScheduleThunkSSR } from '@entities/models';
import { CommonPage } from '@shared/UI';

const DynamicCalendarEdit = dynamic(
  () => import('@features/specialist').then(({ ScheduleEdit }) => ScheduleEdit),
  { ssr: false }
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getSpecialistScheduleThunkSSR());

    return { props: {} };
  }
);

const CalendarEditPage = () => {
  return <DynamicCalendarEdit />;
};

CalendarEditPage.getLayout = (page: ReactNode) => (
  <CommonPage>{page}</CommonPage>
);

export default CalendarEditPage;
