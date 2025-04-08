import { type ReactNode, useRef } from 'react';
import useDigitInput from 'react-digit-input';
import { mergeRefs } from 'react-merge-refs';
import { useStartTyping } from 'react-use';
import { cn } from '@shared/utils';
import { TextField } from '@shared/UI';

type Props = {
  length: number;
  value: string;
  onChange: (value: string) => void;
  label?: string;
  errorMessage?: Maybe<ReactNode | string>;
};

export const DigitInput: FCC<Props> = ({
  className,
  length = 4,
  value,
  onChange,
  label = '',
  errorMessage,
}) => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  const digits = useDigitInput({
    acceptedCharacters: /^[0-9]$/,
    length,
    value,
    onChange,
  });

  useStartTyping(() => firstInputRef?.current?.focus?.());

  return (
    <div className={cn('flex flex-col gap-0.5', className)}>
      {label && <span className='text-xs'>{label}</span>}
      <div className='flex justify-between'>
        {Array.from({ length }).map((_, i) => {
          const { value, ref, onChange, onFocus, onKeyDown, onClick } =
            digits[i];
          const mergedRef = i === 0 ? mergeRefs([firstInputRef, ref]) : ref;

          return (
            <TextField
              fullWidth
              key={i}
              ref={mergedRef}
              value={value as string}
              onInput={onChange}
              onFocus={(e) =>
                onFocus ? onFocus(e as IncompatibleType) : void 0
              }
              onKeyDown={onKeyDown}
              onSelect={onClick}
              aria-label='digit code'
              inputClassName='text-center'
              hasError={!!errorMessage}
              className='w-[calc(25%-0.25rem*3)]'
              inputMode='numeric'
            />
          );
        })}
      </div>
      {errorMessage && (
        <div className='ml-2 text-xs text-content-accent-vivid'>
          {errorMessage}
        </div>
      )}
    </div>
  );
};
