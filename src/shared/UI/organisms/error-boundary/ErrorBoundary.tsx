import { createAction } from '@reduxjs/toolkit';
import { Component, ErrorInfo, ReactElement, cloneElement } from 'react';
import { connect } from 'react-redux';
import { addAppListener } from '@shared/utils';

export const setBoundaryError = createAction<string>('setBoundaryError');

type Props = {
  dispatch: AppDispatch;
  children: ReactElement | ReactElement[];
  fallback: ReactElement;
};
class Boundary extends Component<
  Props,
  { hasError: boolean; errorMessage: string }
> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    import('@sentry/nextjs').then((sentry) =>
      sentry.captureException({ error, errorInfo })
    );
  }

  componentDidMount() {
    this.props.dispatch(
      addAppListener({
        actionCreator: setBoundaryError,
        effect: ({ payload }) => {
          this.setState({ hasError: true, errorMessage: payload });
        },
      })
    );
  }

  render() {
    if (this.state.hasError) {
      return cloneElement(this.props.fallback, {
        errorMessage: this.state.errorMessage,
      });
    }

    return this.props.children;
  }
}

export const ErrorBoundary = connect(() => ({}))(Boundary);
