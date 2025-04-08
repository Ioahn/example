import { RiArrowDropDownFill } from 'react-icons/ri';
import { useToggleState } from 'react-stately';
import { cn } from '@shared/utils';
import { Card, Collapse, ToggleButton } from '@shared/UI';

type Props = {
  title?: string;
  variant?: CardProps['variant'];
};

export function CardCollapser({
  children,
  className,
  title,
  variant = 'secondary',
}: CommonProps<Props>) {
  const toggleState = useToggleState({ defaultSelected: true });

  return (
    <Card
      className={cn('flex flex-col', className)}
      variant={variant}
      size='md'
    >
      <ToggleButton
        onPress={toggleState.toggle}
        className='flex w-full justify-between'
        variant='clear'
        fullWidth
      >
        {title && <h2 className='md:text-md font-semibold'>{title}</h2>}
        <RiArrowDropDownFill
          className={cn(
            `text-lg transition-transform duration-150 ease-in ml-auto`,
            toggleState.isSelected && 'rotate-180'
          )}
        />
      </ToggleButton>
      <Collapse isOpen={toggleState.isSelected} className='pt-5'>
        {children}
        <div className='h-6' />
      </Collapse>
    </Card>
  );
}
