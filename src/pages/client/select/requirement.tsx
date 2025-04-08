import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { wrapper } from '@app/store';
import { CommonPage } from '@shared/UI';

const DynamicSelectRequirements = dynamic(() =>
  import('@features/client').then(
    ({ SelectRequirements }) => SelectRequirements
  )
);

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  return {
    props: {},
  };
});

const Topics = () => {
  return <DynamicSelectRequirements />;
};

Topics.getLayout = (page: ReactNode) => (
  <CommonPage
    headerType='withOverlay'
    navigationProps={{
      title: 'Подбор специалиста шаг 3/3',
    }}
  >
    {page}
  </CommonPage>
);

export default Topics;
