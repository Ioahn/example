import { call, forEach } from 'ramda';

export const callFnByOrder = forEach<AnyFunction>(call);
