import { IconType } from 'react-icons';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { Item } from 'react-stately';
import { cn } from '@shared/utils';
import { Container, List } from '@shared/UI';
import { useNavigationMenu } from './helpers';

const MenuItem: FCC<{
  icon: IconType;
  text: string;
  isExternalLink?: boolean;
}> = ({ className, icon: Icon, text, isExternalLink }) => (
  <div className={cn('flex items-center gap-3 outline-none', className)}>
    <div className='rounded-full bg-bg-primary p-2 text-md transition-colors group-aria-selected:bg-bg-secondary'>
      <Icon />
    </div>
    {text}
    {isExternalLink && (
      <RiArrowRightUpLine className='text-md text-content-secondary' />
    )}
  </div>
);

export const MobileUser = () => {
  const [menuItems, onSelect] = useNavigationMenu();

  return (
    <Container className='flex h-full flex-col gap-4 pt-4 hide-scrollbar'>
      <List
        items={menuItems}
        className='flex flex-col gap-6'
        selectionMode='single'
        disallowEmptySelection
        onSelectionChange={([key]) => {
          onSelect(key);
        }}
        shouldSelectOnPressUp
        selectionBehavior='replace'
      >
        {(item) => (
          <Item key={item.id} textValue={item.id}>
            <MenuItem
              text={item.text}
              icon={item.icon}
              isExternalLink={item.isExternalLink}
            />
          </Item>
        )}
      </List>
    </Container>
  );
};
