import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '@app/store';

export const withStore =
  (NextComponent: FCC<AppProps>) => (appProps: AppProps) => {
    const { store, props } = wrapper.useWrappedStore(appProps);

    return (
      <Provider store={store}>
        <NextComponent {...props} />
      </Provider>
    );
  };
