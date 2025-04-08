const withPlugins = require('next-compose-plugins');
const { withSentryConfig } = require('@sentry/nextjs');
const withBundleAnalyzer = require('@next/bundle-analyzer');

const bundleAnalyzerOptions = {
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
};

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  output: 'standalone',
  assetPrefix: Boolean(process.env.NEXT_PUBLIC_CDN_SERVER)
    ? process.env.NEXT_PUBLIC_CDN_SERVER
    : undefined,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'storage.yandexcloud.net' },
      { protocol: 'https', hostname: 'mc.yandex.ru' },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: process.env.IGNORE_TYPECHECKING_WHILE_BUILD,
  },
  headers: async () => [
    {
      source: '/:all*(.png|.jpg|.jpeg|.gif|.svg)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'public, max-age=31536000, must-revalidate',
        },
      ],
    },
  ],
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/home',
      },
      {
        source: '/psychoterapy',
        destination: '/home/psychoterapy',
      },
      {
        source: '/business',
        destination: '/home/business',
      },
      {
        source: '/blogs',
        destination: '/blogs/1',
      },
    ];
  },
};

module.exports = withPlugins(
  [withBundleAnalyzer(bundleAnalyzerOptions)],
  nextConfig
);

module.exports = withSentryConfig(module.exports, {
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options

  org: 'sense-a-ln',
  project: 'sense-a-frontend',

  // Only print logs for uploading source maps in CI
  silent: true,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Automatically annotate React components to show their full name in breadcrumbs and session replay
  reactComponentAnnotation: {
    enabled: true,
  },

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Hides source maps from generated client bundles
  hideSourceMaps: true,

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});
