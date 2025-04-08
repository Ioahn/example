import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { wrapper } from '@app/store';
import { CommonPage } from '@shared/UI';

const DynamicSelectAreaTypes = dynamic(() =>
  import('@features/client').then(({ SelectAreaTypes }) => SelectAreaTypes)
);

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  return {
    props: {},
  };
});

const Topics = () => {
  return <DynamicSelectAreaTypes />;
};

Topics.getLayout = (page: ReactNode) => (
  <CommonPage
    headerType='withOverlay'
    navigationProps={{
      title: 'Подбор специалиста шаг 1/3',
    }}
  >
    {page}
  </CommonPage>
);

export default Topics;
