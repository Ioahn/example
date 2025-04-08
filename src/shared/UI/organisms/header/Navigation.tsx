import { useMetrica } from 'next-yandex-metrica';
import { RiCloseLine, RiMenu3Line } from 'react-icons/ri';
import { OpenModalButton } from '@features/client';
import { TAccountType } from '@shared/api';
import { cn } from '@shared/utils';
import { Button, Image, Link } from '@shared/UI';

type TMenuElement = {
  title: string;
  href: string;
};

type Props = {
  menus: (TMenuElement & {
    sub_menu?: TMenuElement[];
  })[];
};

export const Navigation: FCC<Props> = ({ menus, className }) => {
  return (
    <nav className={className}>
      <div className='max-md:hidden'>
        <Menus menus={menus} />
      </div>
      <div className='md:hidden flex justify-end '>
        <OpenModalButton
          withDot={false}
          modalRender={(close) => (
            <Menus menus={menus} vertical className='p-4' onClose={close} />
          )}
          variant='clear'
          className='enabled:bg-transparent p-2'
          startIcon={<RiMenu3Line className='text-md' />}
        />
      </div>
    </nav>
  );
};

const Menus: FCC<Props & { vertical?: boolean; onClose?: AnyFunction }> = ({
  vertical,
  menus,
  className,
  onClose,
}) => {
  const { reachGoal } = useMetrica();

  return (
    <div
      className={cn(
        'flex items-center gap-4',
        { ['items-start flex-col relative']: vertical },
        className
      )}
    >
      {onClose && (
        <div className='flex justify-between items-center w-full'>
          <Link
            href='/'
            className='h-4'
            onClick={() => {
              onClose();
              reachGoal('menu-logo-clicked');
            }}
          >
            <Image
              alt='SenseA'
              src='/logo.png'
              width={100}
              height={20}
              priority
              className='h-full w-auto sm:block'
            />
          </Link>

          <Button
            startIcon={<RiCloseLine className='text-md text-content-primary' />}
            variant='secondary'
            size='icon'
            className='rounded-full'
            onPress={() => {
              onClose();
              reachGoal('menu-close-clicked');
            }}
          />
        </div>
      )}
      {menus?.map?.(({ title, href }) => (
        <Link
          href={href}
          onClick={() => {
            onClose?.();
            reachGoal(`menu-link-${title}-clicked`);
          }}
          key={title}
          className={cn('text-content-primary flex items-center text-xs', {
            ['text-base']: vertical,
          })}
        >
          {title}
        </Link>
      ))}

      <div
        className={cn('ml-auto flex self-end gap-4', {
          ['flex-col-reverse self-auto ml-0 w-full mt-6']: vertical,
        })}
      >
        <Button
          variant='ghost'
          as='link'
          href={`/auth?account=${TAccountType.EClient}`}
          className='enabled:hover:bg-bg-secondary/50'
          fullWidth={vertical}
        >
          Войти
        </Button>
        <Button as='link' href='/client/select/area-type' fullWidth={vertical}>
          Выбрать специалиста
        </Button>
      </div>
    </div>
  );
};
