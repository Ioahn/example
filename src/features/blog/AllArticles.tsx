import { useRouter } from 'next/router';
import { ArticleCTA } from '@features/blog/ArticleCTA';
import { ArticlePreview } from '@features/blog/ArticlePreview';
import { SubscribeForm } from '@features/blog/subscribe-form';
import { TShortBlogResponseSchema } from '@shared/api';
import { cn } from '@shared/utils';
import { usePageIterator } from '@shared/hooks';
import { Container, Image } from '@shared/UI';

type Props = {
  blogs?: TShortBlogResponseSchema[];
  page: number;
  totalPages: number;
};
export const AllArticles: FCC<Props> = ({
  blogs,
  page: currentPage,
  totalPages,
}) => {
  const router = useRouter();

  const list = usePageIterator(currentPage, totalPages, (page) => {
    if (page === '<') {
      router.push(`/blogs/${+currentPage - 1}`);
      return;
    }

    if (page === '>') {
      router.push(`/blogs/${+currentPage + 1}`);
      return;
    }

    router.push(`/blogs/${page}`);
  });

  const [first, ...rest] = blogs || [];

  return (
    <section>
      <Container className='flex flex-col gap-16'>
        <div className='grid grid-cols-6 md:grid-cols-12'>
          <div className='md:col-start-5 md:col-span-4 col-span-6 flex items-center gap-4 max-md:justify-center'>
            <p className='font-universe-semibold'>Блог</p>
            <div className='relative md:w-[172px] md:h-[172px] shrink-0 w-[64px] h-[64px]'>
              <Image
                src='/Grey_Star.svg'
                alt='Блог. Коучинг и психотерапия'
                fill
              />
            </div>
            <div className='flex flex-col gap-4'>
              <p className='font-rock'>Коучинг</p>
              <p className='font-rock'>Психотерапия</p>
            </div>
          </div>
        </div>
        <div className='max-md:hidden'>
          <ArticlePreview type='line' {...first} />
        </div>
        <div className='md:hidden'>
          <ArticlePreview {...first} />
        </div>
        <div className='grid grid-cols-6 md:grid-cols-12 gap-x-4 gap-y-8'>
          {rest
            ?.slice(0, 6)
            .map((article) => (
              <ArticlePreview
                {...article}
                key={article.id}
                className='md:col-span-4 col-span-6'
              />
            ))}
        </div>
        <div className='grid-cols-6 md:grid-cols-12'>
          <ArticleCTA variant='secondary' className='bg-bg-secondary' />
        </div>
        <div className='grid grid-cols-6 md:grid-cols-12 gap-x-4 gap-y-8'>
          {rest
            ?.slice(6, 9)
            .map((article) => (
              <ArticlePreview
                {...article}
                key={article.id}
                className='md:col-span-4 col-span-6'
              />
            ))}
        </div>
        <div className='grid-cols-6 md:grid-cols-12 flex justify-center '>
          {list.map(({ page, handler }) => (
            <div
              key={page}
              onClick={handler}
              className={cn(
                'w-10 h-10 font-grain shrink-0 rounded-full cursor-pointer flex items-center justify-center',
                {
                  ['bg-content-accent text-content-inverse']:
                    page === currentPage,
                }
              )}
            >
              {page}
            </div>
          ))}
        </div>

        <div className='grid grid-cols-6 md:grid-cols-12'>
          <div className='md:col-span-11 md:col-start-2 col-span-6'>
            <SubscribeForm />
          </div>
        </div>
      </Container>
    </section>
  );
};
