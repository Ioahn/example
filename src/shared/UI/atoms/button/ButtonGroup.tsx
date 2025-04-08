import {
  AriaCheckboxGroupProps,
  CheckboxGroupProps,
} from '@react-types/checkbox';
import { useCheckboxGroup } from 'react-aria';
import { useCheckboxGroupState } from 'react-stately';
import { ButtonGroupContext } from './ButtonGroupContext';

export const ButtonGroup: FCC<AriaCheckboxGroupProps & CheckboxGroupProps> = (
  props
) => {
  const state = useCheckboxGroupState(props);
  const { groupProps } = useCheckboxGroup(props, state);

  return (
    <div {...groupProps} className={props.className}>
      <ButtonGroupContext.Provider value={state}>
        {props.children}
      </ButtonGroupContext.Provider>
    </div>
  );
};
