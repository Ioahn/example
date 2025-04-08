import { createWrapper } from 'next-redux-wrapper';
import { isReduxWrapperLogsDisable } from '@shared/utils';
import { makeStore } from './make-store';

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: !isReduxWrapperLogsDisable(),
});
