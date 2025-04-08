import NextImage, { ImageLoader, ImageProps } from 'next/image';

export const Image: FCC<ImageProps> = (props) => {
  const imageLoader: ImageLoader = ({ src, width, quality }) => {
    if (!src.includes('.png') && !src.includes('.jpg')) {
      return src;
    }
    if (src.includes('_next/static')) {
      return src;
    }

    const cdnStorageURLPrefix = `https://storage.yandexcloud.net/${process.env.NEXT_PUBLIC_CDN_STORAGE_BUCKET}/`;

    if (src.startsWith(cdnStorageURLPrefix)) {
      src = src.replace(cdnStorageURLPrefix, '');
    } else {
      src = `frontend-assets/${src}`.replace('//', '/');
    }

    const params = [
      `${width}x0`,
      `filters:quality(${quality || 75}):format(webp)`,
    ];

    return `${process.env.NEXT_PUBLIC_CDN_ASSETS_SERVER}/unsafe/${params.join('/')}/${src}`;
  };

  if (process.env.NEXT_PUBLIC_CDN_ASSETS_SERVER) {
    return <NextImage {...props} loader={imageLoader} />;
  }

  return <NextImage {...props} />;
};
