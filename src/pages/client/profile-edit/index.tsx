import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { wrapper } from '@app/store';
import { CommonPage } from '@shared/UI';

const DynamicClientProfileEdit = dynamic(() =>
  import('@features/client').then(({ ClientProfileEdit }) => ClientProfileEdit)
);

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  return {
    props: {},
  };
});

const EditProfilePage = () => <DynamicClientProfileEdit />;

EditProfilePage.getLayout = (page: ReactNode) => (
  <CommonPage
    headerType='withOverlay'
    navigationProps={{ title: 'Заполнение профиля' }}
  >
    {page}
  </CommonPage>
);

export default EditProfilePage;
