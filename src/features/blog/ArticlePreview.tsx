import { RiArrowRightUpLine } from 'react-icons/ri';
import { TShortBlogResponseSchema } from '@shared/api';
import { cn } from '@shared/utils';
import { Image, Link, WorkingAreas } from '@shared/UI';
import { WORKING_AREA_DICT } from '@shared/constants';

type Props = TShortBlogResponseSchema & {
  type?: 'line' | 'square';
};

export const ArticlePreview: FCC<Props> = ({
  className,
  preview_image,
  title,
  id,
  body_preview,
  type = 'square',
  areas = [],
  tags = [],
}) => {
  return (
    <Link
      className={cn(
        `group type-${type}`,
        'w-full no-underline hover:no-underline',
        className
      )}
      href={`/blogs/article/${id}`}
      prefetch
    >
      <div className='flex md:gap-8 gap-4 group-[.type-square]:flex-col'>
        <div className='relative group-[.type-square]:w-full flex-shrink-0 group-[.type-line]:w-1/2'>
          <div className='relative aspect-w-3 aspect-h-2'>
            <Image
              fill
              src={preview_image}
              alt={preview_image}
              className='object-cover'
            />
          </div>
          <div className='absolute p-4 inset-0'>
            <WorkingAreas
              areas={areas}
              labelsMap={WORKING_AREA_DICT}
              className='bottom absolute !font-grain'
            />
          </div>
        </div>
        <div className='flex gap-4 flex-col'>
          <div className='flex gap-4 justify-between'>
            <p className='text-content-primary font-semibold md:text-md'>
              {title}
            </p>
            <RiArrowRightUpLine className='text-xl text-content-secondary' />
          </div>
          <div
            className='font-base text-content-secondary group-[.type-square]:line-clamp-4'
            dangerouslySetInnerHTML={{ __html: body_preview }}
          />
          <div className='flex gap-4 flex-nowrap'>
            {tags.map((tag) => (
              <span key={tag} className='text-content-tertiary flex font-grain'>
                {'//'} {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};
