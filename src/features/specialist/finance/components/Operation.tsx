import { GregorianCalendar } from '@internationalized/date';
import { groupWith } from 'ramda';
import { useDateFormatter } from 'react-aria';
import { nextPage, selectOperations } from '@entities/models';
import { OperationItem } from '@features/specialist';
import { TSpecialistFinanceOperationSchema } from '@shared/api';
import { cn, fl } from '@shared/utils';
import { useAppDispatch, useAppSelector, useTrigger } from '@shared/hooks';

export const Operation: FCC = ({ className }) => {
  const operations = useAppSelector(selectOperations);
  const dispatch = useAppDispatch();

  const trigger = useTrigger({
    trigger: () => dispatch(nextPage()),
    watch: !!operations.length,
    threshold: 1000,
  });

  const monthYearFormatter = useDateFormatter({
    month: 'long',
    year: 'numeric',
    calendar: typeof GregorianCalendar,
  });

  const byMonth = groupWith(
    (
      a: TSpecialistFinanceOperationSchema,
      b: TSpecialistFinanceOperationSchema
    ) => {
      return (
        monthYearFormatter.format(new Date(a.date * 1000)) ===
        monthYearFormatter.format(new Date(b.date * 1000))
      );
    }
  );

  const operationByMonth = byMonth(operations);

  return (
    <div className={cn('flex flex-col gap-4', className)}>
      {operationByMonth.map((operationList) => (
        <div key={operationList[0].date} className='flex flex-col gap-4'>
          <div className='text-content-secondary'>
            {fl(
              monthYearFormatter.format(new Date(operationList[0].date * 1000))
            )}
          </div>
          {operationList.map((props) => (
            <OperationItem {...props} key={props.id} />
          ))}
        </div>
      ))}
      <div ref={trigger} />
    </div>
  );
};
