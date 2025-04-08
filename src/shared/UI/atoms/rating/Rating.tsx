import { RadioGroupState } from '@react-stately/radio';
import { AriaRadioGroupProps, AriaRadioProps } from '@react-types/radio';
import { add, times } from 'ramda';
import { useContext, useRef } from 'react';
import { VisuallyHidden, useLabel, useRadio } from 'react-aria';
import { RiStarFill, RiStarLine } from 'react-icons/ri';
import { RadioContext, RadioGroup } from '@shared/UI';

type Props = {
  maxValue?: number;
};

export const Rating: FCC<AriaRadioGroupProps & Props> = (props) => {
  const { maxValue = 5 } = props;

  return (
    <RadioGroup {...props} aria-label='Рейтинг'>
      <div className='flex gap-2'>
        {times(add(1), maxValue).map((value) => (
          <Star key={value} value={`${value}`} />
        ))}
      </div>
    </RadioGroup>
  );
};

const Star: FCC<AriaRadioProps> = (props) => {
  const { value } = props;
  const state = useContext(RadioContext) as RadioGroupState;
  const ref = useRef(null);
  const { inputProps } = useRadio(props, state, ref);

  const isSelected = +(state.selectedValue || 0) < +value;
  const { labelProps } = useLabel(props);

  return (
    <label {...labelProps}>
      <VisuallyHidden>
        <input {...inputProps} ref={ref} />
      </VisuallyHidden>
      {isSelected ? (
        <RiStarLine
          key={value}
          className='text-lg text-content-secondary/50 cursor-pointer hover:scale-125 active:scale-95 transition-all'
        />
      ) : (
        <RiStarFill
          key={value}
          className='text-lg text-content-golden cursor-pointer hover:scale-125 active:scale-95 transition-all'
        ></RiStarFill>
      )}
    </label>
  );
};
