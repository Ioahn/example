import { cn } from '@shared/utils';
import { Image } from '@shared/UI';

type Props = {
  className?: string;
  img: string;
  name: string;
  description?: string;
};

export const ArticleAuthor = function ArticleAuthor({
  className,
  img,
  name,
  description,
}: Props) {
  return (
    <div className={cn('group flex items-center gap-4', className)}>
      <div className='relative overflow-hidden rounded-full md:w-[106px] md:h-[106px] w-[60px] h-[60px]'>
        <Image src={img} alt='' className='object-cover' fill />
      </div>
      <div className='flex flex-col gap-1'>
        <span className='font-grain text-content-secondary'>Автор статьи:</span>
        <span className='font-stone-semibold'>{name}</span>
        {description && <span className=''>{description}</span>}
      </div>
    </div>
  );
};
