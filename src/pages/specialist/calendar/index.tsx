import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { wrapper } from '@app/store';
import { getSpecialistScheduleThunkSSR } from '@entities/models';
import { CommonPage } from '@shared/UI';

const DynamicSchedules = dynamic(
  () => import('@features/specialist').then(({ Schedule }) => Schedule),
  { ssr: false }
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getSpecialistScheduleThunkSSR());

    return { props: {} };
  }
);
const CalendarPage = () => {
  return <DynamicSchedules />;
};

CalendarPage.getLayout = (page: ReactNode) => <CommonPage>{page}</CommonPage>;

export default CalendarPage;
