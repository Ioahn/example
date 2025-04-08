import React from 'react';
import { AllArticles } from '@features/blog';
import { footer } from '@features/landing/content/footer';
import { navigation } from '@features/landing/content/navigation';
import { TShortBlogResponseSchema, senseApi } from '@shared/api';
import { CommonFooter, HeaderWithOverlay, Navigation } from '@shared/UI';
import { APP_TYPES } from '@shared/constants';

type Props = {
  navigation: typeof navigation;
  footer: typeof footer;
  blogs: TShortBlogResponseSchema[];
  page: number;
  totalPages: number;
};

// export const getStaticPaths: GetStaticPaths = async () => {
//   const { data } = await senseApi.getBlogs({ page_num: 1, page_size: 10 });
//
//   return {
//     paths:
//       Array.from({ length: data.total_pages || 1 }, (_, i) => `${i + 1}`).map(
//         (page) => ({
//           params: { page },
//         })
//       ) || [],
//     fallback: false,
//   };
// };

export const getServerSideProps = async ({ params }: AnyObject) => {
  try {
    const page = Number.parseInt(params?.page, 10);

    const { data } = await senseApi.getBlogs({ page_num: page, page_size: 10 });

    return {
      props: {
        navigation,
        footer,
        blogs: data.blogs,
        page,
        totalPages: data.total_pages,
        type: APP_TYPES.LANDING,
      },
    };
  } catch (err) {
    return {
      redirect: {
        destination: '/blogs/1',
        permanent: false,
      },
    };
  }
};

const AllArticlePage: FCC<Props> = function AllArticlePage({
  navigation,
  footer,
  blogs,
  page,
  totalPages,
}) {
  return (
    <div className='relative bg-bg-primary'>
      <HeaderWithOverlay
        variant='secondary'
        className='z-20 max-md:absolute w-full relative'
        elements={() => (
          <Navigation menus={navigation} className='md:ml-4 ml-auto w-full' />
        )}
      />
      <main className='relative'>
        <div className='h-16' />
        <AllArticles blogs={blogs} page={page} totalPages={totalPages} />
        <div className='md:h-32 h-16' />
      </main>
      <CommonFooter menus={footer} />
    </div>
  );
};

export default AllArticlePage;
