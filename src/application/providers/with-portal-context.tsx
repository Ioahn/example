import { AppProps } from 'next/app';
import { PortalProvider } from '@shared/providers';

export const withPortalContext =
  (NextComponent: FCC<AppProps>) => (props: AppProps) => (
    <PortalProvider>
      <NextComponent {...props} />
    </PortalProvider>
  );
