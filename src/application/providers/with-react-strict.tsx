import { AppProps } from 'next/app';
import { StrictMode } from 'react';

export const withReactStrict =
  (NextComponent: FCC<AppProps>) =>
  (props: AppProps & { disableReactStrict?: boolean }) => {
    if (props.disableReactStrict) {
      return <NextComponent {...props} />;
    }

    return (
      <StrictMode>
        <NextComponent {...props} />
      </StrictMode>
    );
  };
