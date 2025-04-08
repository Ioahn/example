import { ReactElement, cloneElement, useState } from 'react';
import { Button } from '@shared/UI';

type Props = {
  notification: string | ReactElement;
  children: ReactElement<typeof Button>;
};

export const SecureHandlerWrapper: FCC<Props> = ({
  children,
  notification,
}) => {
  const [isVisible, setVisibility] = useState(false);

  const handleConfirm = () => {
    children.props.onPress();
    setVisibility(false);
  };

  const handleCancel = () => {
    setVisibility(false);
  };

  const handleButtonClick = () => {
    setVisibility(true);
  };

  return (
    <div>
      {!isVisible && cloneElement(children, { onPress: handleButtonClick })}
      {isVisible && (
        <div className='flex items-center gap-4'>
          <p className='flex-shrink-0'>{notification}</p>
          <Button variant='secondary' fullWidth onPress={handleCancel}>
            Отменить
          </Button>
          <Button fullWidth onPress={handleConfirm}>
            Подтвердить
          </Button>
        </div>
      )}
    </div>
  );
};
