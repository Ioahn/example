import { decompressFromEncodedURIComponent } from 'lz-string';

export const deserialize = (string = '') =>
  decompressFromEncodedURIComponent(string);
