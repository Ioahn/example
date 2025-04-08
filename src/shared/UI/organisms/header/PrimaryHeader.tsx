// TODO вынести hasAuth в компонент выше
import { useMedia } from 'react-use';
import { openPhoneAuthentication, selectAuthStatus } from '@entities/models';
import {
  DesktopNavigationPanel,
  MobileNavigationPanel,
} from '@features/navigation-panel';
import { TAccountType } from '@shared/api';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { Button } from '@shared/UI';
import { BaseHeader } from '@shared/UI';

export const PrimaryHeader: FCC = () => {
  const hasAuth = useAppSelector(selectAuthStatus);
  const dispatch = useAppDispatch();
  const isDesktop = useMedia('(min-width: 640px)', false);

  const Component = isDesktop ? DesktopNavigationPanel : MobileNavigationPanel;

  return (
    <BaseHeader>
      {!hasAuth ? (
        <Button
          onPress={() =>
            dispatch(openPhoneAuthentication(TAccountType.EClient))
          }
        >
          Войти
        </Button>
      ) : (
        <Component />
      )}
    </BaseHeader>
  );
};
