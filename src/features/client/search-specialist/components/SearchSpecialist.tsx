import dynamic from 'next/dynamic';
import { useCallback } from 'react';
import { RiEqualizerLine } from 'react-icons/ri';
import {
  openTopicFilter,
  selectShowNotification,
  selectSpecialists,
  specialistNextPage,
} from '@entities/models';
import { OpenModalButton, SpecialistCard } from '@features/client';
import { useAppDispatch, useAppSelector, useTrigger } from '@shared/hooks';
import { Container, Notify } from '@shared/UI';

const DynamicFilterTopics = dynamic(() =>
  import('@features/client').then(({ FilterTopics }) => FilterTopics)
);

export const SearchSpecialist: FCC = () => {
  const specialist = useAppSelector(selectSpecialists);
  const showNotification = useAppSelector(selectShowNotification);
  const dispatch = useAppDispatch();

  const triggerRef = useTrigger({
    trigger: () => dispatch(specialistNextPage()),
    threshold: 1000,
    watch: !!specialist.length,
  });

  const onFilterOpen = useCallback(
    () => dispatch(openTopicFilter()),
    [dispatch]
  );

  return (
    <>
      <Container className='grid grid-cols-6 gap-4 md:grid-cols-12'>
        <div className='col-span-6 mt-4 flex items-center justify-between md:col-span-8 md:col-start-3'>
          <h1 className='font-semibold max-md:text-md sm:text-lg'>
            Наши специалисты
          </h1>
          <OpenModalButton
            onOpen={onFilterOpen}
            startIcon={<RiEqualizerLine className='text-md sm:hidden' />}
            modalRender={(onClose) => <DynamicFilterTopics onClose={onClose} />}
          >
            <span className='max-md:hidden'>Фильтры</span>
          </OpenModalButton>
        </div>
        {showNotification && (
          <Notify
            type='info'
            className='col-span-6 text-xs md:col-span-8 md:col-start-3'
          >
            Мы подобрали лучших специалистов, которые работают с темами из
            вашего списка
          </Notify>
        )}
        {specialist.map((props) => (
          <SpecialistCard
            {...props}
            key={props.id}
            className='col-span-6 md:col-span-8 md:col-start-3'
          />
        ))}
      </Container>
      <div ref={triggerRef} />
    </>
  );
};
