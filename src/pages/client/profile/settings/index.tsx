import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { wrapper } from '@app/store';
import {
  getClientProfileSettingsThunkSSR,
  getTopicsThunk,
} from '@entities/models';
import { CommonPage } from '@shared/UI';

const DynamicClientSettings = dynamic(() =>
  import('@features/client').then(({ ClientSettings }) => ClientSettings)
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await Promise.all([
      store.dispatch(getTopicsThunk()),
      store.dispatch(getClientProfileSettingsThunkSSR()),
    ]);

    return { props: {} };
  }
);

const ClientSettings = () => {
  return <DynamicClientSettings />;
};

ClientSettings.getLayout = (page: ReactNode) => <CommonPage>{page}</CommonPage>;

export default ClientSettings;
