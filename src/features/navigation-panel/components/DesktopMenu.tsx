import { memo } from 'react';
import { RiMenuLine } from 'react-icons/ri';
import { Item } from 'react-stately';
// import { selectUIStates, toggleMenu } from '@entities/models';
// import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { MenuButton, MenuListItem } from '@shared/UI';
import { TMenuProps, useNavigationMenu } from './helpers';

export const DesktopMenu = memo(() => {
  // const dispatch = useAppDispatch();
  // const { menuIsVisible } = useAppSelector(selectUIStates);
  const [menuItems, onSelect] = useNavigationMenu();

  return (
    <MenuButton<TMenuProps>
      onAction={onSelect}
      label={<RiMenuLine className='text-md' />}
      items={menuItems}
      placement='bottom end'
      buttonProps={{
        variant: 'secondary',
        size: 'icon',
        className:
          'aria-expanded:bg-bg-secondary rounded-full hover:aria-expanded:bg-bg-secondary enabled:hover:bg-bg-secondary/80 px-3 enabled:bg-transparent',
      }}
      // onOpenChange={() => dispatch(toggleMenu())}
      // isOpen={menuIsVisible}
    >
      {(item) => (
        <Item key={item.id} textValue={item.id}>
          <MenuListItem
            {...item}
            icon={<item.icon />}
            isExternalLink={item.isExternalLink}
          />
        </Item>
      )}
    </MenuButton>
  );
});
