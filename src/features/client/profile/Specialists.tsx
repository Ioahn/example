import { sendCarrotEventSpecialistChangeClicked } from '@shared/externals';
import { Key, useCallback, useMemo } from 'react';
import { IconType } from 'react-icons';
import { RiChat1Line, RiMoreFill, RiUserUnfollowLine } from 'react-icons/ri';
import { Item } from 'react-stately';
import {
  openPublicSpecialistProfile,
  openSearchSpecialist,
  selectClientSpecialist,
} from '@entities/models';
import { openChatByInterlocutorId } from '@features/chat';
import { Avatar } from '@features/client';
import { TAreaType } from '@shared/api';
import { cn } from '@shared/utils';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import {
  AvatarThumbnail,
  Button,
  Card,
  MenuButton,
  MenuListItem,
} from '@shared/UI';
import { WORKING_AREA_SPECIALIZATION } from '@shared/constants';

type TClientMenu = { id: string; icon: IconType; text: string };

type Props = { isPostpone?: boolean };

type CommonProps = Props & {
  id: string;
  first_name?: Maybe<string>;
  last_name?: Maybe<string>;
  avatar_url: string;
  working_areas?: TAreaType[];
};

const useClientMenu = (): [TClientMenu[], (action: Key) => void] => {
  const dispatch = useAppDispatch();

  const onPressHandler = useCallback(
    (action: Key) => {
      if (action === 'change_specialist') {
        sendCarrotEventSpecialistChangeClicked();
        dispatch(openSearchSpecialist());
      }
    },
    [dispatch]
  );

  const items = useMemo(
    () => [
      {
        id: 'change_specialist',
        icon: RiUserUnfollowLine,
        text: 'Сменить специалиста',
      },
    ],
    []
  );

  return [items, onPressHandler];
};

const EmptySpecialist: FCC = ({ className }) => {
  const dispatch = useAppDispatch();

  return (
    <Card
      variant='secondary'
      className={cn('flex flex-col h-[20rem] gap-4 relative', className)}
    >
      <Button
        onPress={() => dispatch(openSearchSpecialist())}
        fullWidth
        className='mt-auto'
      >
        Выбрать специалиста
      </Button>
    </Card>
  );
};

const DesktopPreview: FCC<CommonProps> = function DesktopPreview({
  id,
  first_name,
  last_name,
  avatar_url,
  isPostpone,
  className,
}) {
  const [menuItems, onPressHandler] = useClientMenu();
  const dispatch = useAppDispatch();

  return (
    <Card
      variant='secondary'
      className={cn('flex flex-col gap-6 relative', className)}
    >
      <div className='flex gap-4 flex-wrap'>
        <Button
          className='flex-[1_0_100%] sm:flex-[0_1_clamp(100px,15%,100%)] md:min-h-[120px]'
          variant='clear'
          onPress={() => dispatch(openPublicSpecialistProfile(id))}
        >
          <Avatar src={avatar_url} />
        </Button>
        <div className='flex flex-[1_0_min-content] flex-col items-stretch'>
          <Button
            fullWidth
            onPress={() => dispatch(openPublicSpecialistProfile(id))}
            variant='clear'
            className='hover:underline justify-start'
          >
            <p className='font-semibold select-none'>
              {first_name} {last_name}
            </p>
          </Button>
          <span className='text-xs text-content-secondary'>Ваш специалист</span>
          <div className='mt-4'>
            <Button
              variant='clear'
              onPress={() => dispatch(openChatByInterlocutorId(id))}
              className='flex items-center gap-2'
            >
              <div className='p-2 flex justify-center items-center rounded-full bg-bg-primary'>
                <RiChat1Line className='text-md' />
              </div>
              <span className='max-md:hidden text-xs'>Написать сообщение</span>
            </Button>
          </div>
        </div>
        {!isPostpone && (
          <MenuButton<TClientMenu>
            label={
              <RiMoreFill className='text-md max-md:text-content-inverse' />
            }
            items={menuItems}
            onAction={onPressHandler}
            placement='bottom end'
            buttonProps={{
              variant: 'ghost',
              size: 'icon',
              className: 'rounded-full',
            }}
            className='absolute right-6 top-6'
          >
            {(item) => (
              <Item key={item.id} textValue={item.id}>
                <MenuListItem {...item} icon={<item.icon />} />
              </Item>
            )}
          </MenuButton>
        )}
      </div>
    </Card>
  );
};

const MobilePreview: FCC<CommonProps> = function MobilePreview({
  id,
  avatar_url,
  first_name,
  last_name,
  working_areas,
  className,
  isPostpone,
}) {
  const [menuItems, onPressHandler] = useClientMenu();
  const dispatch = useAppDispatch();

  if (!working_areas) {
    return null;
  }

  return (
    <Card
      variant='secondary'
      className={cn('flex gap-6 justify-between items-center', className)}
    >
      <AvatarThumbnail
        name={`${first_name} ${last_name || ''}`}
        description={working_areas
          .map((area) => WORKING_AREA_SPECIALIZATION[area])
          .join(', ')}
        size='base'
        img={avatar_url}
        onPress={() => dispatch(openPublicSpecialistProfile(id))}
      />
      <div className='relative'>
        <div>
          <Button
            variant='clear'
            onPress={() => dispatch(openChatByInterlocutorId(id))}
            className='flex items-center gap-2'
          >
            <div className='p-2 flex justify-center items-center rounded-full bg-bg-primary'>
              <RiChat1Line className='text-md' />
            </div>
            <span className='max-md:hidden text-xs'>Написать сообщение</span>
          </Button>
        </div>
        {!isPostpone && (
          <MenuButton<TClientMenu>
            label={<RiMoreFill className='text-md' />}
            items={menuItems}
            onAction={onPressHandler}
            placement='bottom end'
            buttonProps={{
              variant: 'ghost',
              size: 'icon',
              className: 'rounded-full',
            }}
          >
            {(item) => (
              <Item key={item.id} textValue={item.id}>
                <MenuListItem {...item} icon={<item.icon />} />
              </Item>
            )}
          </MenuButton>
        )}
      </div>
    </Card>
  );
};

export const Specialists: FCC<Props> = function Specialists({
  isPostpone,
  className,
}) {
  const specialist = useAppSelector(selectClientSpecialist);

  if (!specialist) {
    return <EmptySpecialist className={className} />;
  }

  return (
    <>
      <DesktopPreview
        className={cn('max-md:hidden', className)}
        isPostpone={isPostpone}
        {...specialist}
      />
      <MobilePreview
        className={cn('md:hidden', className)}
        isPostpone={isPostpone}
        {...specialist}
      />
    </>
  );
};
