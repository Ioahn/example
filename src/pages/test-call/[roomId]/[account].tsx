import dynamic from 'next/dynamic';
import { wrapper } from '@app/store';
import {
  getVideoSessionInfoThunkSSR,
  setProfileState,
  setRoomID,
} from '@entities/models';
import { TAccountType } from '@shared/api';
import { VideoCall } from '@shared/UI';

const DynamicCallScreen = dynamic(
  () => import('@features/call').then(({ CallScreens }) => CallScreens),
  { ssr: false }
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { roomId, account } = ctx?.params || {};
    store.dispatch(setRoomID(roomId as string));

    store.dispatch(
      setProfileState({
        id: account as string,
        account_type: account as TAccountType,
      })
    );

    await store.dispatch(
      getVideoSessionInfoThunkSSR({
        payload: { roomId, account, test: true },
      })
    );

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
