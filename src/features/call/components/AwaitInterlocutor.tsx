import { animated, config, useSpring } from '@react-spring/web';
import {
  selectInterlocutorData,
  selectWaitingInterlocutor,
} from '@entities/models';
import { cn } from '@shared/utils';
import { useAppSelector } from '@shared/hooks';
import { AvatarThumbnail, Card } from '@shared/UI';

export const AwaitInterlocutor: FCC = ({ children, className }) => {
  const { first_name, last_name, avatar_url } = useAppSelector(
    selectInterlocutorData
  );
  const isWaitingInterlocutor = useAppSelector(selectWaitingInterlocutor);

  const props = useSpring({
    config: config.stiff,
    opacity: isWaitingInterlocutor ? 1 : 0,
    scale: isWaitingInterlocutor ? 1 : 0,
  });

  return (
    <div className={cn('relative', className)}>
      <animated.div
        className='inset-0 absolute flex justify-center md:items-center items-start max-md:top-4 z-10 pointer-events-none text-content-inverse'
        style={props}
      >
        <Card
          variant='secondary'
          className='bg-bg-tertiary/20 backdrop-blur-2xl'
        >
          <AvatarThumbnail
            name={`${first_name} ${last_name || ''}`}
            size='lg'
            img={avatar_url}
            className='m-auto max-md:hidden'
          />

          <AvatarThumbnail
            name={`${first_name} ${last_name || ''}`}
            size='base'
            img={avatar_url}
            className='m-auto md:hidden'
          />
        </Card>
      </animated.div>
      {children}
    </div>
  );
};
