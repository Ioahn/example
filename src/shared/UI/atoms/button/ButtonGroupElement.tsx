import { AriaCheckboxGroupItemProps } from '@react-types/checkbox';
import { ReactElement, useContext, useRef } from 'react';
import { VisuallyHidden, useCheckboxGroupItem } from 'react-aria';
import { cn, safe } from '@shared/utils';
import { KeyboardFocus } from '@shared/UI';
import { ButtonGroupContext } from './ButtonGroupContext';

type Props = AriaCheckboxGroupItemProps & {
  children: ((isSelected: boolean) => ReactElement) | ReactElement;
};

export const ButtonGroupElement: FCC<Props> = (props) => {
  const state = useContext(ButtonGroupContext);
  const ref = useRef(null);
  const { inputProps } = useCheckboxGroupItem(props, safe(state), ref);
  const isSelected = state?.isSelected(props.value) || false;

  return (
    <KeyboardFocus>
      <label className={cn(props.className)} aria-selected={isSelected}>
        <VisuallyHidden>
          <input {...inputProps} ref={ref} />
        </VisuallyHidden>
        {typeof props.children === 'function'
          ? props.children(isSelected)
          : props.children}
      </label>
    </KeyboardFocus>
  );
};
