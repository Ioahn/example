import axiosRetry from 'axios-retry';
import { Api, HttpClient } from './senseApi';

export const { api: senseApi, http } = new Api(
  new HttpClient({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL })
);

axiosRetry(http.instance, {
  retries: 3,
  retryDelay: () => 3000,
  retryCondition: (error) => {
    return error.response?.status === 502 || error.response?.status === 504;
  },
});
