import { TAreaType } from '@shared/api';
import { cn } from '@shared/utils';
import { WORKING_AREA_SPECIALIZATION } from '@shared/constants';

type WorkingAreasProps = {
  areas: TAreaType[];
  labelsMap?: Record<TAreaType, string>;
};

export function WorkingAreas({
  areas,
  labelsMap = WORKING_AREA_SPECIALIZATION,
  className,
}: CommonProps<WorkingAreasProps>) {
  return (
    <div className={cn('flex flex-wrap items-start gap-2 text-xs', className)}>
      {areas.map((area) => (
        <div
          key={area}
          className={cn('rounded-md px-2 py-1 text-content-inverse', {
            ['bg-content-accent-vivid']: area === TAreaType.ECoaching,
            ['bg-content-accent']: area === TAreaType.EPsychotherapy,
          })}
        >
          {labelsMap[area]}
        </div>
      ))}
    </div>
  );
}
