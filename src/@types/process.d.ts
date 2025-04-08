declare namespace NodeJS {
  export interface ProcessEnv {
    BASE_PATH: string;
    NEXT_PUBLIC_API_BASE_URL: string;
    API_TEST_SPEC: string;

    SENTRY_DSN: string;
    SENTRY_AUTH_TOKEN: string;
    NEXT_DISABLE_REDUX_LOGS: boolean;

    NEXT_PUBLIC_CDN_SERVER: string;
    NEXT_PUBLIC_CDN_ASSETS_SERVER: string;
    NEXT_PUBLIC_CDN_STORAGE_BUCKET: string;
    NEXT_PUBLIC_APP_URL: string;
    NEXT_PUBLIC_ENVIRONMENT: string;
    NEXT_PUBLIC_YA_METRIKA_APP_ID: number;
    NEXT_PUBLIC_COTURN_IP1: string;
    NEXT_PUBLIC_COTURN_IP2: string;
    NEXT_PUBLIC_JITSI_HOST: string;
  }
}
