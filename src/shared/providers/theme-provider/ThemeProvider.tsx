import { Montserrat } from 'next/font/google';
import { cn } from '@shared/utils';

const inter = Montserrat({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});

type Props = {
  theme?: 'light' | 'dark';
};
export const ThemeProvider: FCC<Props> = ({ theme = 'light', children }) => {
  return (
    <div
      className={cn('app scroll-smooth', theme, `${inter.variable} font-sans`)}
    >
      {children}
    </div>
  );
};
