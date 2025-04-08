import { RiCloseLine } from 'react-icons/ri';
import { Item } from 'react-stately';
import {
  getDevices,
  setAudioDeviceId,
  setVideoDeviceId,
} from '@entities/models';
import { useDeviceStreams } from '@features/call/hooks/use-devices';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button, Select } from '@shared/UI';

type Props = {
  onClose?: AnyFunction;
};

export const ChangeDevices: FCC<Props> = function ChangeDevices({ onClose }) {
  const { audioDeviceId, videoDeviceId } = useAppSelector(getDevices);
  const dispatch = useAppDispatch();

  const { videoDevices, audioDevices } = useDeviceStreams();

  return (
    <div className='flex h-full flex-col gap-4 overflow-y-scroll scroll-auto p-6'>
      <div className='flex justify-between items-start'>
        <h2 className='md:text-lg text-md font-semibold'>
          Настройки видеозвонка
        </h2>
        <Button
          variant='ghost'
          size='base'
          onPress={onClose}
          endIcon={<RiCloseLine className='text-md' />}
          className='rounded-full'
        />
      </div>
      <div className='flex flex-col gap-4'>
        <Select
          items={audioDevices}
          label='Микрофон'
          selectedKey={audioDeviceId || audioDevices[0]?.deviceId}
          placeholder='Устройство не найдено'
          onSelectionChange={(key) => dispatch(setAudioDeviceId(key as string))}
          buttonClassName='w-full max-w-none justify-between border-2 p-4 rounded-2xl text-left'
          variant='clear'
        >
          {({ label, deviceId }) => (
            <Item key={deviceId} textValue={deviceId}>
              <div className='font-normal'>{label}</div>
            </Item>
          )}
        </Select>
        <Select
          items={videoDevices}
          label='Камера'
          selectedKey={videoDeviceId || videoDevices[0]?.deviceId}
          placeholder='Устройство не найдено'
          onSelectionChange={(key) => dispatch(setVideoDeviceId(key as string))}
          buttonClassName='w-full max-w-none justify-between border-2 p-4 rounded-2xl text-left'
          variant='clear'
        >
          {({ label, deviceId }) => (
            <Item key={deviceId} textValue={deviceId}>
              <div className='font-normal'>{label}</div>
            </Item>
          )}
        </Select>
      </div>
    </div>
  );
};
