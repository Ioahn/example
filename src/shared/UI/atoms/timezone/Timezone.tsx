import { useMemo } from 'react';
import { cn } from '@shared/utils';
import { TIMEZONES } from '@shared/constants';

type Props = {
  timeZone: string;
};

export const Timezone: FCC<Props> = function Timezone({ timeZone, className }) {
  const { ru_label } = useMemo(() => {
    return (
      TIMEZONES.find(({ timezone: tmz }) => tmz === timeZone) || {
        ru_label: '',
      }
    );
  }, [timeZone]);

  return (
    <div className={cn('flex gap-2 items-center', className)}>
      <div className='hidden md:block'>Тайм зона:</div>
      <p className='font-semibold max-md:text-2xs'>{ru_label}</p>
    </div>
  );
};
