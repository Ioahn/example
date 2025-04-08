import { useMemo } from 'react';
import { cn } from '@shared/utils';
import { useToggle } from '@shared/hooks';
import { Button, Card, Collapse } from '@shared/UI';

type Props = {
  description: string;
};

const MAX_SYMBOL = 400;

export const AboutSpecialist: FCC<Props> = ({ className, description }) => {
  const [isShort, changeShortness] = useToggle(
    description.length >= MAX_SYMBOL
  );

  const visibleDescription = useMemo(() => {
    return isShort ? description.slice(0, MAX_SYMBOL) : description;
  }, [description, isShort]);

  return (
    <Card
      variant='secondary'
      className={cn('flex flex-col gap-5 overflow-hidden', className)}
    >
      <p className='font-bold'>О себе</p>

      <Collapse isOpen>
        <div
          className={
            isShort
              ? 'whitespace-pre-wrap joints-clamp-5 break-words'
              : 'whitespace-pre-wrap'
          }
        >
          {visibleDescription}
        </div>
      </Collapse>

      <Button
        variant='clear'
        className='rounded-lg font-bold text-content-tertiary'
        onPress={changeShortness}
      >
        {isShort ? 'Подробнее' : 'Скрыть'}
      </Button>
    </Card>
  );
};
