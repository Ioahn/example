import dynamic from 'next/dynamic';
import { CiWarning } from 'react-icons/ci';
import { getDevices, getSignal, selectVideoCallState } from '@entities/models';
import { cn } from '@shared/utils';
import { useAppSelector } from '@shared/hooks';
import { Card, TooltipTrigger } from '@shared/UI';

type Props = {
  mediaProvider?: Maybe<MediaProvider>;
};

const DynamicWaveEffect = dynamic(
  () => import('@features/call').then(({ WaveEffect }) => WaveEffect),
  { ssr: false }
);

export const Status: FCC<Props> = function Status({
  className,
  mediaProvider,
}) {
  const { noMic } = useAppSelector(selectVideoCallState);
  const { audioDeviceId } = useAppSelector(getDevices);
  const { signal } = useAppSelector(getSignal);

  return (
    <Card
      className={cn(
        'flex md:justify-center gap-2 md:bg-bg-tertiary/5 bg-bg-tertiary/20 backdrop-blur-2xl overflow-hidden pointer-events-auto rounded-2xl',
        className
      )}
    >
      {signal < 0.5 && (
        <div className='absolute left-2 top-2 z-10'>
          <TooltipTrigger
            triggerElement={
              <CiWarning className='text-content-golden/50 text-base' />
            }
            placement='left'
          >
            <div className='bg-content-inverse px-2 py-1 rounded-lg'>
              Низкая скорость соединения
            </div>
          </TooltipTrigger>
        </div>
      )}

      <DynamicWaveEffect
        noMic={noMic}
        audioDeviceId={audioDeviceId}
        signal={signal}
        mediaProvider={mediaProvider}
      />
    </Card>
  );
};
