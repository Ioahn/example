import { fromAbsolute, toTime } from '@internationalized/date';

type Props = PropsWithClassNames & {
  date: number;
  timeZone: string;
};

export const FormattedTime: FCC<Props> = function FormattedTime({
  date,
  timeZone,
  className,
}) {
  const timeZoneDate = fromAbsolute(date * 1000, timeZone);

  const time = toTime(timeZoneDate);
  const [hour, minutes] = time.toString().split(':');

  return (
    <p className={className}>
      {hour}:{minutes}
    </p>
  );
};
