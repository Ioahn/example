import { animated } from '@react-spring/web';
import { useEffect } from 'react';
import { Item } from 'react-stately';
import {
  selectClientProduct,
  selectClientProfileArea,
  selectSpecialist,
  setClientActiveArea,
} from '@entities/models';
import { TAreaType } from '@shared/api';
import { assert, cn } from '@shared/utils';
import {
  useAnimatedUnderline,
  useAppDispatch,
  useAppSelector,
} from '@shared/hooks';
import { Card, List } from '@shared/UI';
import { WORKING_AREA_DICT } from '@shared/constants';

const OneSessionPrice = ({ areaType }: { areaType: TAreaType }) => {
  const product = useAppSelector((state) =>
    selectClientProduct(state, areaType)
  );

  if (!product?.one_session_price) {
    return null;
  }

  return (
    <Card
      className='md:p-4 p-2 flex flex-col md:gap-4 gap-2 flex-wrap cursor-pointer max-md:text-2xs outline outline-1 outline-border-primary'
      size='xs'
      variant='secondary'
    >
      <div
        className={cn('flex justify-between items-center', {
          ['text-content-accent']: areaType === TAreaType.EPsychotherapy,
          ['text-content-accent-vivid']: areaType === TAreaType.ECoaching,
        })}
      >
        <span className='font-semibold'>{WORKING_AREA_DICT[areaType]}</span>
      </div>
      <div>
        <span className='md:text-md text-xs font-semibold'>
          {product.one_session_price}₽/
        </span>{' '}
        <span className='text-content-secondary'>50 минут</span>
      </div>
    </Card>
  );
};

export const BookingPrice = () => {
  const specialist = useAppSelector(selectSpecialist);

  assert(specialist !== null, 'Specialist cannot be null');

  const { working_areas: workingAreas } = specialist;

  const activeArea = useAppSelector(selectClientProfileArea) || workingAreas[0];

  const dispatch = useAppDispatch();

  const { renderElements, underlineProps, containerRef } = useAnimatedUnderline(
    {
      activeElement: workingAreas.includes(activeArea)
        ? activeArea
        : workingAreas[0],
      items: workingAreas,
    }
  );

  useEffect(() => {
    if (!workingAreas.includes(activeArea)) {
      dispatch(setClientActiveArea(workingAreas[0] as TAreaType));
    }
  }, [activeArea, dispatch, workingAreas]);

  return (
    <div ref={containerRef} className='relative'>
      <List
        className='flex gap-4'
        selectionMode='single'
        defaultSelectedKeys={activeArea}
        onSelectionChange={([key]) => {
          dispatch(setClientActiveArea(key as TAreaType));
        }}
        listClassNames='flex-[1]'
      >
        {renderElements((area, ref) => (
          <Item key={area} textValue={area}>
            <div ref={ref(area)}>
              <OneSessionPrice areaType={area} />
            </div>
          </Item>
        ))}
      </List>
      <animated.div style={underlineProps} className='animated-underline' />
    </div>
  );
};
