import { RefObject, useRef } from 'react';
import {
  AriaSliderThumbOptions,
  VisuallyHidden,
  mergeProps,
  useFocusRing,
  useSliderThumb,
} from 'react-aria';
import { SliderState } from 'react-stately';

type Props = Omit<AriaSliderThumbOptions, 'inputRef'> & {
  state: SliderState;
  inputRef?: RefObject<HTMLInputElement>;
};

export const Thumb = function Thumb(props: Props) {
  const { state, trackRef, index, name } = props;
  const inputRef = useRef(null);
  const { thumbProps, inputProps, isDragging } = useSliderThumb(
    {
      index,
      trackRef,
      inputRef,
      name,
    },
    state
  );

  const { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div
      {...thumbProps}
      className='w-4 h-4 z-10 rounded-full bg-content-inverse outline outline-1 outline-content-tertiary cursor-pointer transition-all'
      data-focused={isFocusVisible || isDragging}
    >
      <VisuallyHidden>
        <input ref={inputRef} {...mergeProps(inputProps, focusProps)} />
      </VisuallyHidden>
    </div>
  );
};
