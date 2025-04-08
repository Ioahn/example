import dynamic from 'next/dynamic';
import { wrapper } from '@app/store';
import { getVideoSessionInfoThunkSSR, setRoomID } from '@entities/models';
import { VideoCall } from '@shared/UI';

const DynamicCallScreen = dynamic(
  () => import('@features/call').then(({ CallScreens }) => CallScreens),
  { ssr: false }
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const roomId = ctx?.params?.roomId as string;
    store.dispatch(setRoomID(roomId));

    await store.dispatch(getVideoSessionInfoThunkSSR({ payload: { roomId } }));

    return {
      props: {
        disableReactStrict: true,
      },
    };
  }
);

/**
 * Отключен ReactStrict для видеозвонков из-за сложностей при дев разработке
 */
export default function CallScreensPage() {
  return (
    <VideoCall>
      <DynamicCallScreen />
    </VideoCall>
  );
}
