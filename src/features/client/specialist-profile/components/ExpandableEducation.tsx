import { RiBook2Line } from 'react-icons/ri';
import { useToggleState } from 'react-stately';
import { IconWithDescription } from '@features/client';
import { TCareerEntry } from '@shared/api';
import { cn } from '@shared/utils';
import { Collapse, ToggleButton } from '@shared/UI';

type Props = {
  educationList?: TCareerEntry[];
  maxVisible?: number;
};

export const ExpandableEducation: FCC<Props> = ({
  maxVisible = 3,
  educationList,
}) => {
  const state = useToggleState({ defaultSelected: false });

  return (
    <div className='flex flex-wrap gap-4 flex-col'>
      <Collapse isOpen>
        {educationList
          ?.slice(0, state.isSelected ? educationList?.length : maxVisible)
          ?.map(({ year, name }) => (
            <IconWithDescription
              key={name + year}
              icon={<RiBook2Line />}
              description={name}
              value={year}
              variant='secondary'
            />
          ))}
      </Collapse>
      <ToggleButton
        onPress={state.toggle}
        className={cn(
          'flex w-full max-w-none justify-between rounded-md',
          maxVisible > (educationList?.length || 0) && 'hidden'
        )}
        variant='clear'
      >
        <h2 className='font-bold text-content-tertiary'>
          {state.isSelected ? 'Скрыть' : 'Подробнее'}
        </h2>
      </ToggleButton>
    </div>
  );
};
