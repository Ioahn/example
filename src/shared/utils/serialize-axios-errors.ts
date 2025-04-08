import { SerializedError } from '@reduxjs/toolkit';
import { path, split } from 'ramda';

export const commonErrorProperties: Array<{
  key: keyof SerializedError;
  path: string;
}> = [
  { key: 'name', path: 'name' },
  { key: 'message', path: 'message' },
  { key: 'stack', path: 'stack' },
  { key: 'code', path: 'code' },
  { key: 'status', path: 'response.status' },
  { key: 'detail', path: 'response.data.detail' },
];

export const serializeAxiosErrors = (
  value: IncompatibleType,
  properties = commonErrorProperties
) => {
  if (typeof value === 'object' && value !== null) {
    const simpleError: SerializedError = {};

    for (const { key, path: keyPath } of properties) {
      simpleError[key] = path<string | number>(
        split('.', keyPath),
        value
      ) as IncompatibleType;
    }

    return simpleError;
  }

  return { message: String(value) };
};
