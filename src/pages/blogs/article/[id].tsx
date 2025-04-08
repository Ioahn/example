import React from 'react';
import { Article, PreviewImage } from '@features/blog';
import { footer } from '@features/landing/content/footer';
import { navigation } from '@features/landing/content/navigation';
import { TBlogResponseSchema, senseApi } from '@shared/api';
import {
  BreadcrumbItem,
  Breadcrumbs,
  CommonFooter,
  Container,
  HeaderWithOverlay,
  Navigation,
} from '@shared/UI';
import { APP_TYPES } from '@shared/constants';

type Props = {
  footer: typeof footer;
  blog: TBlogResponseSchema;
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { data } = await senseApi.getBlogs({ page_num: 1, page_size: 100 });
//
//   return {
//     paths: data?.blogs?.map(({ id }) => ({ params: { id } })) || [],
//     fallback: false,
//   };
// };

export const getServerSideProps = async ({ params }: AnyObject) => {
  const id = params?.id as string;

  const { data } = await senseApi.getBlog(id);

  return {
    props: {
      footer,
      blog: data,
      type: APP_TYPES.LANDING,
    },
    revalidate: 60,
  };
};

const ArticlePage: FCC<Props> = function ArticlePage({ footer, blog }) {
  return (
    <div className='relative bg-bg-secondary'>
      <HeaderWithOverlay
        variant='secondary'
        className='z-20 max-md:absolute w-full relative bg-transparent'
        noShadow
        elements={() => (
          <Navigation menus={navigation} className='md:ml-4 ml-auto w-full' />
        )}
      />
      <main className='relative'>
        <div className='md:h-16 h-24' />
        <Container>
          <Breadcrumbs>
            <BreadcrumbItem href='/'>Главная</BreadcrumbItem>
            <BreadcrumbItem href='/blogs'>Блог</BreadcrumbItem>
            <BreadcrumbItem>{blog.title}</BreadcrumbItem>
          </Breadcrumbs>
        </Container>
        <div className='h-4' />
        <Container>
          <PreviewImage {...blog} className='w-full' />
        </Container>
        <div className='md:h-12 h-8' />
        <Article {...blog} />
        <div className='h-32' />
      </main>
      <CommonFooter menus={footer} />
    </div>
  );
};

export default ArticlePage;
