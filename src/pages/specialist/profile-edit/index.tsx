import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { wrapper } from '@app/store';
import { getTopicsThunk } from '@entities/models';
import { CommonPage } from '@shared/UI';

const DynamicProfileEdit = dynamic(() =>
  import('@features/specialist').then(
    ({ SpecialistProfileEdit }) => SpecialistProfileEdit
  )
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getTopicsThunk());

    return { props: {} };
  }
);

const ProfileEditPage = () => {
  return <DynamicProfileEdit />;
};

ProfileEditPage.getLayout = (page: ReactNode) => (
  <CommonPage
    headerType='withOverlay'
    navigationProps={{
      title: 'Заполнение профиля',
    }}
  >
    {page}
  </CommonPage>
);

export default ProfileEditPage;
