import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { wrapper } from '@app/store';
import { CommonPage } from '@shared/UI';

const DynamicSpecialistSettings = dynamic(() =>
  import('@features/specialist').then(
    ({ SpecialistSettings }) => SpecialistSettings
  )
);

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  return { props: {} };
});

const Specialist = () => {
  return <DynamicSpecialistSettings />;
};

Specialist.getLayout = (page: ReactNode) => <CommonPage>{page}</CommonPage>;

export default Specialist;
