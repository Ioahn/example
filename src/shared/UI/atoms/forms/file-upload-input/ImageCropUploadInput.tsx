import { AriaFieldProps } from '@react-aria/label';
import React, { forwardRef, useState } from 'react';
import { flushSync } from 'react-dom';
import { DropzoneOptions } from 'react-dropzone';
import Cropper from 'react-easy-crop';
import { Area } from 'react-easy-crop/types';
import { RiEdit2Line } from 'react-icons/ri';
import { useOverlayTriggerState } from 'react-stately';
import { cn } from '@shared/utils';
import { Button, FileUploadInput, Overlay } from '@shared/UI';
import { getCroppedImg } from './helpers';

type Props = DropzoneOptions &
  PropsWithClassNames &
  AriaFieldProps & {
    onChange: (files: unknown) => void;
    defaultValue?: string;
    onRemove?: () => void;
  };

export const ImageCropUploadInput = forwardRef<HTMLDivElement, Props>(
  ({ className, onChange, defaultValue, onRemove, ...rest }, ref) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>();
    const [cropped, setCroppedImage] = useState(defaultValue || '');
    const state = useOverlayTriggerState({});

    const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    };

    const showCroppedImage = async () => {
      try {
        const croppedImage = (await getCroppedImg(
          cropped,
          croppedAreaPixels,
          rotation
        )) as Blob;

        const imageUrl = URL.createObjectURL(croppedImage as Blob);
        setCroppedImage(imageUrl);

        const imageFile = new File([croppedImage], 'Avatar.jpeg', {
          type: croppedImage?.type,
        });

        onChange(Object.assign(imageFile, { preview: imageUrl }));
      } catch (e) {
        console.error(e);
      }
    };

    const onHandleChange = (file: unknown) => {
      if (file) {
        const imageUrl = URL.createObjectURL(file as Blob);

        flushSync(() => {
          setCroppedImage(imageUrl as string);

          state.open();
        });
      }
    };

    const onClose = () => {
      flushSync(() => {
        showCroppedImage().then(() => state.close());
      });
    };

    return (
      <div className={cn(className)}>
        <FileUploadInput
          {...rest}
          value={cropped}
          defaultValue={defaultValue}
          onChange={onHandleChange}
          onRemove={onRemove}
          ref={ref}
          additional={
            cropped !== defaultValue ? (
              <Button
                variant='tertiary'
                size='sm'
                onPress={state.open}
                startIcon={<RiEdit2Line />}
              >
                Редактировать
              </Button>
            ) : undefined
          }
        />

        <Overlay isOpen={state.isOpen}>
          <div className='p-8 flex flex-col gap-4'>
            <p>Выровняйте фотографию</p>
            <div className='w-full relative overflow-hidden rounded-2xl'>
              <div className='aspect-w-4 md:aspect-h-4 aspect-h-5'>
                <Cropper
                  image={cropped}
                  crop={crop}
                  rotation={rotation}
                  zoom={zoom}
                  aspect={3 / 4}
                  onCropChange={setCrop}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  showGrid
                  zoomWithScroll
                />
              </div>
            </div>
            <Button onPress={onClose} className='self-end'>
              Продолжить
            </Button>
          </div>
        </Overlay>
      </div>
    );
  }
);
