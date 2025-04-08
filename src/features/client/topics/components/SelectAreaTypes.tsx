import { animated } from '@react-spring/web';
import { useCallback } from 'react';
import {
  emptyTopics,
  getTopicsThunk,
  openClientTopics,
  selectRequirements,
  setAreaType,
} from '@entities/models';
import { AreaThumbnail } from '@features/client';
import { TAreaType } from '@shared/api';
import {
  useAnimatedUnderline,
  useAppDispatch,
  useAppSelector,
} from '@shared/hooks';
import { Button, Container } from '@shared/UI';

export const SelectAreaTypes = function SelectAreaTypes() {
  const dispatch = useAppDispatch();
  const { areaType } = useAppSelector(selectRequirements);

  const { renderElements, underlineProps, containerRef } = useAnimatedUnderline(
    {
      activeElement: areaType,
      items: [TAreaType.EPsychotherapy, TAreaType.ECoaching],
    }
  );

  const getComponent = useCallback(
    (
      area: TAreaType,
      createRef: (area: TAreaType) => (el: HTMLDivElement) => void
    ) => {
      if (area === TAreaType.EPsychotherapy) {
        return (
          <div ref={createRef(area)} key={area}>
            <AreaThumbnail
              iconSrc='/icons/Psy-icon.png'
              label='Психотерапия'
              description='Запросы про эмоции, отношения, самооценку.'
              onPress={() => dispatch(setAreaType(TAreaType.EPsychotherapy))}
            />
          </div>
        );
      }

      return (
        <div ref={createRef(area)} key={area}>
          <AreaThumbnail
            iconSrc='/icons/Coach-icon.png'
            label='Коучинг'
            description='Запросы про действия и получение результатов.'
            onPress={() => dispatch(setAreaType(TAreaType.ECoaching))}
          />
        </div>
      );
    },
    [dispatch]
  );

  const onPressHandler = useCallback(async () => {
    dispatch(emptyTopics());
    await dispatch(getTopicsThunk({ area_type: areaType }));
    dispatch(openClientTopics());
  }, [areaType, dispatch]);

  return (
    <Container className='grid grid-cols-6 md:grid-cols-12'>
      <h1 className='col-span-6 mt-8 md:text-lg text-md font-semibold md:col-span-8 md:col-start-3'>
        Выберите направление
      </h1>
      <div className='col-span-6 md:text-lg md:col-span-8 md:col-start-3 h-5 md:h-10' />
      <div
        ref={containerRef}
        className='col-span-6 md:text-lg md:col-span-8 md:col-start-3 relative'
      >
        <div className='flex gap-4 flex-col md:flex-row'>
          {renderElements(getComponent)}
        </div>
        <animated.div
          style={underlineProps}
          className='animated-underline rounded-2xl'
        />
      </div>
      <div className='col-span-6 mt-8 md:text-lg md:col-span-8 md:col-start-3 flex justify-end gap-4'>
        <Button onPress={onPressHandler}>Продолжить</Button>
      </div>
    </Container>
  );
};
