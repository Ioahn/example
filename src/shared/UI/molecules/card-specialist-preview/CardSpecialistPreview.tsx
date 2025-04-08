import { cn } from '@shared/utils';
import { AvatarThumbnail, Card } from '@shared/UI';

type SpecialistBookingPreviewProps = {
  firstName: string;
  lastName?: string | null;
  avatarUrl: string;
  specializationTitle: string;
  onPress?: () => void;
};

export function CardSpecialistPreview({
  firstName,
  lastName,
  avatarUrl,
  specializationTitle,
  children,
  onPress,
  className,
}: CommonProps<SpecialistBookingPreviewProps>) {
  return (
    <Card variant='secondary' className={cn('flex flex-col gap-6', className)}>
      <AvatarThumbnail
        name={`${firstName} ${lastName || ''}`}
        description={specializationTitle}
        size='base'
        img={avatarUrl}
        onPress={onPress}
        className={cn({
          ['cursor-pointer']: !!onPress,
        })}
      />
      {children}
    </Card>
  );
}
