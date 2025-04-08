import dotenv from 'dotenv';
import * as path from 'path';
import { generateApi } from 'swagger-typescript-api';

dotenv.config({ path: path.resolve('.env.local') });

generateApi({
  name: 'senseApi.ts',
  output: path.resolve(process.cwd(), './src/shared/api'),
  url: process.env.API_TEST_SPEC as string,
  httpClientType: 'axios',
  generateClient: true,
  generateRouteTypes: true,
  generateResponses: true,
  singleHttpClient: true,
  typePrefix: 'T',
  enumKeyPrefix: 'E',
});
