import { ReactElement } from 'react';
import { cn } from '@shared/utils';

type Props = {
  stage: number;
  title: string;
  description: string | ReactElement;
};
export const StageCard: FCC<Props> = ({
  stage,
  title,
  description,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'bg-bg-tertiary rounded-2xl p-6 flex flex-col gap-4',
        className
      )}
    >
      <div className='text-3lg w-[2rem] h-[2rem] rounded-full bg-content-accent flex flex-col justify-center items-center text-content-inverse'>
        {stage}
      </div>
      <h3 className='font-rock-semibold'>{title}</h3>
      <p className='font-base'>{description}</p>
      <div className='mt-auto'>{children}</div>
    </div>
  );
};
