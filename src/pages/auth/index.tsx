import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { wrapper } from '@app/store';
import {
  selectAccountType,
  selectPhoneAuthStep,
  setAccountType,
  setCallbackUrl,
} from '@entities/models';
import { Authentication, CodeEnterStep, PhoneEnterStep } from '@features/auth';
import { TAccountType } from '@shared/api';
import { useStep } from '@shared/hooks';
import { CommonPage } from '@shared/UI';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (ctx) => {
    const { account = TAccountType.EClient, callbackUrl = '' } = ctx.query;
    store.dispatch(setAccountType(account as TAccountType));
    store.dispatch(setCallbackUrl(callbackUrl as string));

    return { props: {} };
  }
);

const SignIn = () => {
  const step = useSelector(selectPhoneAuthStep);
  const accountType = useSelector(selectAccountType);

  const { component } = useStep(
    [<PhoneEnterStep key='0' />, <CodeEnterStep key='1' />],
    step
  );

  return (
    <Authentication
      title={
        accountType === TAccountType.EClient
          ? 'Создайте аккаунт или войдите'
          : 'Вход для специалистов'
      }
    >
      {component}
    </Authentication>
  );
};

SignIn.getLayout = (page: ReactNode) => (
  <CommonPage
    headerType='withOverlay'
    navigationProps={{
      title: 'Авторизация',
    }}
  >
    {page}
  </CommonPage>
);

export default SignIn;
