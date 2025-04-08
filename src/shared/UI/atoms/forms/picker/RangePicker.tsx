import { NumberFormatOptions } from '@internationalized/number';
import { useEffect, useMemo, useRef } from 'react';
import { AriaSliderProps, useNumberFormatter, useSlider } from 'react-aria';
import { useSliderState } from 'react-stately';
import { cn } from '@shared/utils';
import { Thumb } from './Thumb';

type Props = CommonProps &
  AriaSliderProps<number[]> & {
    formatOptions?: NumberFormatOptions | undefined;
  };

export const RangePicker = function RangePicker(props: Props) {
  const trackRef = useRef(null);
  const { className, maxValue } = props;
  const numberFormatter = useNumberFormatter(props.formatOptions);
  const state = useSliderState({ ...props, numberFormatter });
  const { groupProps, trackProps, labelProps, outputProps } = useSlider(
    props,
    state,
    trackRef
  );

  useEffect(() => {
    if (maxValue && state.getThumbValue(1) > maxValue) {
      state.setThumbValue(1, maxValue);
    }
  }, [state, maxValue]);

  return (
    <div {...groupProps} className={cn('flex flex-col gap-4', className)}>
      <div className='flex justify-between text-content-secondary'>
        {props.label && <label {...labelProps}>{props.label}</label>}
        <output {...outputProps} className='ml-auto'>
          {`${state.getThumbValueLabel(0)} - ${state.getThumbValueLabel(1)}`}
        </output>
      </div>
      <div className='px-2'>
        <div
          {...trackProps}
          ref={trackRef}
          className='h-1 rounded-full bg-[#C1C7DE] w-full'
        >
          <div className='w-full absolute top-[1px]'>
            <Thumb index={0} state={state} trackRef={trackRef} />
            <Thumb index={1} state={state} trackRef={trackRef} />
          </div>
          <div
            className='absolute h-1 bg-content-accent transition-all z-0'
            style={useMemo(
              () => ({
                left: `${state.getThumbPercent(0) * 100}%`,
                width: `${(state.getThumbPercent(1) - state.getThumbPercent(0)) * 100}%`,
              }),
              [state]
            )}
          />
        </div>
      </div>
    </div>
  );
};
