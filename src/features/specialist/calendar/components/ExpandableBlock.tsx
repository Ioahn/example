import { RiArrowDropDownFill } from 'react-icons/ri';
import { useToggleState } from 'react-stately';
import { cn } from '@shared/utils';
import { Collapse, ToggleButton } from '@shared/UI';

type Props = {
  title: string;
};

export const ExpandableBlock: FCC<Props> = ({ children, className, title }) => {
  const state = useToggleState({ defaultSelected: true });

  return (
    <div className={className}>
      <ToggleButton
        onPress={state.toggle}
        className='flex w-full max-w-none justify-between rounded-md'
        variant='clear'
      >
        <h3>{title}</h3>
        <RiArrowDropDownFill
          className={cn(
            `text-md transition-transform duration-150 ease-in shrink-0`,
            state.isSelected && 'rotate-180'
          )}
        />
      </ToggleButton>
      <Collapse isOpen={state.isSelected}>{children}</Collapse>
    </div>
  );
};
