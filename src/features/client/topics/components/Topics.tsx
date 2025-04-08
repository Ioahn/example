import { RiArrowDropDownFill } from 'react-icons/ri';
import { useToggleState } from 'react-stately';
import { TTopicSchema } from '@shared/api';
import { cn } from '@shared/utils';
import { Card, Collapse, ToggleButton } from '@shared/UI';
import { TopicButton } from './TopicButton';

type Props = {
  category: string;
  topics?: TTopicSchema[];
};
export const Topics: FCC<Props> = ({ className, category, topics }) => {
  const state = useToggleState({ defaultSelected: true });

  return (
    <Card
      className={cn('flex flex-col', className)}
      variant='secondary'
      size='md'
    >
      <ToggleButton
        onPress={state.toggle}
        className='flex w-full justify-between'
        variant='clear'
        fullWidth
      >
        <h2 className='text-md font-semibold'>{category}</h2>
        <RiArrowDropDownFill
          className={cn(
            `text-lg transition-transform duration-150 ease-in`,
            state.isSelected && 'rotate-180'
          )}
        />
      </ToggleButton>
      <Collapse isOpen={state.isSelected} className='pt-5'>
        <div className='flex flex-wrap gap-4'>
          {topics?.map((props) => <TopicButton {...props} key={props.id} />)}
        </div>
      </Collapse>
    </Card>
  );
};
