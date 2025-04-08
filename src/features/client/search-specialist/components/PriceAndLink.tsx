import { RiArrowRightUpLine } from 'react-icons/ri';
import {
  openPublicSpecialistProfileFromSearch,
  selectRequirements,
} from '@entities/models';
import { cn } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, Card } from '@shared/UI';

type PriceAndLink = {
  id: string;
  price: number;
};

export const PriceAndLink: FCC<PriceAndLink> = ({ id, price, className }) => {
  const dispatch = useAppDispatch();
  const { areaType } = useAppSelector(selectRequirements);
  return (
    <Button
      variant='clear'
      className={cn('text-content-primary !no-underline', className)}
      onPress={() =>
        dispatch(openPublicSpecialistProfileFromSearch({ id, area: areaType }))
      }
      fullWidth
    >
      <Card
        variant='primary'
        size='sm'
        className='flex items-center justify-between max-md:flex-col max-md:justify-end max-md:text-xs w-full hover:bg-bg-tertiary'
      >
        <span>
          <span className='font-bold'>От {price}₽</span> за сессию
        </span>
        <span className='font-bold'>
          Открыть профиль <RiArrowRightUpLine className='inline text-md' />
        </span>
      </Card>
    </Button>
  );
};
