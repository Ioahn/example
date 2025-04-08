import { YandexMetricaProvider } from 'next-yandex-metrica';
import { AppProps } from 'next/app';
import process from 'process';

export const withYandexMetrica =
  (NextComponent: FCC<AppProps>) => (props: AppProps) => (
    <YandexMetricaProvider
      tagID={process.env.NEXT_PUBLIC_YA_METRIKA_APP_ID as unknown as number}
      initParameters={{
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
      }}
    >
      <NextComponent {...props} />
    </YandexMetricaProvider>
  );
