import { cn } from '@shared/utils';

export type TDisapprovalRecommendations = {
  disapproval_recommendations: string;
  isRead: boolean;
};

export const DisapprovalRecommendations: FCC<TDisapprovalRecommendations> = ({
  disapproval_recommendations,
  isRead,
}) => {
  return (
    <div
      className={cn('rounded-lg p-4', {
        ['bg-content-accent/10']: !isRead,
      })}
    >
      <div className='flex flex-col text-2xs'>
        <p className='font-semibold text-content-accent-vivid'>
          Изменения не приняты
        </p>
        <p className='mt-3'>{disapproval_recommendations}</p>
      </div>
    </div>
  );
};
