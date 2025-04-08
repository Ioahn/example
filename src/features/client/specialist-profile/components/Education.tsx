import { ExpandableEducation } from '@features/client';
import { TSpecialistProfileResponseSchema } from '@shared/api';
import { cn } from '@shared/utils';
import { Card } from '@shared/UI';

type Props = Pick<
  TSpecialistProfileResponseSchema,
  'education' | 'additional_education'
>;

export const Education: FCC<Props> = ({
  className,
  education,
  additional_education,
}) => {
  return (
    <Card variant='secondary' className={cn('flex flex-col gap-6', className)}>
      <div className='flex flex-col gap-3'>
        <p className='font-bold'>Образование</p>
        <ExpandableEducation educationList={education} />
      </div>

      {additional_education?.length > 0 && (
        <div className='flex flex-col gap-3'>
          <p className='font-bold'>Дополнительное образование </p>
          <ExpandableEducation educationList={additional_education} />
        </div>
      )}
    </Card>
  );
};
