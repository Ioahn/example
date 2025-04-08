import { GregorianCalendar } from '@internationalized/date';
import { omit } from 'ramda';
import { useDateFormatter } from 'react-aria';
import { fl, removeEndingDot } from '@shared/utils';

type TDateContainer = {
  date: number;
  timeZone: string;
} & Partial<Intl.DateTimeFormatOptions>;

export const FormattedDate: FCC<TDateContainer> = ({
  date,
  className,
  timeZone,
  ...rest
}) => {
  const formatter = useDateFormatter({
    ...omit(['children'], rest),
    timeZone,
    calendar: typeof GregorianCalendar,
  });

  return (
    <span className={className}>
      {removeEndingDot(fl(formatter.format(new Date(date * 1000))))}
    </span>
  );
};
