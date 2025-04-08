import '@globalStyles';
import dynamic from 'next/dynamic';
import { T, always, cond, propEq } from 'ramda';
import { APP_TYPES } from '@shared/constants';

const SPAApp = dynamic(() => import('@app/entries').then((mod) => mod.SPAApp));
const LandingApp = dynamic(() =>
  import('@app/entries').then((mod) => mod.LandingApp)
);

export default function App({ Component, pageProps }: AppProps) {
  const RenderedComponent = cond([
    [propEq(APP_TYPES.SPA, 'type'), always(SPAApp)],
    [propEq(APP_TYPES.LANDING, 'type'), always(LandingApp)],
    [T, always(SPAApp)],
  ])(pageProps);

  return (
    <RenderedComponent
      Component={Component}
      pageProps={pageProps}
      {...pageProps}
    />
  );
}
