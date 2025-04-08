import { ConnectedRouter } from 'connected-next-router';
import { AppProps } from 'next/app';

export const withConnectedNextRouter =
  (NextComponent: FCC<AppProps>) => (props: AppProps) => (
    <ConnectedRouter>
      <NextComponent {...props} />
    </ConnectedRouter>
  );
