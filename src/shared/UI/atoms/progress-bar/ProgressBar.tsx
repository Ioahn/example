import { AriaProgressBarProps, usePress, useProgressBar } from 'react-aria';
import { cn } from '@shared/utils';

type Props = AriaProgressBarProps & {
  withInteraction?: boolean;
  onPress?: (percent: number) => void;
};

export const ProgressBar: FCC<Props> = function ProgressBar(props) {
  const {
    withInteraction = true,
    className,
    label,
    value = 0,
    minValue = 0,
    maxValue = 100,
    onPress,
  } = props;
  const { progressBarProps, labelProps } = useProgressBar(props);

  const percentage = (value - minValue) / (maxValue - minValue);
  const barWidth = `${Math.round(percentage * 100)}%`;

  const { pressProps } = usePress({
    onPress: (e) => {
      const [{ width }, position] = [e.target.getBoundingClientRect(), e.x];
      onPress?.(position / width);
    },
  });

  return (
    <div {...progressBarProps} className={cn('group relative', className)}>
      {withInteraction && (
        <div
          className='absolute -inset-y-4 inset-x-0 cursor-pointer z-10'
          {...pressProps}
        />
      )}
      <div className='flex justify-between'>
        {label && <span {...labelProps}>{label}</span>}
        {label && <span>{progressBarProps['aria-valuetext']}</span>}
      </div>
      <div className='h-[2px] bg-bg-secondary/30 rounded-full relative'>
        <div
          className='h-[2px] bg-bg-primary relative'
          style={{ width: barWidth }}
        >
          {withInteraction && (
            <div className='absolute -right-[4px] top-[-3px] bg-bg-primary w-2 h-2 rounded-full scale-0 transition-all group-hover:scale-100' />
          )}
        </div>
      </div>
    </div>
  );
};
