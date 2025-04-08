import {
  removeClientAvatar,
  selectShortProfile,
  uploadClientAvatar,
} from '@entities/models';
import { useAppDispatch, useAppSelector } from '@shared/hooks';
import { FileUploadInput } from '@shared/UI';

export const PictureUpload = () => {
  const dispatch = useAppDispatch();
  const { avatar_url } = useAppSelector(selectShortProfile);

  return (
    <FileUploadInput
      label='Загрузить фото'
      accept={{ 'image/*': ['.jpeg', '.png'] }}
      maxFiles={1}
      onChange={(data) => dispatch(uploadClientAvatar(data as AnyObject))}
      onRemove={() => dispatch(removeClientAvatar())}
      defaultValue={avatar_url as string | undefined}
    />
  );
};
