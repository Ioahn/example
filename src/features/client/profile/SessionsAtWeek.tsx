import { animated } from '@react-spring/web';
import { selectSessionAtWeek, setSessionsAtWeek } from '@entities/models';
import { cn } from '@shared/utils';
import {
  useAnimatedUnderline,
  useAppDispatch,
  useAppSelector,
} from '@shared/hooks';
import { Button } from '@shared/UI';

export const SessionsAtWeek: FCC = ({ className }) => {
  const dispatch = useAppDispatch();
  const session = useAppSelector(selectSessionAtWeek);

  const items = [
    { label: '1 сессия в неделю', id: 1 },
    { label: '2 сессии в неделю', id: 2 },
    { label: '3 сессии в неделю', id: 3 },
  ];

  const { renderElements, containerRef, underlineProps } = useAnimatedUnderline(
    {
      activeElement: session - 1,
      items,
    }
  );

  return (
    <div ref={containerRef} className={cn(className, 'relative')}>
      {renderElements(({ label, id }, ref) => (
        <div key={id} ref={ref(id)} className='z-[1] max-md:w-full'>
          <Button
            variant='ghost'
            onPress={() => dispatch(setSessionsAtWeek(id))}
            className='enabled:hover:bg-transparent max-md:max-w-full max-md:w-full'
          >
            {label}
          </Button>
        </div>
      ))}
      <animated.div
        style={underlineProps}
        className='absolute bg-bg-tertiary rounded-2xl'
      />
    </div>
  );
};
