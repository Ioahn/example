import { AppProps } from 'next/app';
import { I18nProvider } from 'react-aria';

export const withLocale =
  (NextComponent: FCC<AppProps>) => (props: AppProps) => (
    <I18nProvider locale='ru-RU'>
      <NextComponent {...props} />
    </I18nProvider>
  );
