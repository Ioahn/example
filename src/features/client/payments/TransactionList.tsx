import { RiArrowLeftRightLine } from 'react-icons/ri';
import { Item } from 'react-stately';
import {
  nextTransactions,
  selectAllClientTransactions,
  selectTimezone,
} from '@entities/models';
import { TClientTransactionEntrySchema } from '@shared/api';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { AsyncList, Card, FormattedDate } from '@shared/UI';

const Transaction: FCC<TClientTransactionEntrySchema> = ({ date, title }) => {
  const timeZone = useAppSelector(selectTimezone);

  return (
    <div className='flex items-center gap-4'>
      <div className='p-2 rounded-full bg-bg-tertiary'>
        <RiArrowLeftRightLine className='text-md' />
      </div>
      <div>
        <FormattedDate
          date={date}
          day='2-digit'
          month='long'
          year='numeric'
          timeZone={timeZone}
          className='font-semibold'
        />{' '}
        оплачено {title}
      </div>
    </div>
  );
};

export const TransactionList = () => {
  const dispatch = useAppDispatch();
  const allTransactions = useAppSelector(selectAllClientTransactions);

  return (
    <Card variant='secondary' className='flex flex-col gap-4'>
      <h2 className='text-md font-semibold'>История списаний</h2>
      <AsyncList
        items={allTransactions}
        withAnchor
        loadMore={() => dispatch(nextTransactions())}
        className='flex flex-col gap-8'
        order='desc'
      >
        {(transaction) => (
          <Item key={transaction.id} textValue={transaction.title}>
            <Transaction {...transaction} />
          </Item>
        )}
      </AsyncList>
    </Card>
  );
};
