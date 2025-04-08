import { animated } from '@react-spring/web';
import { RadioGroupState } from '@react-stately/radio';
import { AriaRadioGroupProps, AriaRadioProps } from '@react-types/radio';
import { useRef } from 'react';
import { VisuallyHidden, useRadio, useRadioGroup } from 'react-aria';
import { useRadioGroupState } from 'react-stately';
import { cn } from '@shared/utils';
import { useAnimatedUnderline } from '@shared/hooks';
import { CardCollapser, KeyboardFocus } from '@shared/UI';

type Props = AriaRadioGroupProps & {
  category?: string;
  defaultValue?: string;
  options: OptionButtonGroup[];
};

export function RadioButtonGroup(props: CommonProps<Props>) {
  const { className, category, options } = props;
  const radioState = useRadioGroupState(props);
  const { radioGroupProps } = useRadioGroup(
    { ...props, label: category },
    radioState
  );

  const { renderElements, underlineProps, containerRef } = useAnimatedUnderline(
    {
      activeElement: radioState.selectedValue as string,
      items: options,
    }
  );

  return (
    <CardCollapser className={className} title={category}>
      <div
        className='flex flex-nowrap md:items-center gap-4 max-md:flex-col relative'
        {...radioGroupProps}
        ref={containerRef}
      >
        {renderElements((option, createRef) => (
          <div key={props.id} ref={createRef(option.id)}>
            <RadioButton {...option} state={radioState} />
          </div>
        ))}
        <animated.div
          style={underlineProps}
          className='animated-underline rounded-4xl'
        />
      </div>
    </CardCollapser>
  );
}

function RadioButton({
  state,
  icon: Icon,
  label,
  description,
  ...rest
}: CommonProps<
  Props['options'][0] & AriaRadioProps & { state: RadioGroupState }
>) {
  const ref = useRef(null);
  const { inputProps, isSelected } = useRadio(
    { ...rest, 'aria-label': label },
    state,
    ref
  );

  return (
    <KeyboardFocus>
      <label
        className={cn(
          'p-2 pr-4 gap-2 flex min-h-14 items-center outline-none cursor-pointer border border-content-secondary/30 bg-bg-secondary transition rounded-full',
          { ['bg-bg-primary']: isSelected, ['justify-center pl-4']: !Icon }
        )}
      >
        <VisuallyHidden>
          <input ref={ref} {...inputProps} />
        </VisuallyHidden>
        {Icon && (
          <div
            className={cn('p-2 rounded-full bg-bg-primary transition', {
              ['bg-bg-secondary']: isSelected,
            })}
          >
            <Icon className='text-md' />
          </div>
        )}
        <div className='text-center flex flex-col'>
          <p>{label}</p>
          {description && (
            <p className='text-xs text-content-secondary px-6'>{description}</p>
          )}
        </div>
      </label>
    </KeyboardFocus>
  );
}
