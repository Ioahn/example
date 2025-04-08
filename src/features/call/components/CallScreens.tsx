import { useDisableCarrotQuest } from '@shared/externals';
import dynamic from 'next/dynamic';
import React from 'react';
import {
  RiLogoutBoxLine,
  RiMicLine,
  RiSettings4Line,
  RiVidiconLine,
} from 'react-icons/ri';
import {
  finishSessionAction,
  selectInterlocutorAspectRatio,
  selectIsCallFinished,
  selectVideoCallState,
  toggleNoMic,
  toggleNoVideo,
} from '@entities/models';
import {
  AwaitInterlocutor,
  ContainerWithAspectRatio,
  Status,
  useConference,
} from '@features/call';
import { ChangeDevices } from '@features/call/components/ChangeDevices';
import { OpenModalButton } from '@features/client';
import { cn } from '@shared/utils';
import {
  useAppDispatch,
  useAppSelector,
  useOverscrollDisable,
} from '@shared/hooks';
import { Button, Card } from '@shared/UI';

const GridPivot = dynamic(
  () => import('@features/call').then(({ GridPivot }) => GridPivot),
  { ssr: false }
);

export const CallScreens = () => {
  const dispatch = useAppDispatch();

  const [userVideoRef, localAudioMediaStream, peerVideoRef, peerAudioRef] =
    useConference();
  const { noMic, noVideo } = useAppSelector(selectVideoCallState);
  const isCallFinished = useAppSelector(selectIsCallFinished);
  const [w, h] = useAppSelector(selectInterlocutorAspectRatio);

  // useReloadAfterUnmount();
  useDisableCarrotQuest();
  useOverscrollDisable();

  return (
    <div className='relative h-svh bg-content-primary'>
      <div className='absolute inset-x-0 top-4 left-4 z-10'>
        {isCallFinished && (
          <Button
            onPress={() => dispatch(finishSessionAction())}
            variant='secondary'
            size='icon'
            startIcon={<RiLogoutBoxLine className='md:text-lg' />}
            className={cn(
              'rounded-full enabled:focus-visible:outline-offset-[1rem] bg-content-error text-content-inverse enabled:hover:text-content-primary'
            )}
          />
        )}
      </div>

      <AwaitInterlocutor className='absolute inset-0 md:inset-4 md:bottom-28 flex justify-center items-center'>
        <ContainerWithAspectRatio
          w={w}
          h={h}
          className='relative md:overflow-hidden md:rounded-2xl bg-content-inverse/10'
        >
          <audio ref={peerAudioRef} autoPlay playsInline controls={false} />
          <video
            ref={peerVideoRef}
            autoPlay
            playsInline
            controls={false}
            className='absolute inset-0 -scale-x-100 h-full w-full object-center'
          />
        </ContainerWithAspectRatio>
      </AwaitInterlocutor>

      <GridPivot className='md:inset-4 md:bottom-28'>
        <div className='md:aspect-w-3 md:aspect-h-2 md:w-[20rem] bg-content-inverse/10 backdrop-blur-2xl aspect-w-9 aspect-h-16 w-[7rem] rounded-2xl overflow-hidden'>
          <video
            ref={userVideoRef}
            autoPlay
            playsInline
            controls={false}
            className='object-cover -scale-x-100 w-full h-full'
          />
        </div>
      </GridPivot>
      <div className='absolute inset-x-4 bottom-4 flex pointer-events-none'>
        <div className='flex md:mx-auto ml-auto gap-2 md:justify-center max-md:flex-col-reverse'>
          <Card className='flex md:mx-auto ml-auto md:justify-center max-md:flex-col max-md:items-end justify-end gap-2 bg-bg-tertiary/20 backdrop-blur-2xl md:bg-transparent pointer-events-auto p-4'>
            <Button
              onPress={() => dispatch(toggleNoMic())}
              variant='clear'
              size='icon'
              startIcon={
                <RiMicLine className='text-base md:text-lg text-content-inverse' />
              }
              className={cn(
                'shrink-0 p-3 rounded-full bg-content-accent/80 aria-pressed:bg-content-error transition-all',
                {
                  ['bg-content-error/50 aria-pressed:bg-content-accent']: noMic,
                }
              )}
            />

            <Button
              onPress={() => dispatch(toggleNoVideo())}
              variant='clear'
              size='icon'
              startIcon={
                <RiVidiconLine className='text-base md:text-lg text-content-inverse' />
              }
              className={cn(
                'shrink-0 p-3 rounded-full bg-content-accent/80 aria-pressed:bg-content-error transition-all',
                {
                  ['bg-content-error/50 aria-pressed:bg-content-accent']:
                    noVideo,
                }
              )}
            />

            <OpenModalButton
              startIcon={
                <RiSettings4Line className='text-base md:text-lg text-content-inverse' />
              }
              modalRender={(onClose) => <ChangeDevices onClose={onClose} />}
              withDot={false}
              variant='clear'
              className='shrink-0 p-3 rounded-full bg-content-accent/80 aria-pressed:bg-content-accent enabled:bg-content-accent/80'
            />
          </Card>

          <Status
            className='md:w-20 p-0 md:py-4 h-16 md:h-20 md:absolute md:right-0'
            mediaProvider={localAudioMediaStream.current}
          />
        </div>
      </div>
    </div>
  );
};
