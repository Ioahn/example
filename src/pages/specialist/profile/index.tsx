import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { wrapper } from '@app/store';
import { getSpecialistsPrivateProfileThunkSSR } from '@entities/models';
import { CommonPage } from '@shared/UI';

const DynamicPrivateSpecialistProfile = dynamic(() =>
  import('@features/specialist').then(
    ({ PrivateSpecialistProfile }) => PrivateSpecialistProfile
  )
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getSpecialistsPrivateProfileThunkSSR());

    return { props: {} };
  }
);

const Specialist = () => {
  return <DynamicPrivateSpecialistProfile />;
};

Specialist.getLayout = (page: ReactNode) => <CommonPage>{page}</CommonPage>;

export default Specialist;
