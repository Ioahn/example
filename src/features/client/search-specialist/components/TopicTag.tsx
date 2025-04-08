import { TAreaType } from '@shared/api';
import { cn } from '@shared/utils';

type TopicTagProps = {
  area: TAreaType;
  name: string;
};
export const TopicTag: FCC<TopicTagProps> = ({ area, name, className }) => (
  <div
    className={cn(
      'flex items-center gap-1 rounded-md bg-bg-primary px-2 py-1 before:block before:rounded-full before:border-[3px] before:p-1 before:content-[""]',
      {
        ['before:bg-content-accent']: area === TAreaType.EPsychotherapy,
        ['before:bg-content-accent-vivid']: area === TAreaType.ECoaching,
      },
      className
    )}
  >
    {name}
  </div>
);
