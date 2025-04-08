import dynamic from 'next/dynamic';
import { ReactNode } from 'react';
import { RiCloseLine } from 'react-icons/ri';
import { wrapper } from '@app/store';
import { getClientProfileThunkSSR, openClientProfile } from '@entities/models';
import { useAppDispatch } from '@shared/hooks';
import { CommonPage } from '@shared/UI';
import { Button } from '@shared/UI';

const DynamicClientPostponeSlot = dynamic(() =>
  import('@features/client').then(({ PostponeSlot }) => PostponeSlot)
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async () => {
    await store.dispatch(getClientProfileThunkSSR());

    return {
      props: {},
    };
  }
);

export const CloseButton = ({ action }: { action: () => AnyObject }) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      startIcon={<RiCloseLine className='text-md' />}
      variant='clear'
      className='rounded-full'
      onPress={() => dispatch(action())}
    />
  );
};

const PostponePage = () => <DynamicClientPostponeSlot />;

PostponePage.getLayout = (page: ReactNode) => {
  return (
    <CommonPage
      headerType='withOverlay'
      navigationProps={{
        title: 'Перенос сессии',
        elements: () => <CloseButton action={openClientProfile} />,
      }}
    >
      {page}
    </CommonPage>
  );
};

export default PostponePage;
