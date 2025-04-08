import { RiEqualizerLine } from 'react-icons/ri';
import { Item } from 'react-stately';
import { selectTimezone } from '@entities/models';
import {
  loadMoreSpecialists,
  selectAllSpecialist,
  selectFilters,
} from '@features/client';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { AsyncList, Container, OpenOverlayButton } from '@shared/UI';
import { SpecialistCard } from './SpecialistCard';

export function RecommendedSpecialists() {
  const recommendedSpecialists = useAppSelector(selectAllSpecialist);
  const timeZone = useAppSelector(selectTimezone);
  const { areaType } = useAppSelector(selectFilters);
  const dispatch = useAppDispatch();

  return (
    <Container className='grid grid-cols-6 gap-4 md:grid-cols-12'>
      <div className='col-span-6 mt-4 flex items-center justify-between md:col-span-8 md:col-start-3'>
        <h1 className='font-semibold max-md:text-md sm:text-lg'>
          Специалисты подходящие под ваш запрос
        </h1>
        <OpenOverlayButton
          modalRender={() => <div></div>}
          startIcon={<RiEqualizerLine className='text-md sm:hidden' />}
        >
          <span className='max-md:hidden'>Фильтры</span>
        </OpenOverlayButton>
      </div>
      <div className='col-span-6 md:col-span-8 md:col-start-3'>
        <AsyncList
          items={recommendedSpecialists}
          loadMore={() => dispatch(loadMoreSpecialists())}
        >
          {(specialist) => (
            <Item key={specialist.id} textValue={specialist.first_name}>
              <SpecialistCard
                timeZone={timeZone}
                area={areaType}
                {...specialist}
              />
            </Item>
          )}
        </AsyncList>
      </div>
    </Container>
  );
}
