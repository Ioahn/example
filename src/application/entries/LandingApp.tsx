import { CarrotQuest, VK } from '@shared/externals';
import { DefaultSeo } from 'next-seo';
import { compose } from 'ramda';
import { ReactNode } from 'react';
import {
  withLocale,
  withPortalContext,
  withReactStrict,
  withTheme,
  withYandexMetrica,
} from '@app/providers';
import { withRouter } from '@app/providers/with-router';
import { BRAND_JSON_LD, SEO } from '../../../next-seo.config';

function App({ Component, pageProps }: AppProps) {
  const getLayout = Component.getLayout || ((page: ReactNode) => page);

  return (
    <>
      {getLayout(<Component {...pageProps} />)}
      <DefaultSeo {...SEO} />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BRAND_JSON_LD) }}
      />
      <VK />
      {/*<RoiStat />*/}
      <CarrotQuest />
    </>
  );
}

export const LandingApp = compose(
  withYandexMetrica,
  withLocale,
  withTheme,
  withPortalContext,
  withRouter,
  withReactStrict
)(App);
