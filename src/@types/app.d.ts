type PropsWithClassNames = {
  className?: string;
};

type CommonProps<T = unknown> = React.PropsWithChildren<
  PropsWithClassNames & T
>;

type FCC<T = unknown> = React.FC<CommonProps<T>>;

type ForwardProps<T = unknown> = React.PropsWithChildren<
  PropsWithClassNames & T
>;

type AppProps = import('next/app').AppProps & {
  Component: AppProps['Component'] & {
    getLayout?: (node: import('react').ReactNode) => import('react').ReactNode;
  };
};
