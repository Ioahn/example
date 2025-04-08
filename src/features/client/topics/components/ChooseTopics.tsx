import { sendCarrotEventOnboardingTopicSelectionSubmitted } from '@shared/externals';
import {
  chooseTopic,
  openClientRequirement,
  selectMarkedTopicsIds,
  selectTopics,
} from '@entities/models';
import { Topics } from '@features/client';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, ButtonGroup, Container } from '@shared/UI';

export const ChooseTopics: FCC = () => {
  const categories = useAppSelector(selectTopics);
  const choseTopics = useAppSelector(selectMarkedTopicsIds);
  const dispatch = useAppDispatch();

  return (
    <Container className='grid grid-cols-6 gap-6 md:grid-cols-12'>
      <h1 className='col-span-6 mt-8 text-lg font-semibold md:col-span-8 md:col-start-3'>
        Отметьте интересующие вас темы для обсуждения
      </h1>
      <ButtonGroup
        className='col-span-6 flex flex-col gap-4 md:col-span-8 md:col-start-3'
        onChange={(value) => dispatch(chooseTopic(value))}
        defaultValue={choseTopics}
        label='Выберите темы'
      >
        {categories?.map(({ category, topics }) => (
          <Topics key={category} category={category} topics={topics} />
        ))}
      </ButtonGroup>
      <div className='col-span-6 mb-8 flex justify-end md:col-span-8 md:col-start-3'>
        <Button
          onPress={() => {
            dispatch(openClientRequirement());
            sendCarrotEventOnboardingTopicSelectionSubmitted({
              topics: choseTopics,
            });
          }}
        >
          Продолжить
        </Button>
      </div>
    </Container>
  );
};
