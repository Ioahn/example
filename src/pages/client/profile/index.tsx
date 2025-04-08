import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { wrapper } from '@app/store';
import { getClientProfileThunkSSR } from '@entities/models';
import { CommonPage } from '@shared/UI';

const DynamicClientProfile = dynamic(() =>
  import('@features/client').then(({ ClientProfile }) => ClientProfile)
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getClientProfileThunkSSR());

    return {
      props: {},
    };
  }
);

const EditProfilePage = () => <DynamicClientProfile />;

EditProfilePage.getLayout = (page: ReactNode) => (
  <CommonPage>{page}</CommonPage>
);

export default EditProfilePage;
