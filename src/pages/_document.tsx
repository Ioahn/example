import { Head, Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang='ru'>
      <Head>
        {/* Favicon */}
        <link rel='icon' href='/favicon.ico' sizes='any' />

        {/* Иконки для Apple устройств */}
        <link rel='apple-touch-icon' href='/apple-touch-icon.png' />

        {/* Иконки для Android */}
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />

        <link rel='manifest' href='/site.webmanifest' />

        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta name='theme-color' content='#ffffff' />

        {/* Дополнительные мета-теги */}
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, viewport-fit=cover'
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
