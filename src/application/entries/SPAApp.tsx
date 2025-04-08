import { CarrotQuest, VK } from '@shared/externals';
import { DefaultSeo } from 'next-seo';
import { compose } from 'ramda';
import { ReactNode } from 'react';
import {
  withConnectedNextRouter,
  withLocale,
  withPortalContext,
  withReactStrict,
  withStore,
  withTheme,
  withYandexMetrica,
} from '@app/providers';
import { withRouter } from '@app/providers/with-router';
import { useOnMountApp } from '@shared/hooks';
import { ErrorBoundary, SomethingWrong } from '@shared/UI';
import { BRAND_JSON_LD, SEO } from '../../../next-seo.config';

function App({ Component, pageProps }: AppProps) {
  useOnMountApp();

  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <>
      <DefaultSeo {...SEO} />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BRAND_JSON_LD) }}
      />
      <ErrorBoundary fallback={<SomethingWrong />}>
        {getLayout(<Component {...pageProps} />)}
      </ErrorBoundary>
      <VK />
      {/*<RoiStat />*/}
      <CarrotQuest />
    </>
  );
}

export const SPAApp = compose(
  withYandexMetrica,
  withStore,
  withConnectedNextRouter,
  withLocale,
  withTheme,
  withPortalContext,
  withRouter,
  withReactStrict
)(App);
