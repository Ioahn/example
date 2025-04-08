import { AriaFieldProps } from '@react-aria/label';
import { forwardRef, useState } from 'react';
import { VisuallyHidden, mergeProps, useField } from 'react-aria';
import { flushSync } from 'react-dom';
import { DropzoneOptions, useDropzone } from 'react-dropzone';
import {
  RiCloseLine,
  RiFileAddFill,
  RiFileAddLine,
  RiFileTextLine,
} from 'react-icons/ri';
import { cn } from '@shared/utils';
import { Button, KeyboardFocus } from '@shared/UI';

type Props = DropzoneOptions &
  PropsWithClassNames &
  AriaFieldProps & {
    onChange: (files: File[]) => void;
    defaultValue?: string;
    onRemove?: () => void;
  };

export const DocumentUploadInput = forwardRef<HTMLDivElement, Props>(
  ({ className, onChange, defaultValue, onRemove, ...rest }, ref) => {
    const [files, setFiles] = useState<File[]>([]);

    const { getRootProps, getInputProps, isDragActive, isDragAccept } =
      useDropzone({
        ...rest,
        onDrop: (acceptedFiles: File[]) => {
          onChange(acceptedFiles);
          setFiles(acceptedFiles);
        },
      });

    const onRemoveHandler = () => {
      flushSync(() => setFiles([]));
      onRemove?.();
    };

    const { fieldProps, labelProps, descriptionProps, errorMessageProps } =
      useField({ ...rest, 'aria-label': 'document load dropzone' });
    const { label, description, errorMessage } = rest;

    const defaultThumb = (
      <>
        {!isDragAccept ? (
          <RiFileAddLine className='text-2xl' />
        ) : (
          <RiFileAddFill className='text-2xl text-content-inverse' />
        )}
        <p
          className={cn('text-content-tertiary text-center', {
            ['text-content-inverse']: isDragAccept,
          })}
        >
          Добавьте файл <br /> или перетащите сюда
        </p>
      </>
    );

    const [file] = files;

    const thumbWithFile = (
      <>
        <RiFileTextLine className='text-2xl' />
        <p
          className={cn('text-content-tertiary text-center', {
            ['text-content-inverse']: isDragAccept,
          })}
        >
          {file?.name}
        </p>
      </>
    );

    return (
      <div className={cn('flex flex-col gap-3 relative h-full', className)}>
        <div className='flex flex-col gap-2'>
          <label {...labelProps} className='text-base font-semibold'>
            {label}
          </label>
          {description && (
            <div
              {...descriptionProps}
              className='text-sm text-content-accent-vivid md:text-base'
            >
              {description}
            </div>
          )}
        </div>
        <KeyboardFocus>
          <div className={cn('flex relative h-full')} tabIndex={0} ref={ref}>
            <div
              {...getRootProps()}
              className={cn(
                'w-full h-full rounded-xl border border-border-primary bg-bg-primary',
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
                <div className='absolute inset-0 flex justify-center items-center flex-col gap-2'>
                  {!files.length ? defaultThumb : thumbWithFile}
                </div>
              </div>
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
