import {
  CommonNotification,
  DisapprovalRecommendations,
  SessionCanceled,
  SessionMoved,
  SessionScheduled,
} from '@features/notifications';
import { TInboxItemResponseSchema, TTemplateType } from '@shared/api';

type ExcludedTemplate = Exclude<
  TTemplateType,
  | TTemplateType.ESession1HourReminder
  | TTemplateType.ENewChatMessage
  | TTemplateType.ESession24HoursReminder
>;

const ComponentMap = (type: ExcludedTemplate) =>
  ({
    [TTemplateType.ESessionMoved]: SessionMoved,
    [TTemplateType.ESessionCanceled]: SessionCanceled,
    [TTemplateType.ESessionScheduled]: SessionScheduled,
    [TTemplateType.ESpecialistProfileChangesDeclined]:
      DisapprovalRecommendations,
  })[type] || CommonNotification;

export const NotificationItemType: FCC<TInboxItemResponseSchema> = ({
  type,
  payload,
  is_read,
}) => {
  const Component = ComponentMap(type as ExcludedTemplate);

  return <Component {...(payload as IncompatibleType)} isRead={is_read} />;
};
