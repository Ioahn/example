import { RiMenuLine } from 'react-icons/ri';
import { setMenuVisible } from '@entities/models';
import { useAppDispatch } from '@shared/hooks';
import { Button } from '@shared/UI';

export const MobileMenuButton = () => {
  const dispatch = useAppDispatch();
  const onPressHandler = () => {
    dispatch(setMenuVisible(true));
  };

  return (
    <Button
      variant='clear'
      startIcon={<RiMenuLine className='text-lg' />}
      onPress={onPressHandler}
      size='icon'
      className='md:hidden bg-bg-secondary rounded-full p-2'
    />
  );
};
