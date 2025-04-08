'use client';

import { animated, config, useSpring, useTransition } from '@react-spring/web';
import { CheckboxGroupState } from '@react-stately/checkbox';
import {
  AriaCheckboxGroupItemProps,
  AriaCheckboxGroupProps,
} from '@react-types/checkbox';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  VisuallyHidden,
  useCheckboxGroup,
  useCheckboxGroupItem,
} from 'react-aria';
import { RiAddFill, RiCheckLine } from 'react-icons/ri';
import { useCheckboxGroupState } from 'react-stately';
import { useMeasure } from 'react-use';
import { cn } from '@shared/utils';
import { CardCollapser, KeyboardFocus, useResetKey } from '@shared/UI';

type CheckboxButtonGroupProps = AriaCheckboxGroupProps & {
  category?: string;
  resetKey?: string;
  options: OptionButtonGroup[];
};

export function CheckboxButtonGroup(
  props: CommonProps<CheckboxButtonGroupProps>
) {
  const { className, category, label, options, resetKey } = props;

  const state = useCheckboxGroupState(props);
  const { groupProps, labelProps } = useCheckboxGroup(props, state);

  useResetKey(state, resetKey);

  return (
    <CardCollapser className={className} title={category}>
      <div {...groupProps}>
        {label && <span {...labelProps}>{label}</span>}
        <div className='flex gap-4 flex-wrap'>
          {options.map(({ value, id, label: optionLabel }) => (
            <CheckboxButton
              value={value}
              key={id}
              state={state}
              label={optionLabel}
              isResetButton={resetKey === id}
            />
          ))}
        </div>
      </div>
    </CardCollapser>
  );
}

type CheckboxButtonProps = AriaCheckboxGroupItemProps & {
  state: CheckboxGroupState;
  label?: string;
  isResetButton?: boolean;
};

function CheckboxButton({
  state,
  className,
  label,
  isResetButton,
  ...rest
}: CommonProps<CheckboxButtonProps>) {
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  const ref = useRef(null);
  const [containerRef, { width: containerWidth }] =
    useMeasure<HTMLLabelElement>();
  const [labelRef, { width: labelWidth }] = useMeasure<HTMLDivElement>();
  const { inputProps, labelProps, isSelected } = useCheckboxGroupItem(
    rest,
    state,
    ref
  );

  const { x } = useSpring({
    from: { x: 1 },
    to: { x: 0 },
    immediate: isFirstRender,
    reverse: isSelected,
    config: config.stiff,
  });

  const iconStyle = useSpring({
    config: config.stiff,
    transform: isSelected
      ? `translate3d(${((containerWidth - 40) / 40) * 100}%, 0, 0) rotate(360deg)`
      : 'translate3d(0%, 0, 0) rotate(0deg)',
    backgroundColor: isSelected
      ? isResetButton
        ? '#535657'
        : '#35C0B7'
      : '#F6F3F0',
  });

  const transition = useTransition(isSelected ? 'check' : 'add', {
    from: { opacity: 0, transform: 'scale(0)' },
    enter: { opacity: 1, transform: 'scale(1)' },
    leave: { opacity: 0, transform: 'scale(0)' },
    config: config.stiff,
  });

  const finalLabelDestination = useMemo(
    () =>
      labelWidth > 0 ? ((containerWidth - labelWidth) / labelWidth) * -100 : 0,
    [containerWidth, labelWidth]
  );

  const midLabelDestination = useMemo(
    () => finalLabelDestination / 2,
    [finalLabelDestination]
  );

  return (
    <KeyboardFocus>
      <label
        className={cn(
          'p-2 pr-2 gap-2 outline-none cursor-pointer border border-content-secondary/30 bg-bg-secondary transition rounded-full',
          className
        )}
        ref={containerRef}
        {...labelProps}
      >
        <VisuallyHidden>
          <input ref={ref} {...inputProps} />
        </VisuallyHidden>
        <div className='flex items-center justify-between w-full'>
          <animated.div
            style={iconStyle}
            className={cn('w-10 h-10 rounded-full relative')}
          >
            {transition((style, item) => (
              <animated.div
                style={style}
                key={item}
                className='absolute inset-0 flex justify-center items-center'
              >
                {item === 'check' ? (
                  <RiCheckLine className='text-content-inverse text-md' />
                ) : (
                  <RiAddFill className='text-md' />
                )}
              </animated.div>
            ))}
          </animated.div>
          {label && (
            <animated.div
              style={{
                transform: x.to({
                  range: [0, 0.5, 1],
                  output: [
                    'translate3d(0%, 0, 0)',
                    `translate3d(${midLabelDestination}%, 0, 0)`,
                    `translate3d(${finalLabelDestination}%, 0, 0)`,
                  ],
                }),
                opacity: x.to({
                  range: [0, 0.5, 1],
                  output: [1, 0, 1],
                }),
              }}
              ref={labelRef}
            >
              <p className='p-2'>{label}</p>
            </animated.div>
          )}
        </div>
      </label>
    </KeyboardFocus>
  );
}
