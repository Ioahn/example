import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { wrapper } from '@app/store';
import { getSpecialistsProfileThunkSSR } from '@entities/models';
import { CommonPage } from '@shared/UI';
import {
  SELECTED_TOPICS_SLICE_NAME,
  SHORT_PROFILE_SLICE_NAME,
} from '@shared/constants';

const DynamicPublicSpecialistProfile = dynamic(() =>
  import('@features/client').then(
    ({ PublicSpecialistProfile }) => PublicSpecialistProfile
  )
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { id } = ctx.params as { id: string };

    const areaType =
      ctx.query.source === 'search'
        ? store.getState()[SELECTED_TOPICS_SLICE_NAME].areaType
        : store.getState()[SHORT_PROFILE_SLICE_NAME].current_area;

    await store.dispatch(getSpecialistsProfileThunkSSR({ id, areaType }));

    return {
      props: {},
    };
  }
);

const Profile = () => {
  return <DynamicPublicSpecialistProfile />;
};

Profile.getLayout = (page: ReactNode) => <CommonPage>{page}</CommonPage>;

export default Profile;
