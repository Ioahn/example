import 'next/types';

declare module 'next/types' {
  type GetServerSidePropsContext = {
    shouldRedirectToAuth?: boolean;
  };
}
