import { ReactElement } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { RiDeleteRow, RiInsertRowBottom } from 'react-icons/ri';
import { cn } from '@shared/utils';
import { Button } from '@shared/UI';

export const FieldArray = ({
  name,
  children,
  withRemove = false,
  template,
  errorMessage,
}: {
  name: string;
  children: (fields: Record<'id', string>[]) => ReactElement[];
  withRemove?: boolean;
  template?: AnyObject;
  errorMessage?: string;
}) => {
  const { control, getValues } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  const onAppend = () => {
    const scheme =
      template ||
      Object.keys(getValues()[name][0]).reduce(
        (acc, key) => ({ ...acc, [key]: undefined }),
        {}
      );

    append(scheme);
  };

  const onRemove = () => {
    remove(fields.length - 1);
  };

  return (
    <div className='flex flex-col gap-4'>
      {children(fields)}
      <div className='flex gap-4'>
        {fields.length > 0 && withRemove && (
          <Button
            variant='secondary'
            onPress={onRemove}
            className='max-md:w-1/2 max-w-none'
          >
            <span className='max-md:hidden'>Удалить образование</span>
            <RiDeleteRow className='text-md text-content-error md:hidden' />
          </Button>
        )}
        <Button
          variant='secondary'
          onPress={onAppend}
          className={cn('max-md:w-1/2 max-w-none', {
            ['border-content-accent-vivid']: errorMessage,
          })}
        >
          <span className='max-md:hidden'>Добавить образование</span>
          <RiInsertRowBottom className='text-md md:hidden' />
        </Button>
      </div>
      {errorMessage && (
        <div className='ml-2 text-xs text-content-accent-vivid'>
          {errorMessage}
        </div>
      )}
    </div>
  );
};
