import { AppProps } from 'next/app';
import { ThemeProvider } from '@shared/providers';

export const withTheme =
  (NextComponent: FCC<AppProps>) => (props: AppProps) => (
    <ThemeProvider>
      <NextComponent {...props} />
    </ThemeProvider>
  );
