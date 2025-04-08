import { Key, useCallback, useMemo } from 'react';
import { IconType } from 'react-icons';
import {
  RiBarChartBoxLine,
  RiCalendar2Line,
  RiChat1Line,
  RiLogoutCircleLine,
  RiNotification2Line,
  RiSettings3Line,
  RiTelegramLine,
  RiUser3Line,
} from 'react-icons/ri';
import { useMedia } from 'react-use';
import {
  closeAllUI,
  logout,
  openCalendar,
  openFinances,
  openPayments,
  openProfile,
  openSettings,
  selectProfileData,
  setNotificationVisible,
} from '@entities/models';
import { setChatVisibility } from '@features/chat';
import { TAccountType } from '@shared/api';
import { useAppDispatch, useAppSelector } from '@shared/hooks';

export type TMenuProps = {
  id: string;
  show: boolean;
  icon: IconType;
  text: string;
  className?: string;
  isExternalLink?: boolean;
};

type TSelectHandler = (action: Key) => void;

export const useNavigationMenu = (): [TMenuProps[], TSelectHandler] => {
  const { is_specialist, is_client, account_type, is_onboarding } =
    useAppSelector(selectProfileData);
  const isDesktop = useMedia('(min-width: 640px)', false);
  const dispatch = useAppDispatch();

  const onPressHandler = useCallback(
    (action: Key) => {
      if (action === 'profile') {
        dispatch(openProfile());
        dispatch(closeAllUI());

        return;
      }

      if (action === 'schedule') {
        dispatch(openCalendar());
        dispatch(closeAllUI());

        return;
      }

      if (action === 'payments') {
        dispatch(openPayments());
        dispatch(closeAllUI());

        return;
      }

      if (action === 'settings') {
        dispatch(openSettings(account_type as TAccountType));
        dispatch(closeAllUI());

        return;
      }

      if (action === 'finances') {
        dispatch(openFinances());
        dispatch(closeAllUI());

        return;
      }

      if (action === 'logout') {
        dispatch(logout());
        dispatch(closeAllUI());

        return;
      }

      if (action === 'chats') {
        dispatch(setChatVisibility(true));

        return;
      }

      if (action === 'notification') {
        dispatch(setNotificationVisible(true));

        return;
      }

      if (action === 'support') {
        window.open(
          `https://t.me/sense_a_bot?start=${carrotquest.data.user.id}`
        );
      }
    },
    [account_type, dispatch]
  );

  const menuItems = useMemo(
    () =>
      [
        {
          id: 'schedule',
          show: is_specialist,
          icon: RiCalendar2Line,
          text: 'Расписание',
        },
        {
          id: 'profile',
          show: is_specialist || (is_client && !is_onboarding),
          icon: RiUser3Line,
          text: 'Профиль',
        },
        {
          id: 'finances',
          show: is_specialist,
          icon: RiBarChartBoxLine,
          text: 'Статистика и финансы',
        },
        {
          id: 'payments',
          show: is_client && !is_onboarding,
          icon: RiBarChartBoxLine,
          text: 'Списание и оплата',
        },
        {
          id: 'settings',
          show: is_specialist || (is_client && !is_onboarding),
          icon: RiSettings3Line,
          text: 'Настройки',
        },
        {
          id: 'chats',
          show: !isDesktop,
          icon: RiChat1Line,
          text: 'Чат',
        },
        {
          id: 'notification',
          show: !isDesktop,
          icon: RiNotification2Line,
          text: 'Центр нотификаций',
        },
        {
          id: 'support',
          show: is_specialist || is_client,
          icon: RiTelegramLine,
          text: 'Поддержка',
          isExternalLink: true,
        },
        {
          id: 'logout',
          show: is_specialist || is_client,
          icon: RiLogoutCircleLine,
          text: 'Выйти',
          className: 'text-content-accent-vivid',
        },
      ].filter(({ show }) => show),
    [is_client, is_specialist, is_onboarding, isDesktop]
  );

  return [menuItems, onPressHandler];
};
