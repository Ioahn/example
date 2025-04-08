import { openCalendar, openProfile, selectProfileData } from '@entities/models';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { AvatarThumbnail, Button } from '@shared/UI';

export const UserName = () => {
  const { full_name, hasName, avatar_url, is_specialist } =
    useAppSelector(selectProfileData);
  const dispatch = useAppDispatch();

  return (
    hasName && (
      <Button
        onPress={() =>
          is_specialist ? dispatch(openCalendar()) : dispatch(openProfile())
        }
        variant='clear'
      >
        <AvatarThumbnail img={avatar_url} name={full_name} size='md' />
      </Button>
    )
  );
};
