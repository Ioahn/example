import { TTopicSchema } from '@shared/api';
import { cn } from '@shared/utils';
import { ButtonGroupElement, Image } from '@shared/UI';

export const TopicButton: FCC<TTopicSchema> = ({
  id,
  icon,
  name,
  area,
  category,
}) => {
  return (
    <ButtonGroupElement
      value={id}
      className={cn('group rounded-full', area)}
      aria-label={category}
    >
      <div className='flex h-12 cursor-pointer items-center gap-2 rounded-full border border-border-primary bg-content-inverse px-2 py-2 pr-6 transition-colors group-hover:bg-bg-primary group-aria-selected:border-transparent group-aria-selected:text-content-inverse group-aria-selected:group-[.coaching]:bg-content-accent-vivid group-aria-selected:group-[.psychotherapy]:bg-content-accent'>
        <span className='h-8 w-8 rounded-full bg-bg-primary p-1 transition-colors group-hover:bg-content-inverse group-aria-selected:bg-bg-primary'>
          {icon && (
            <Image
              src={icon}
              alt={name}
              width={32}
              height={32}
              className='group-aria-selected:group-[.coaching]:svg-accent-vivid group-aria-selected:group-[.psychotherapy]:svg-accent h-full w-full text-content-primary transition-all'
            />
          )}
        </span>
        {name}
      </div>
    </ButtonGroupElement>
  );
};
