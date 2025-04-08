import { ReactNode } from 'react';
import { wrapper } from '@app/store';
import { getClientProfileThunkSSR, setRoomID } from '@entities/models';
import { Feedback } from '@features/call';
import { CommonPage } from '@shared/UI';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const roomID = ctx?.params?.roomId as string;
    store.dispatch(setRoomID(roomID));
    await store.dispatch(getClientProfileThunkSSR());

    return {
      props: {},
    };
  }
);

const FeedbackPage = () => {
  return <Feedback />;
};

FeedbackPage.getLayout = (page: ReactNode) => <CommonPage>{page}</CommonPage>;

export default FeedbackPage;
