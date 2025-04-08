import { TAccountType, TAreaType } from '@shared/api/senseApi';

const enum CarrotEvent {
  LoginClicked = 'login_clicked',
  AuthSmsSent = 'auth_sms_sent',
  Authenticated = 'authenticated',
  OnboardingTopicSelectionOpened = 'onboarding_topic_selection_opened',
  OnboardingTopicSelectionSubmitted = 'onboarding_topic_selection_submitted',
  SpecialistSearchPageViewed = 'specialist_search_page_viewed',
  FilterApplied = 'filter_applied',
  SpecialistProfileViewed = 'specialist_profile_viewed',
  SpecialistScheduleOpened = 'specialist_schedule_opened',
  SpecialistSlotSelected = 'specialist_slot_selected',
  PromocodeUsed = 'promocode_used',
  SessionCallEntered = 'session_call_entered',
  SpecialistChangeClicked = 'specialist_change_clicked',
  PlatformChatOpened = 'platform_chat_opened',
  PlatformChatMessageSent = 'platform_chat_message_sent',
  NotificationsRead = 'notifications_read',
}

export const sendCarrotEventLoginClicked = () => {
  carrotquest?.track(CarrotEvent.LoginClicked);
};

export const sendCarrotEventAuthSmsSent = ({
  accountType,
}: {
  accountType: TAccountType;
}) => {
  carrotquest?.track(CarrotEvent.AuthSmsSent, { account_type: accountType });
};

export const sendCarrotEventAuthenticated = () => {
  carrotquest?.track(CarrotEvent.Authenticated);
};

export const sendCarrotEventOnboardingTopicSelectionOpened = () => {
  carrotquest?.track(CarrotEvent.OnboardingTopicSelectionOpened);
};

export const sendCarrotEventOnboardingTopicSelectionSubmitted = ({
  topics,
}: {
  topics: string[];
}) => {
  carrotquest?.track(CarrotEvent.OnboardingTopicSelectionSubmitted, { topics });
};

export const sendCarrotEventSpecialistSearchPageViewed = ({
  filters,
  page_num,
}: {
  filters: Record<string, string[] | string>;
  page_num: number;
}) => {
  carrotquest?.track(CarrotEvent.SpecialistSearchPageViewed, {
    filters: filters,
    page_num: page_num,
  });
};

export const sendCarrotEventFilterApplied = ({
  topics,
  gender,
  time,
  minPrice,
  maxPrice,
}: {
  topics: string[];
  gender?: string | null;
  time?: string | null;
  minPrice?: number | null;
  maxPrice?: number | null;
}) => {
  carrotquest?.track(CarrotEvent.FilterApplied, {
    topics,
    gender,
    time,
    minPrice,
    maxPrice,
  });
};

export const sendCarrotEventSpecialistProfileViewed = ({
  specialistId,
  specialistName,
}: {
  specialistId: string;
  specialistName: string;
}) => {
  carrotquest?.track(CarrotEvent.SpecialistProfileViewed, {
    specialist_id: specialistId,
    specialist_name: specialistName,
  });
};

export const sendCarrotEventSpecialistScheduleOpened = ({
  specialistId,
  specialistName,
}: {
  specialistId: string;
  specialistName: string;
}) => {
  carrotquest?.track(CarrotEvent.SpecialistScheduleOpened, {
    specialist_id: specialistId,
    specialist_name: specialistName,
  });
};

export const sendCarrotEventSpecialistSlotSelected = ({
  specialistId,
  specialistName,
  slotId,
  slotDateTimeUtc,
  onPageUrl,
  area,
}: {
  specialistId: string;
  specialistName: string;
  slotId: string;
  slotDateTimeUtc: string;
  onPageUrl: string;
  area: string;
}) => {
  carrotquest?.track(CarrotEvent.SpecialistSlotSelected, {
    specialist_id: specialistId,
    specialist_name: specialistName,
    slot_id: slotId,
    slot_datetime_utc: slotDateTimeUtc,
    on_page_url: onPageUrl,
    area: area,
  });
};

export const sendCarrotEventPromocodeUsed = ({
  promocode,
  area,
  specialistId,
  specialistName,
}: {
  promocode: string;
  area: TAreaType;
  specialistId: string;
  specialistName: string;
}) => {
  carrotquest?.track(CarrotEvent.PromocodeUsed, {
    promocode: promocode,
    area: area,
    specialist_id: specialistId,
    specialist_name: specialistName,
  });
};

export const sendCarrotEventSessionCallEntered = ({
  sessionId,
}: {
  sessionId: string;
}) => {
  carrotquest?.track(CarrotEvent.SessionCallEntered, {
    session_id: sessionId,
  });
};

export const sendCarrotEventSpecialistChangeClicked = () => {
  carrotquest?.track(CarrotEvent.SpecialistChangeClicked);
};

export const sendCarrotEventPlatformChatOpened = () => {
  carrotquest?.track(CarrotEvent.PlatformChatOpened);
};

export const sendCarrotEventPlatformChatMessageSent = ({
  chatId,
}: {
  chatId: string;
}) => {
  carrotquest?.track(CarrotEvent.PlatformChatMessageSent, {
    chat_id: chatId,
  });
};

export const sendCarrotEventNotificationsRead = () => {
  carrotquest?.track(CarrotEvent.NotificationsRead);
};
