import { Time } from '@internationalized/date';
import { useRef, useState } from 'react';
import { RiTimerLine } from 'react-icons/ri';
import { clearInterval, setInterval } from 'worker-timers';
import { Button } from '@shared/UI';

type Props = {
  onPress: AnyFunction;
};
export const ButtonWithTimer: FCC<Props> = ({ onPress, children }) => {
  const [timerVisible, setTimerVisibility] = useState(false);
  const timeRef = useRef(new Time(0, 1, 30));
  const [time, setTime] = useState(timeRef.current);
  const handleOnPress = () => {
    onPress?.();

    setTimerVisibility(true);

    const id = setInterval(() => {
      const time = timeRef.current;

      if (time.second === 0 && time.minute === 0) {
        clearInterval(id);
        setTimerVisibility(false);

        timeRef.current = new Time(0, 1, 30);
      } else {
        timeRef.current = time.subtract({ seconds: 1 });
      }

      setTime(() => timeRef.current);
    }, 1000);
  };

  return (
    <Button
      variant='ghost'
      fullWidth
      onPress={handleOnPress}
      isDisabled={timerVisible}
    >
      {!timerVisible ? (
        children
      ) : (
        <div className='flex items-center gap-2'>
          <RiTimerLine className='text-md' />
          <p>
            Повторная отправка через{' '}
            <span className='font-semibold'>
              {time.minute.toString().padStart(2, '0')}
            </span>
            :
            <span className='font-semibold'>
              {time.second.toString().padStart(2, '0')}
            </span>
          </p>
        </div>
      )}
    </Button>
  );
};
