import React from 'react';
import { ArticleAuthor } from '@features/blog/ArticleAuthor';
import { ArticleCTA } from '@features/blog/ArticleCTA';
import { TBlogResponseSchema } from '@shared/api';
import { Container } from '@shared/UI';

export const Article: FCC<TBlogResponseSchema> = ({
  body,
  author_full_name,
  author_avatar_url,
  tags,
}) => {
  return (
    <section>
      <Container className='grid md:grid-cols-12 grid-cols-6 gap-4'>
        <div
          className='blog md:col-span-8 md:col-start-3 col-span-6'
          dangerouslySetInnerHTML={{ __html: body }}
        />
      </Container>
      <Container className='grid md:grid-cols-12 grid-cols-6'>
        {tags && (
          <>
            <div className='md:h-8 h-4 md:col-span-8 md:col-start-3 col-span-6' />
            <div className='flex gap-4 md:col-span-8 md:col-start-3 col-span-6'>
              {tags?.map((tag) => (
                <span
                  key={tag}
                  className='text-content-tertiary flex font-grain'
                >
                  {'//'} {tag}
                </span>
              ))}
            </div>
          </>
        )}
        <div className='md:h-16 h-8 md:col-span-8 md:col-start-3 col-span-6' />
        <ArticleAuthor
          name={author_full_name}
          img={author_avatar_url}
          className='md:col-span-8 md:col-start-3 col-span-6'
        />
        <div className='md:h-16 h-8 md:col-span-8 md:col-start-3 col-span-6' />
        <ArticleCTA className='md:col-span-8 md:col-start-3 col-span-6' />
      </Container>
    </section>
  );
};
