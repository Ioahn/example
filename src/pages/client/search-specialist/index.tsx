import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { wrapper } from '@app/store';
import { getSpecialistsListThunkSSR } from '@features/client';
import { CommonPage } from '@shared/UI';

const DynamicRecommendedSpecialist = dynamic(() =>
  import('@features/client').then(
    ({ RecommendedSpecialists }) => RecommendedSpecialists
  )
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getSpecialistsListThunkSSR());

    return {
      props: {},
    };
  }
);

const SearchSpecialistPage = () => {
  return <DynamicRecommendedSpecialist />;
};

SearchSpecialistPage.getLayout = (page: ReactNode) => (
  <CommonPage>{page}</CommonPage>
);

export default SearchSpecialistPage;
