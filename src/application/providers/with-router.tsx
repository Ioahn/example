import { AppProps } from 'next/app';
import { useRouter } from 'next/navigation';
import { RouterProvider } from 'react-aria';

export const withRouter =
  (NextComponent: FCC<AppProps>) => (props: AppProps) => {
    const router = useRouter();

    return (
      <RouterProvider navigate={router.push}>
        <NextComponent {...props} />
      </RouterProvider>
    );
  };
