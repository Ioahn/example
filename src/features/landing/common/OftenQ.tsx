import { RiArrowDropDownFill } from 'react-icons/ri';
import { Item, useToggleState } from 'react-stately';
import { cn } from '@shared/utils';
import { Card, Collapse, Container, List, ToggleButton } from '@shared/UI';

type Props = {
  items: {
    id: number;
    question: string;
    answer: string;
    index: number;
  }[];
};
export const OftenQ: FCC<Props> = ({ items }) => {
  return (
    <section>
      <Container className='grid-cols-6 grid md:grid-cols-12' type='landing'>
        <div className='h-8 md:h-[3.75rem] col-span-6 md:col-span-12' />
        <h3 className='col-span-6 md:col-span-12 font-galaxy-semibold text-center'>
          Частые вопросы
        </h3>
        <div className='h-8 md:h-[3.75rem] col-span-6 md:col-span-12' />
        <div className='col-span-6 md:col-span-12'>
          <List items={items} className='flex flex-col gap-2'>
            {({ id, question, answer }) => (
              <Item key={id} textValue={question}>
                <ExpandableQuestion
                  className='bg-bg-primary rounded-2xl p-8'
                  answer={answer}
                  question={question}
                />
              </Item>
            )}
          </List>
        </div>
        <div className='h-8 md:h-[3.75rem] col-span-6 md:col-span-12' />
      </Container>
    </section>
  );
};

type TExpandableQuestion = {
  question: string;
  answer: string;
};
const ExpandableQuestion: FCC<TExpandableQuestion> = ({
  className,
  answer,
  question,
}) => {
  const state = useToggleState({ defaultSelected: false });

  return (
    <Card
      className={cn('flex flex-col', className)}
      variant='primary'
      size='md'
    >
      <ToggleButton
        onPress={state.toggle}
        className='flex w-full max-w-none justify-between rounded-md'
        variant='clear'
      >
        <p className='text-left font-semibold'>{question}</p>
        <RiArrowDropDownFill
          className={cn(
            `text-lg transition-transform duration-150 ease-in w-8 h-8 rounded-full bg-bg-secondary shrink-0`,
            state.isSelected && 'rotate-180'
          )}
        />
      </ToggleButton>
      <Collapse isOpen={state.isSelected} className='pt-4'>
        <div className='flex flex-col gap-4'>{answer}</div>
      </Collapse>
    </Card>
  );
};
