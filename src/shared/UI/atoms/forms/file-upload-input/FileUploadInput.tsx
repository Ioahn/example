import { AriaFieldProps } from '@react-aria/label';
import { ReactElement, forwardRef, useEffect, useState } from 'react';
import { VisuallyHidden, mergeProps, useField } from 'react-aria';
import { flushSync } from 'react-dom';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import { RiCameraLine, RiCloseLine } from 'react-icons/ri';
import { cn } from '@shared/utils';
import { Button, KeyboardFocus } from '@shared/UI';

type Props = DropzoneOptions &
  PropsWithClassNames &
  AriaFieldProps & {
    onChange: (files: unknown) => void;
    defaultValue?: string;
    value?: string;
    onRemove?: () => void;
    additional?: ReactElement;
  };

export const FileUploadInput = forwardRef<HTMLDivElement, Props>(
  (
    { className, onChange, defaultValue, value, onRemove, additional, ...rest },
    ref
  ) => {
    const [files, setFiles] = useState<AnyObject[]>([]);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
      ...rest,
      onDrop: (acceptedFiles: unknown[]) => {
        onChange(acceptedFiles[0]);
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file as AnyObject, {
              preview: URL.createObjectURL(file as Blob),
            })
          )
        );
      },
    });

    const onRemoveHandler = () => {
      flushSync(() => setFiles([]));
      onRemove?.();
    };

    const { fieldProps, labelProps, descriptionProps, errorMessageProps } =
      useField(rest);
    const { label, description, errorMessage } = rest;

    useEffect(() => {
      return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    const thumbs = files.map((file) => (
      <div key={file.name} className='h-full w-full'>
        <img
          className='h-full w-full object-cover'
          src={file.preview}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    ));

    return (
      <div className='flex flex-col gap-3 relative'>
        <KeyboardFocus>
          <div
            className={cn('flex gap-4 relative', className)}
            tabIndex={0}
            ref={ref}
          >
            <div
              {...getRootProps()}
              className={cn(
                'relative min-h-[120px]  min-w-[100px] max-w-[130px] cursor-pointer  overflow-hidden rounded-xl border border-border-primary bg-bg-primary',
                {
                  ['bg-black/20']: isDragActive,
                  ['border-content-accent-vivid']: errorMessage,
                }
              )}
            >
              {onRemove && !!files.length && defaultValue && (
                <Button
                  onPress={onRemoveHandler}
                  variant='ghost'
                  startIcon={<RiCloseLine className='' />}
                  className='absolute right-1 top-1 rounded-full bg-bg-primary/40 p-0.5 z-10'
                />
              )}
              <VisuallyHidden>
                <input {...mergeProps(getInputProps(), fieldProps)} />
              </VisuallyHidden>
              <div className='pointer-events-none absolute inset-0 flex items-center justify-center'>
                <div
                  className={cn(
                    'z-[2] rounded-full bg-bg-secondary p-3 text-md',
                    {
                      ['hidden']: files.length,
                    }
                  )}
                >
                  <RiCameraLine />
                </div>
                <div
                  className={cn('absolute inset-0 z-[1]', {
                    ['hidden']: files.length || !defaultValue,
                  })}
                >
                  <img
                    src={typeof value === 'string' ? value : defaultValue}
                    alt='avatar'
                    className='h-full w-full object-cover'
                  />
                </div>
                {thumbs}
              </div>
            </div>
            <div className='flex flex-col gap-2'>
              <label
                {...labelProps}
                className='text-base font-semibold  md:text-md'
              >
                {label}
              </label>
              <p className='text-sm text-content-secondary md:text-base'>
                Не больше 2МБ
              </p>
              {description && (
                <div
                  {...descriptionProps}
                  className='text-sm text-content-accent-vivid md:text-base'
                >
                  {description}
                </div>
              )}
              {additional && <div>{additional}</div>}
            </div>
          </div>
        </KeyboardFocus>
        {errorMessage && typeof errorMessage !== 'function' && (
          <div
            className='ml-2 text-xs text-content-accent-vivid'
            {...errorMessageProps}
          >
            {errorMessage}
          </div>
        )}
      </div>
    );
  }
);
