import { useCallback, useRef } from 'react';
import { mergeProps, useTextField } from 'react-aria';
import { flushSync } from 'react-dom';
import { Controller, useForm } from 'react-hook-form';
import { RiSendPlaneLine } from 'react-icons/ri';
import { sendMessage } from '@features/chat';
import { cn } from '@shared/utils';
import { useAppDispatch } from '@shared/hooks';
import { Button } from '@shared/UI';

export const ChatInputField = () => {
  const { control, setFocus, getValues, handleSubmit, reset, formState } =
    useForm({
      defaultValues: {
        message: '',
      },
    });
  const dispatch = useAppDispatch();
  const ref = useRef<HTMLTextAreaElement>(null);
  const { inputProps } = useTextField(
    {
      'aria-label': 'chat message input',
      autoComplete: 'off',
      placeholder: 'Сообщение...',
      type: 'text',
      inputElementType: 'textarea',
      enterKeyHint: 'send',
      onKeyDown: (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSubmit(onSubmitHandler)();
          flushSync(() => {
            if (ref.current) {
              ref.current.style.height = 'auto';
            }
          });
        }
      },
    },
    ref
  );

  const onSubmitHandler = ({ message }: { message?: string }) => {
    dispatch(sendMessage(message as string));

    flushSync(() => {
      reset();
    });

    setFocus('message');
  };

  const onResize = useCallback(() => {
    if (!ref.current) {
      return;
    }

    ref.current.style.height = 'auto';
    ref.current.style.height = `${ref.current.scrollHeight}px`;
  }, []);

  return (
    <form
      onSubmit={handleSubmit(onSubmitHandler)}
      className='grid grid-cols-[repeat(2,1fr)_3rem] w-full px-4 py-2'
    >
      <div className='col-span-2 flex items-center'>
        <Controller
          control={control}
          name='message'
          render={({ field }) => (
            <textarea
              {...mergeProps(inputProps, field)}
              onChange={(event) => {
                field.onChange(event);
                onResize();
              }}
              rows={1}
              ref={ref}
              className='max-h-[6rem] outline-none overflow-auto w-full
                resize-none placeholder-content-secondary placeholder-opacity-30
                placeholder:[font-size:1rem] p-2'
            />
          )}
        />
      </div>
      <div className='col-span-1 flex flex-col justify-end items-end'>
        <Button
          type='submit'
          variant='clear'
          size='md'
          className={cn('cursor-pointer rounded-xl p-2 relative', {
            ['bg-content-primary text-content-inverse']: formState.isDirty,
            ['bg-content-tertiary text-content-inverse']: !formState.isDirty,
          })}
          startIcon={<RiSendPlaneLine className='text-md' />}
          isDisabled={!(getValues('message') || '').trimStart()}
          onFocus={(event) => {
            event.preventDefault();
            setFocus('message');
          }}
        />
      </div>
    </form>
  );
};
