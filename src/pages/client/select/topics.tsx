import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { wrapper } from '@app/store';
import { getTopicsThunk } from '@entities/models';
import { CommonPage } from '@shared/UI';
import { SELECTED_TOPICS_SLICE_NAME } from '@shared/constants';

const DynamicChooseTopics = dynamic(() =>
  import('@features/client').then(({ ChooseTopics }) => ChooseTopics)
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    const { areaType } = store.getState()[SELECTED_TOPICS_SLICE_NAME];

    await store.dispatch(getTopicsThunk({ area_type: areaType }));

    return {
      props: {},
    };
  }
);

const Topics = () => {
  return <DynamicChooseTopics />;
};

Topics.getLayout = (page: ReactNode) => (
  <CommonPage
    headerType='withOverlay'
    navigationProps={{
      title: 'Подбор специалиста 2/3',
    }}
  >
    {page}
  </CommonPage>
);

export default Topics;
