/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse, HeadersDefaults, ResponseType } from 'axios';
import axios from 'axios';

/** AccountSettings */
export interface TAccountSettings {
  /**
   * Timezone
   * @default "Europe/Moscow"
   */
  timezone?: string;
  /** @default {} */
  notifications?: TNotificationSettings;
}

/** AccountType */
export enum TAccountType {
  ESpecialist = 'specialist',
  EClient = 'client',
}

/** AreaType */
export enum TAreaType {
  ECoaching = 'coaching',
  EPsychotherapy = 'psychotherapy',
}

/** b2BApplicationRequestSchema */
export interface TB2BApplicationRequestSchema {
  /** Name */
  name: string;
  /** Email */
  email: string;
  /** Phone Number */
  phone_number: string;
  /** Company Name */
  company_name: string;
}

/** BaseScheduleSlotSchema */
export interface TBaseScheduleSlotSchema {
  /** Id */
  id: string;
  /** Slot Date */
  slot_date: number;
}

/** BlogResponseSchema */
export interface TBlogResponseSchema {
  /** Id */
  id: string;
  /** Title */
  title: string;
  /** Body */
  body: string;
  /** Preview Image */
  preview_image: string;
  /**
   * Areas
   * @default []
   */
  areas?: TAreaType[];
  /**
   * Tags
   * @default []
   */
  tags?: string[];
  /** Author Full Name */
  author_full_name: string;
  /** Author Avatar Url */
  author_avatar_url: string;
  /** Created At */
  created_at: number;
}

/** BlogsResponseSchema */
export interface TBlogsResponseSchema {
  /**
   * Blogs
   * @default []
   */
  blogs?: TShortBlogResponseSchema[];
  /**
   * Page Num
   * @default 1
   */
  page_num?: number;
  /**
   * Page Size
   * @default 10
   */
  page_size?: number;
  /** Total Pages */
  total_pages: number;
}

/** applyPromocodeRequestBody */
export interface TBodyApplyPromocode {
  /** Promocode Code */
  promocode_code: string;
  /** Product Id */
  product_id: string;
}

/** authenticateByEmailCodeRequestBody */
export interface TBodyAuthenticateByEmailCode {
  /** Email */
  email: string;
  /** Code */
  code: string;
  account_type: TAccountType;
}

/** authenticateBySmsCodeRequestBody */
export interface TBodyAuthenticateBySmsCode {
  /** Phone Number */
  phone_number: string;
  /**
   * Code
   * @minLength 4
   * @maxLength 4
   */
  code: string;
  account_type: TAccountType;
}

/** cancelSessionRequestBody */
export interface TBodyCancelSession {
  /** Session Id */
  session_id: string;
}

/** changeSlotDateRequestBody */
export interface TBodyChangeSlotDate {
  /** Slot Id */
  slot_id: string;
  /** New Date */
  new_date: number;
}

/** excludeScheduleSlotsRequestBody */
export interface TBodyExcludeScheduleSlots {
  /** Slot Ids */
  slot_ids: string[];
}

/** finishSessionRequestBody */
export interface TBodyFinishSession {
  /** Session Id */
  session_id: string;
}

/** getPaymentUrlForProductPurchaseRequestBody */
export interface TBodyGetPaymentUrlForProductPurchase {
  /** Product Id */
  product_id: string;
  /** Specialist Id */
  specialist_id: string;
  /** Slot Id */
  slot_id: string;
  /**
   * Save Card
   * @default false
   */
  save_card?: boolean;
  /** Promocode */
  promocode?: string | null;
}

/** handleWebhookApiCarrotquestWebhookPostRequestBody */
export interface TBodyHandleWebhookApiCarrotquestWebhookPost {
  /**
   * Type
   * @default "event"
   */
  type?: string;
  /** Token */
  token: string;
  /** User */
  user?: string | null;
  /** User Id */
  user_id?: string | null;
  /** Event Name */
  event_name: string;
  /** Event */
  event: string;
  /** Event Id */
  event_id?: string | null;
}

/** moveScheduleSlotRequestBody */
export interface TBodyMoveScheduleSlot {
  /** Slot Id */
  slot_id: string;
  /** New Slot Date */
  new_slot_date: number;
}

/** moveSessionRequestBody */
export interface TBodyMoveSession {
  /** Session Id */
  session_id: string;
  /** New Specialist Slot Id */
  new_specialist_slot_id: string;
}

/** payForProductBySavedPaymentMethRequestBody */
export interface TBodyPayForProductBySavedPaymentMethod {
  /** Product Id */
  product_id: string;
  /** Specialist Id */
  specialist_id: string;
  /** Slot Id */
  slot_id: string;
  /** Promocode */
  promocode?: string | null;
}

/** restoreScheduleSlotsRequestBody */
export interface TBodyRestoreScheduleSlots {
  /** Slot Ids */
  slot_ids: string[];
}

/** sendAuthenticationEmailCodeRequestBody */
export interface TBodySendAuthenticationEmailCode {
  /** Email */
  email: string;
  account_type: TAccountType;
}

/** sendAuthenticationSmsCodeRequestBody */
export interface TBodySendAuthenticationSmsCode {
  /** Phone Number */
  phone_number: string;
  account_type: TAccountType;
}

/** sendMessageApiChatsChatIdSendMessagePostRequestBody */
export interface TBodySendMessageApiChatsChatIdSendMessagePost {
  /** Message Text */
  message_text: string;
}

/** setCarrotClientUiRequestBody */
export interface TBodySetCarrotClientUid {
  /** Carrot Client Uid */
  carrot_client_uid: string;
}

/** submitSessionFeedbackRequestBody */
export interface TBodySubmitSessionFeedback {
  /** Session Id */
  session_id: string;
  /** Video Quality Rating */
  video_quality_rating?: number | null;
  /** Overall Experience Rating */
  overall_experience_rating?: number | null;
}

/** subscribeOnNewsletterRequestBody */
export interface TBodySubscribeOnNewsletter {
  /** Email */
  email: string;
}

/** updateClientSettingsRequestBody */
export interface TBodyUpdateClientSettings {
  /** First Name */
  first_name: string;
  /** Last Name */
  last_name?: string | null;
  /** Birth Year */
  birth_year: number;
  gender?: TGender | null;
  /** Topic Ids */
  topic_ids: string[];
  /** Time Zone */
  time_zone?: string | null;
  /** Email */
  email?: string | null;
}

/** updateClientTimezoneRequestBody */
export interface TBodyUpdateClientTimezone {
  /** Timezone */
  timezone: string;
}

/** updateSpecialistProfileRequestBody */
export interface TBodyUpdateSpecialistProfile {
  /** Avatar */
  avatar?: string | File | null;
  /** Specialization Title */
  specialization_title: string;
  /** First Name */
  first_name: string;
  /** Last Name */
  last_name: string;
  /** Middle Name */
  middle_name: string;
  /** Gender */
  gender: string;
  /** Started Practice Year */
  started_practice_year: number;
  /** Birth Year */
  birth_year: number;
  /** About Me */
  about_me: string;
  /** Languages */
  languages: string;
  /** Education */
  education: string;
  /** Topic Ids */
  topic_ids: string;
  /** Working Areas */
  working_areas: string;
  /** Additional Education */
  additional_education?: string | null;
}

/** updateSpecialistTimezoneRequestBody */
export interface TBodyUpdateSpecialistTimezone {
  /** Timezone */
  timezone: string;
}

/** uploadClientAvatarRequestBody */
export interface TBodyUploadClientAvatar {
  /**
   * File
   * @format binary
   */
  file: File;
}

/** CallbackOperationType */
export enum TCallbackOperationType {
  EBindingCreated = 'bindingCreated',
  EApproved = 'approved',
  EDeposited = 'deposited',
  EReversed = 'reversed',
  ERefunded = 'refunded',
  EDeclinedByTimeout = 'declinedByTimeout',
}

/** CallbackStatus */
export enum TCallbackStatus {
  EValue1 = 1,
  EValue0 = 0,
}

/** CareerEntry */
export interface TCareerEntry {
  /** Year */
  year: number;
  /** Name */
  name: string;
}

/** ChangeFormTopicSchema */
export interface TChangeFormTopicSchema {
  /** Id */
  id: string;
  area: TAreaType;
  /** Name */
  name: string;
  /** Icon */
  icon?: string | null;
  /** Category */
  category: string;
  /**
   * Is Chosen
   * @default false
   */
  is_chosen?: boolean;
}

/** ChatInterlocutorSchema */
export interface TChatInterlocutorSchema {
  /** Id */
  id: string;
  /** Avatar Url */
  avatar_url?: string | null;
  /** Name */
  name: string;
}

/** ChatMessagesResponseSchema */
export interface TChatMessagesResponseSchema {
  /**
   * Messages
   * @default []
   */
  messages?: TMessageSchema[];
  /**
   * Page Num
   * @default 1
   */
  page_num?: number;
}

/** ChatResponseSchema */
export interface TChatResponseSchema {
  /** Id */
  id: string;
  interlocutor: TChatInterlocutorSchema;
  last_message?: TMessageSchema | null;
}

/** ChatsResponseSchema */
export interface TChatsResponseSchema {
  /**
   * Chats
   * @default []
   */
  chats?: TChatResponseSchema[];
  /**
   * Page Num
   * @default 1
   */
  page_num?: number;
}

/** ClientMainCabResponseSchema */
export interface TClientMainCabResponseSchema {
  next_session?: TNextSessionSchema | null;
  /**
   * Scheduled Future Sessions
   * @default []
   */
  scheduled_future_sessions?: TScheduledSessionResponseSchema[];
  specialist?: TSpecialistProfileResponseSchema | null;
}

/** ClientSettingsResponseSchema */
export interface TClientSettingsResponseSchema {
  /** Id */
  id: string;
  /** Avatar Url */
  avatar_url?: string | null;
  /** First Name */
  first_name?: string | null;
  /** Last Name */
  last_name?: string | null;
  gender?: TGender | null;
  /** Birth Year */
  birth_year?: number | null;
  /** Topics */
  topics: TChangeFormTopicSchema[];
  settings: TAccountSettings;
  /** Email */
  email?: string | null;
  /** Phone Number */
  phone_number: string;
}

/** ClientTransactionEntrySchema */
export interface TClientTransactionEntrySchema {
  /** Id */
  id: string;
  /** Title */
  title: string;
  /** Date */
  date: number;
}

/** Gender */
export enum TGender {
  EMale = 'male',
  EFemale = 'female',
}

/** HTTPValidationError */
export interface THTTPValidationError {
  /** Detail */
  detail?: TValidationError[];
}

/** InboxItemResponseSchema */
export interface TInboxItemResponseSchema {
  /** Id */
  id: string;
  type: TTemplateType;
  /** Payload */
  payload: object;
  /** Is Read */
  is_read: boolean;
  /** Created At */
  created_at: number;
}

/** InboxItemsResponseSchema */
export interface TInboxItemsResponseSchema {
  /**
   * Inboxes
   * @default []
   */
  inboxes?: TInboxItemResponseSchema[];
  /** Page Num */
  page_num: number;
  /** Has More */
  has_more: boolean;
}

/** konsolWebhookSchema */
export interface TKonsolWebhookSchema {
  /** Details */
  details: object;
  manifest: TManifestSchema;
}

/** Language */
export enum TLanguage {
  EEn = 'en',
  ERu = 'ru',
}

/** MainCabResponseSchema */
export interface TMainCabResponseSchema {
  schedule: TSpecialistScheduleResponseSchema;
  next_session?: TNextSessionSchema | null;
}

/** ManifestSchema */
export interface TManifestSchema {
  /** Action Cipher */
  action_cipher: string;
}

/** MessageSchema */
export interface TMessageSchema {
  /** Id */
  id: string;
  /** Sender Id */
  sender_id: string;
  /** Message Text */
  message_text: string;
  /** Sent At */
  sent_at: number;
  /** Is Read */
  is_read: boolean;
}

/** MinimalClientResponseSchema */
export interface TMinimalClientResponseSchema {
  /** Id */
  id: string;
  /** Avatar Url */
  avatar_url?: string | null;
  /** First Name */
  first_name?: string | null;
  /** Last Name */
  last_name?: string | null;
}

/** NextSessionSchema */
export interface TNextSessionSchema {
  /** Id */
  id: string;
  area: TAreaType;
  /** Utc Date */
  utc_date: number;
  /**
   * Is Able To Enter
   * @default true
   */
  is_able_to_enter?: boolean;
  interlocutor: TModulesSessionsScheduleSchemasInterlocutorSchema;
}

/** NotificationSettings */
export type TNotificationSettings = object;

/** PaymentMethodCreationLinkResponse */
export interface TPaymentMethodCreationLinkResponse {
  /** Form Url */
  form_url: string;
}

/** PaymentMethodSchema */
export interface TPaymentMethodSchema {
  /** Pan */
  pan: string;
  /** Expiry Date */
  expiry_date: string;
}

/** PaymentUrlResponseSchema */
export interface TPaymentUrlResponseSchema {
  /** Payment Url */
  payment_url: string;
}

/** PurchaseBySavingPaymentMethodResponseSchema */
export interface TPurchaseBySavingPaymentMethodResponseSchema {
  /** Redirect Url */
  redirect_url: string;
}

/** PurchaseInfoSchema */
export interface TPurchaseInfoSchema {
  specialist: TPurchaseSpecialistInfoSchema;
  area: TAreaType;
  /** Scheduled Utc Date */
  scheduled_utc_date: number;
}

/** PurchaseSpecialistInfoSchema */
export interface TPurchaseSpecialistInfoSchema {
  /** Id */
  id: string;
  /** First Name */
  first_name: string;
  /** Last Name */
  last_name: string;
  /** Avatar Url */
  avatar_url: string;
}

/** PurchaseStateResponseSchema */
export interface TPurchaseStateResponseSchema {
  /** Success */
  success: boolean;
  /** Error Message */
  error_message?: string | null;
  /** Metrika Goal Name */
  metrika_goal_name?: string | null;
  purchase?: TPurchaseInfoSchema | null;
}

/** ScheduleOptionResponseSchema */
export interface TScheduleOptionResponseSchema {
  /** Id */
  id?: string;
  week_day: TWeekDay;
  /**
   * Hour
   * @min 0
   * @max 23
   */
  hour: number;
  /**
   * Minute
   * @min 0
   * @max 59
   * @default 0
   */
  minute?: number;
  /** Has Existing Sessions */
  has_existing_sessions: boolean;
}

/** ScheduleOptionSchema */
export interface TScheduleOptionSchema {
  /** Id */
  id?: string;
  week_day: TWeekDay;
  /**
   * Hour
   * @min 0
   * @max 23
   */
  hour: number;
  /**
   * Minute
   * @min 0
   * @max 59
   * @default 0
   */
  minute?: number;
}

/** ScheduleSettingsResponseSchema */
export interface TScheduleSettingsResponseSchema {
  /**
   * Min Hours To Appoint
   * @default 24
   */
  min_hours_to_appoint?: number;
  /**
   * Max Ahead Weeks Available To Appoint
   * @default 4
   */
  max_ahead_weeks_available_to_appoint?: number;
  /**
   * Working Week Days Hours
   * @default []
   */
  working_week_days_hours?: TScheduleOptionResponseSchema[];
}

/** scheduleSettingsSchema */
export interface TScheduleSettingsSchema {
  /**
   * Min Hours To Appoint
   * @default 24
   */
  min_hours_to_appoint?: number;
  /**
   * Max Ahead Weeks Available To Appoint
   * @default 4
   */
  max_ahead_weeks_available_to_appoint?: number;
  /**
   * Working Week Days Hours
   * @default []
   */
  working_week_days_hours?: TScheduleOptionSchema[];
}

/** ScheduleSlotSchema */
export interface TScheduleSlotSchema {
  /** Id */
  id: string;
  /** Slot Date */
  slot_date: number;
  /** Is Available */
  is_available: boolean;
  /** Is Excluded */
  is_excluded: boolean;
  /** Is Booked */
  is_booked: boolean;
  is_booked_as?: TAreaType | null;
  client?: TMinimalClientResponseSchema | null;
}

/** ScheduleSlotsSchema */
export interface TScheduleSlotsSchema {
  /**
   * For Single
   * @default []
   */
  for_single?: TShortWeekDayScheduleSlotsSchema[];
}

/** ScheduledSessionResponseSchema */
export interface TScheduledSessionResponseSchema {
  /** Id */
  id: string;
  area: TAreaType;
  /** Utc Date */
  utc_date: number;
  /** Is Able To Cancel */
  is_able_to_cancel: boolean;
  /** Is Able To Move */
  is_able_to_move: boolean;
}

/** SessionsProductSchema */
export interface TSessionsProductSchema {
  /** Id */
  id: string;
  /** One Session Price */
  one_session_price: number;
  /** Discount Percent Value */
  discount_percent_value?: number | null;
  /** Full Amount */
  full_amount?: number | null;
  /** Current Promocode */
  current_promocode?: string | null;
}

/** ShortBlogResponseSchema */
export interface TShortBlogResponseSchema {
  /** Id */
  id: string;
  /** Title */
  title: string;
  /** Body Preview */
  body_preview: string;
  /** Preview Image */
  preview_image: string;
  /**
   * Areas
   * @default []
   */
  areas?: TAreaType[];
  /**
   * Tags
   * @default []
   */
  tags?: string[];
  /** Created At */
  created_at: number;
  /** Updated At */
  updated_at: number;
}

/** ShortClientInfoResponseSchema */
export interface TShortClientInfoResponseSchema {
  /** Id */
  id: string;
  /** Avatar Url */
  avatar_url?: string | null;
  /** First Name */
  first_name?: string | null;
  /** Last Name */
  last_name?: string | null;
  /**
   * Has Payment Method
   * @default false
   */
  has_payment_method?: boolean;
  /**
   * Is Onboarding
   * @default false
   */
  is_onboarding?: boolean;
  /**
   * Has New Notifications
   * @default false
   */
  has_new_notifications?: boolean;
  /**
   * Has New Chat Messages
   * @default false
   */
  has_new_chat_messages?: boolean;
  current_area?: TAreaType | null;
  /**
   * Is Telegram Notifications Connected
   * @default false
   */
  is_telegram_notifications_connected?: boolean;
}

/** ShortSpecialistInfoResponseSchema */
export interface TShortSpecialistInfoResponseSchema {
  /** Id */
  id: string;
  /** First Name */
  first_name?: string | null;
  /** Last Name */
  last_name?: string | null;
  /** Avatar Url */
  avatar_url?: string | null;
  /**
   * Is Onboarding
   * @default false
   */
  is_onboarding?: boolean;
  onboarding_stage?: TSpecialistOnboardingStage | null;
  /**
   * Has New Notifications
   * @default false
   */
  has_new_notifications?: boolean;
  /**
   * Has New Chat Messages
   * @default false
   */
  has_new_chat_messages?: boolean;
  /**
   * Is Telegram Notifications Connected
   * @default false
   */
  is_telegram_notifications_connected?: boolean;
}

/** ShortWeekDayScheduleSlotsSchema */
export interface TShortWeekDayScheduleSlotsSchema {
  /** Date */
  date: number;
  /**
   * Slots
   * @default []
   */
  slots?: TBaseScheduleSlotSchema[];
}

/** SpecialistFinanceOperationSchema */
export interface TSpecialistFinanceOperationSchema {
  /** Id */
  id: string;
  /** Image */
  image?: string | null;
  /** Title */
  title: string;
  /** Date */
  date: number;
  /** Amount */
  amount: string;
  /** Amount Description */
  amount_description: string;
}

/** SpecialistFinancesOperationsResponseSchema */
export interface TSpecialistFinancesOperationsResponseSchema {
  /**
   * Operations
   * @default []
   */
  operations?: TSpecialistFinanceOperationSchema[];
  /**
   * Page Num
   * @default 1
   */
  page_num?: number;
  /**
   * Page Size
   * @default 10
   */
  page_size?: number;
}

/** SpecialistFinancesResponseSchema */
export interface TSpecialistFinancesResponseSchema {
  stats: TSpecialistStatsResponseSchema;
}

/** SpecialistOnboardingStage */
export enum TSpecialistOnboardingStage {
  EProfileEdit = 'profile_edit',
  EFirstScheduleSettings = 'first_schedule_settings',
}

/** SpecialistProfileCurrentStateSchema */
export interface TSpecialistProfileCurrentStateSchema {
  /** Id */
  id: string;
  /** Specialization Title */
  specialization_title: string;
  /** First Name */
  first_name: string;
  /** Last Name */
  last_name: string;
  /** Avatar Url */
  avatar_url: string;
  /** Experience */
  experience: number;
  /** About Me */
  about_me: string;
  /**
   * Education
   * @default []
   */
  education?: TCareerEntry[];
  /**
   * Languages
   * @default []
   */
  languages?: (TLanguage | string)[];
  /** Working Areas */
  working_areas: TAreaType[];
  /** Additional Education */
  additional_education: TCareerEntry[];
  /** Topics */
  topics: TTopicSchema[];
}

/** SpecialistProfileResponseSchema */
export interface TSpecialistProfileResponseSchema {
  /** Id */
  id: string;
  /** Specialization Title */
  specialization_title: string;
  /** First Name */
  first_name: string;
  /**
   * Last Name
   * Could be none if requested from non-authenticated zone
   */
  last_name?: string | null;
  /** Avatar Url */
  avatar_url: string;
  /** Experience */
  experience: number;
  /** About Me */
  about_me: string;
  /**
   * Education
   * @default []
   */
  education?: TCareerEntry[];
  /**
   * Languages
   * @default []
   */
  languages?: (TLanguage | string)[];
  /** Working Areas */
  working_areas: TAreaType[];
  /** Additional Education */
  additional_education: TCareerEntry[];
  /** Topics */
  topics: TTopicSchema[];
  schedule_slots: TScheduleSlotsSchema;
  /**
   * Slots
   * @default []
   */
  slots?: TBaseScheduleSlotSchema[];
  /** Price Options */
  price_options: Record<string, TSessionsProductSchema>;
}

/** SpecialistProfileUpdateFormDataSchema */
export interface TSpecialistProfileUpdateFormDataSchema {
  /** Id */
  id: string;
  /** Specialization Title */
  specialization_title?: string | null;
  /** First Name */
  first_name?: string | null;
  /** Last Name */
  last_name?: string | null;
  /** Middle Name */
  middle_name?: string | null;
  /** Avatar Url */
  avatar_url?: string | null;
  gender?: TGender | null;
  /** Started Practice Year */
  started_practice_year?: number | null;
  /** Birth Year */
  birth_year?: number | null;
  /** About Me */
  about_me?: string | null;
  /**
   * Education
   * @default []
   */
  education?: TCareerEntry[];
  /**
   * Languages
   * @default []
   */
  languages?: TLanguage[];
  /**
   * Working Areas
   * @default []
   */
  working_areas?: TAreaType[];
  /**
   * Additional Education
   * @default []
   */
  additional_education?: TCareerEntry[];
  /**
   * Topics
   * @default []
   */
  topics?: TTopicSchema[];
}

/** SpecialistProfileUpdateResponseSchema */
export interface TSpecialistProfileUpdateResponseSchema {
  /** null if profile has not been filled yet */
  current_profile_state?: TSpecialistProfileCurrentStateSchema | null;
  update_form_data: TSpecialistProfileUpdateFormDataSchema;
  /**
   * Has Approval Waiting Changes
   * @default false
   */
  has_approval_waiting_changes?: boolean;
  /** Disapproval Recommendation */
  disapproval_recommendation?: string | null;
}

/** SpecialistScheduleResponseSchema */
export interface TSpecialistScheduleResponseSchema {
  settings?: TScheduleSettingsResponseSchema | null;
  /**
   * All Schedule Slots
   * @default []
   */
  all_schedule_slots?: TWeekDayScheduleSlotsSchema[];
}

/** SpecialistSearchEntrySchema */
export interface TSpecialistSearchEntrySchema {
  /** Id */
  id: string;
  /** First Name */
  first_name: string;
  /**
   * Last Name
   * Could be none if requested from non-authenticated zone
   */
  last_name?: string | null;
  /** Avatar Url */
  avatar_url: string;
  /** Working Areas */
  working_areas: TAreaType[];
  /** Specialization Title */
  specialization_title: string;
  /** Experience */
  experience: number;
  /**
   * Languages
   * @default []
   */
  languages?: (TLanguage | string)[];
  /** Topics */
  topics: TTopicSchema[];
  /** About Me */
  about_me: string;
  /** Minimal Session Price */
  minimal_session_price: number;
  /**
   * Is Fit Filter
   * @default true
   */
  is_fit_filter?: boolean;
  /** Future Dates With Free Slots */
  future_dates_with_free_slots: TSpecialistSearchSlotsSchema[];
}

/** SpecialistSearchSlotsSchema */
export interface TSpecialistSearchSlotsSchema {
  /** Date */
  date: number;
  /** Slots Num */
  slots_num: number;
}

/** SpecialistSettingsSchema */
export interface TSpecialistSettingsSchema {
  /** Email */
  email?: string | null;
  settings: TAccountSettings;
  /** Phone Number */
  phone_number: string;
}

/** SpecialistStatsResponseSchema */
export interface TSpecialistStatsResponseSchema {
  /** Current Month Earnings */
  current_month_earnings: string;
  /** Previous Month Earnings */
  previous_month_earnings?: string | null;
  /** Last Time Paid */
  last_time_paid?: string | null;
  /**
   * Current Month Sessions Number
   * @default 0
   */
  current_month_sessions_number?: number;
  /** Next Payout Date */
  next_payout_date?: number | null;
}

/** specialistUpdateSettingsRequestSchema */
export interface TSpecialistUpdateSettingsRequestSchema {
  /** Email */
  email?: string | null;
  settings: TAccountSettings;
}

/** SpecialistsSearchResponseSchema */
export interface TSpecialistsSearchResponseSchema {
  /**
   * Page Num
   * @default 1
   */
  page_num?: number;
  /** Has More */
  has_more: boolean;
  /**
   * Specialists
   * @default []
   */
  specialists?: TSpecialistSearchEntrySchema[];
}

/** SuccessResponse */
export interface TSuccessResponse {
  /**
   * Success
   * @default true
   */
  success?: boolean;
}

/** SuccessfulAuthenticationResponseSchema */
export interface TSuccessfulAuthenticationResponseSchema {
  /** Auth Token */
  auth_token: string;
  account_type: TAccountType;
}

/** TelegramNotificationsResponseSchema */
export interface TTelegramNotificationsResponseSchema {
  /** Telegram Url */
  telegram_url: string;
}

/** TemplateType */
export enum TTemplateType {
  ESessionScheduled = 'session_scheduled',
  ESessionCanceled = 'session_canceled',
  ESessionMoved = 'session_moved',
  ESpecialistProfileChangesDeclined = 'specialist_profile_changes_declined',
  ESession24HoursReminder = 'session_24_hours_reminder',
  ESession1HourReminder = 'session_1_hour_reminder',
  ENewChatMessage = 'new_chat_message',
}

/** TimezoneResponseSchema */
export interface TTimezoneResponseSchema {
  /** Timezone */
  timezone: string;
}

/** TopicCategoryMapSchema */
export interface TTopicCategoryMapSchema {
  /** Category */
  category: string;
  /** Topics */
  topics: TTopicSchema[];
}

/** TopicSchema */
export interface TTopicSchema {
  /** Id */
  id: string;
  area: TAreaType;
  /** Name */
  name: string;
  /** Icon */
  icon?: string | null;
  /** Category */
  category: string;
}

/** TopicsResponseSchema */
export interface TTopicsResponseSchema {
  /**
   * Topics
   * @default []
   */
  topics?: TTopicCategoryMapSchema[];
}

/** TransactionsSchema */
export interface TTransactionsSchema {
  /** Has More */
  has_more: boolean;
  /**
   * Page Num
   * @default 1
   */
  page_num?: number;
  /**
   * Transactions
   * @default []
   */
  transactions?: TClientTransactionEntrySchema[];
}

/** UserHashResponseSchema */
export interface TUserHashResponseSchema {
  /** User Hash */
  user_hash: string;
}

/** ValidationError */
export interface TValidationError {
  /** Location */
  loc: (string | number)[];
  /** Message */
  msg: string;
  /** Error Type */
  type: string;
}

/** VideoSessionInfoResponseSchema */
export interface TVideoSessionInfoResponseSchema {
  /** Id */
  id: string;
  /** Session Finish Date */
  session_finish_date: number;
  interlocutor: TModulesVideoWebrtcSchemasInterlocutorSchema;
  /** Jwt Token */
  jwt_token: string;
}

/** WeekDay */
export enum TWeekDay {
  EValue0 = 0,
  EValue1 = 1,
  EValue2 = 2,
  EValue3 = 3,
  EValue4 = 4,
  EValue5 = 5,
  EValue6 = 6,
}

/** WeekDayScheduleSlotsSchema */
export interface TWeekDayScheduleSlotsSchema {
  /** Date */
  date: number;
  /**
   * Slots
   * @default []
   */
  slots?: TScheduleSlotSchema[];
}

/** InterlocutorSchema */
export interface TModulesSessionsScheduleSchemasInterlocutorSchema {
  /** First Name */
  first_name: string;
  /** Last Name */
  last_name?: string | null;
  /** Avatar Url */
  avatar_url?: string | null;
}

/** InterlocutorSchema */
export interface TModulesVideoWebrtcSchemasInterlocutorSchema {
  /** Id */
  id: string;
  /** First Name */
  first_name: string;
  /** Last Name */
  last_name?: string | null;
  /** Avatar Url */
  avatar_url?: string | null;
}

export namespace Api {
  /**
   * No description
   * @tags Auth API
   * @name SendAuthenticationSmsCode
   * @summary Send Sms Code
   * @request POST:/api/auth/sms/send-code
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace SendAuthenticationSmsCode {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodySendAuthenticationSmsCode;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Auth API
   * @name AuthenticateBySmsCode
   * @summary Authenticate By Code
   * @request POST:/api/auth/sms/authenticate-by-code
   * @response `200` `TSuccessfulAuthenticationResponseSchema` Successful Response
   * @response `401` `void` BadAuthenticationCode
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace AuthenticateBySmsCode {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodyAuthenticateBySmsCode;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessfulAuthenticationResponseSchema;
  }
  /**
   * No description
   * @tags Auth API
   * @name SendAuthenticationEmailCode
   * @summary Send Email Code
   * @request POST:/api/auth/email/send-code
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace SendAuthenticationEmailCode {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodySendAuthenticationEmailCode;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Auth API
   * @name AuthenticateByEmailCode
   * @summary Authenticate By Email Code
   * @request POST:/api/auth/email/authenticate-by-code
   * @response `200` `TSuccessfulAuthenticationResponseSchema` Successful Response
   * @response `401` `void` BadAuthenticationCode
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace AuthenticateByEmailCode {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodyAuthenticateByEmailCode;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessfulAuthenticationResponseSchema;
  }
  /**
   * No description
   * @tags Topics API
   * @name GetAllTopics
   * @summary Get Topics
   * @request GET:/api/topics
   * @response `200` `TTopicsResponseSchema` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace GetAllTopics {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Area Type */
      area_type?: TAreaType | null;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TTopicsResponseSchema;
  }
  /**
   * No description
   * @tags Specialist API
   * @name GetSpecialistProfileForUpdate
   * @summary Get Specialist Profile Data For Update
   * @request GET:/api/specialist/profile
   * @secure
   * @response `200` `TSpecialistProfileUpdateResponseSchema` Successful Response
   */
  export namespace GetSpecialistProfileForUpdate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TSpecialistProfileUpdateResponseSchema;
  }
  /**
   * No description
   * @tags Specialist API
   * @name UpdateSpecialistProfile
   * @summary Update Specialist Profile Data
   * @request POST:/api/specialist/profile
   * @secure
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace UpdateSpecialistProfile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodyUpdateSpecialistProfile;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Specialist API
   * @name UpdateScheduleSettings
   * @summary Update Schedule Settings
   * @request POST:/api/specialist/schedule/update-settings
   * @secure
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace UpdateScheduleSettings {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TScheduleSettingsSchema;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Specialist API
   * @name ExcludeScheduleSlots
   * @summary Exclude Schedule Slots
   * @request POST:/api/specialist/schedule/exclude-slots
   * @secure
   * @response `200` `TSuccessResponse` Successful Response
   * @response `400` `void` CantExcludeBookedSlotException
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace ExcludeScheduleSlots {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodyExcludeScheduleSlots;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Specialist API
   * @name AddSlot
   * @summary Add Slot
   * @request POST:/api/specialist/schedule/add-slot
   * @secure
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace AddSlot {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Slot Date
       * @format date-time
       */
      slot_date: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Specialist API
   * @name RestoreScheduleSlots
   * @summary Restore Schedule Slots
   * @request POST:/api/specialist/schedule/restore-slots
   * @secure
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace RestoreScheduleSlots {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodyRestoreScheduleSlots;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Specialist API
   * @name ChangeSlotDate
   * @summary Change Slot Date
   * @request POST:/api/specialist/schedule/change-slot-date
   * @secure
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace ChangeSlotDate {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodyChangeSlotDate;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Specialist API
   * @name MoveScheduleSlot
   * @summary Move Schedule Slot
   * @request POST:/api/specialist/schedule/move-session
   * @secure
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace MoveScheduleSlot {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodyMoveScheduleSlot;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Specialist API
   * @name GetSpecialistMainCabinetPage
   * @summary Get Cabinet Main Page
   * @request GET:/api/specialist
   * @secure
   * @response `200` `TMainCabResponseSchema` Successful Response
   */
  export namespace GetSpecialistMainCabinetPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TMainCabResponseSchema;
  }
  /**
   * No description
   * @tags Specialist API
   * @name GetSpecialistShortInfo
   * @summary Get Specialist Short Info
   * @request GET:/api/specialist/short-info
   * @secure
   * @response `200` `TShortSpecialistInfoResponseSchema` Successful Response
   */
  export namespace GetSpecialistShortInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TShortSpecialistInfoResponseSchema;
  }
  /**
   * No description
   * @tags Specialist API
   * @name GetSpecialistSettings
   * @summary Get Specialist Settings
   * @request GET:/api/specialist/settings
   * @secure
   * @response `200` `TSpecialistSettingsSchema` Successful Response
   */
  export namespace GetSpecialistSettings {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TSpecialistSettingsSchema;
  }
  /**
   * @description Move me to internals
   * @tags Specialist API
   * @name UpdateSpecialistSettings
   * @summary Update Specialist Settings
   * @request POST:/api/specialist/settings
   * @secure
   * @response `200` `TSpecialistSettingsSchema` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace UpdateSpecialistSettings {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TSpecialistUpdateSettingsRequestSchema;
    export type RequestHeaders = {};
    export type ResponseBody = TSpecialistSettingsSchema;
  }
  /**
   * No description
   * @tags Specialist API
   * @name GetSpecialistTimezone
   * @summary Get Timezone
   * @request GET:/api/specialist/settings/timezone
   * @secure
   * @response `200` `TTimezoneResponseSchema` Successful Response
   */
  export namespace GetSpecialistTimezone {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TTimezoneResponseSchema;
  }
  /**
   * No description
   * @tags Specialist API
   * @name UpdateSpecialistTimezone
   * @summary Update Timezone
   * @request POST:/api/specialist/settings/timezone
   * @secure
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace UpdateSpecialistTimezone {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodyUpdateSpecialistTimezone;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Specialist API
   * @name GetFinancesData
   * @summary Get Finances Stats Payout Method
   * @request GET:/api/specialist/finances
   * @secure
   * @response `200` `TSpecialistFinancesResponseSchema` Successful Response
   */
  export namespace GetFinancesData {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TSpecialistFinancesResponseSchema;
  }
  /**
   * No description
   * @tags Specialist API
   * @name GetFinancesOperations
   * @summary Get Finances Operations
   * @request GET:/api/specialist/finances/operations
   * @secure
   * @response `200` `TSpecialistFinancesOperationsResponseSchema` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace GetFinancesOperations {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Page Num
       * @default 1
       */
      page_num?: number;
      /**
       * Page Size
       * @default 10
       */
      page_size?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TSpecialistFinancesOperationsResponseSchema;
  }
  /**
   * No description
   * @tags Specialist API
   * @name FinishSession
   * @summary Finish Session
   * @request POST:/api/specialist/session/finish-session
   * @secure
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace FinishSession {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodyFinishSession;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Client API
   * @name GetClientSettings
   * @summary Get Settings
   * @request GET:/api/client/settings
   * @secure
   * @response `200` `TClientSettingsResponseSchema` Successful Response
   */
  export namespace GetClientSettings {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TClientSettingsResponseSchema;
  }
  /**
   * No description
   * @tags Client API
   * @name UpdateClientSettings
   * @summary Update Settings
   * @request POST:/api/client/settings
   * @secure
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace UpdateClientSettings {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodyUpdateClientSettings;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Client API
   * @name UploadClientAvatar
   * @summary Update Avatar
   * @request POST:/api/client/settings/avatar
   * @secure
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace UploadClientAvatar {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodyUploadClientAvatar;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Client API
   * @name DeleteClientAvatar
   * @summary Delete Avatar
   * @request POST:/api/client/settings/avatar/delete
   * @secure
   * @response `200` `TSuccessResponse` Successful Response
   */
  export namespace DeleteClientAvatar {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Client API
   * @name GetClientTimezone
   * @summary Get Timezone
   * @request GET:/api/client/settings/timezone
   * @secure
   * @response `200` `TTimezoneResponseSchema` Successful Response
   */
  export namespace GetClientTimezone {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TTimezoneResponseSchema;
  }
  /**
   * No description
   * @tags Client API
   * @name UpdateClientTimezone
   * @summary Update Timezone
   * @request POST:/api/client/settings/timezone
   * @secure
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace UpdateClientTimezone {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodyUpdateClientTimezone;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Client API
   * @name GetClientTransactions
   * @summary Get Client Transactions
   * @request GET:/api/client/finances
   * @secure
   * @response `200` `TTransactionsSchema` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace GetClientTransactions {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Page Num
       * @default 1
       */
      page_num?: number;
      /**
       * Page Size
       * @default 10
       */
      page_size?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TTransactionsSchema;
  }
  /**
   * No description
   * @tags Client API
   * @name GetPaymentMethod
   * @summary Get Payment Method
   * @request GET:/api/client/finances/payment-method
   * @secure
   * @response `200` `TPaymentMethodSchema` Successful Response
   * @response `404` `void` PaymentMethodNotFoundException
   */
  export namespace GetPaymentMethod {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TPaymentMethodSchema;
  }
  /**
   * No description
   * @tags Client API
   * @name DeletePaymentMethod
   * @summary Delete Payment Method
   * @request POST:/api/client/finances/delete-payment-method
   * @secure
   * @response `200` `TSuccessResponse` Successful Response
   */
  export namespace DeletePaymentMethod {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Client API
   * @name GetClientPaymentMethodCreationLink
   * @summary Get Payment Method Creation Link
   * @request GET:/api/client/finances/get-payment-method-creation-link
   * @secure
   * @response `200` `TPaymentMethodCreationLinkResponse` Successful Response
   */
  export namespace GetClientPaymentMethodCreationLink {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TPaymentMethodCreationLinkResponse;
  }
  /**
   * No description
   * @tags Client API
   * @name GetClientMainCabinetPage
   * @summary Get Cabinet Main Page
   * @request GET:/api/client/
   * @secure
   * @response `200` `TClientMainCabResponseSchema` Successful Response
   */
  export namespace GetClientMainCabinetPage {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TClientMainCabResponseSchema;
  }
  /**
   * No description
   * @tags Client API
   * @name GetClientShortInfo
   * @summary Get Client Short Info
   * @request GET:/api/client/short-info
   * @secure
   * @response `200` `TShortClientInfoResponseSchema` Successful Response
   */
  export namespace GetClientShortInfo {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TShortClientInfoResponseSchema;
  }
  /**
   * No description
   * @tags Client API
   * @name SearchSpecialists
   * @summary Search Specialists
   * @request GET:/api/client/specialists/search
   * @response `200` `TSpecialistsSearchResponseSchema` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace SearchSpecialists {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Page Num
       * @default 1
       */
      page_num?: number;
      /**
       * Page Size
       * @default 10
       */
      page_size?: number;
      /** Area Type */
      area_type?: TAreaType | null;
      /**
       * Topic Ids
       * Comma separated topic ids
       */
      topic_ids?: string | null;
      /**
       * Gender
       * Comma separated genders, possible values: male, female
       */
      gender?: string | null;
      /**
       * Day Times
       * Comma separated day times, possible values: morning, daytime, evening
       */
      day_times?: string | null;
      /**
       * Week Days
       * Comma separated week days: 0,1,2,3,4
       */
      week_days?: string | null;
      /**
       * Min Price
       * Minimum price
       */
      min_price?: number | null;
      /**
       * Max Price
       * Maximum price
       */
      max_price?: number | null;
      /**
       * Age Ranges
       * Comma separated age ranges, e.g.: 25-35,45-100
       */
      age_ranges?: string | null;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TSpecialistsSearchResponseSchema;
  }
  /**
   * No description
   * @tags Client API
   * @name GetSpecialistProfile
   * @summary Get Specialist Profile
   * @request GET:/api/client/specialists/{specialist_id}/profile
   * @response `200` `TSpecialistProfileResponseSchema` Successful Response
   * @response `400` `void` SpecialistAccountNotFoundException
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace GetSpecialistProfile {
    export type RequestParams = {
      /** Specialist Id */
      specialistId: string;
    };
    export type RequestQuery = {
      /** Area Type */
      area_type?: TAreaType | null;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TSpecialistProfileResponseSchema;
  }
  /**
   * No description
   * @tags Client API
   * @name CancelSession
   * @summary Cancel Session
   * @request POST:/api/client/schedule/cancel-session
   * @secure
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace CancelSession {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodyCancelSession;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Client API
   * @name MoveSession
   * @summary Move Session
   * @request POST:/api/client/schedule/move-session
   * @secure
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace MoveSession {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodyMoveSession;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Billing
   * @name HandleCallbackApiBillingAlfabankCallbackGet
   * @summary Handle Callback
   * @request GET:/api/billing/alfabank/callback
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace HandleCallbackApiBillingAlfabankCallbackGet {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Ordernumber */
      orderNumber: string;
      /** Mdorder */
      mdOrder: string;
      operation: TCallbackOperationType;
      status: TCallbackStatus;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Billing
   * @name GetOrderState
   * @summary Get Order State
   * @request GET:/api/billing/order-state
   * @response `200` `TPurchaseStateResponseSchema` Successful Response
   * @response `202` `void` OrderInProgressException
   * @response `404` `void` OrderNotFoundException
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace GetOrderState {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Order Id */
      order_id: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {
      /** X-Try-Number */
      'x-try-number': number;
    };
    export type ResponseBody = TPurchaseStateResponseSchema;
  }
  /**
   * No description
   * @tags Billing
   * @name GetPaymentUrlForProductPurchase
   * @summary Create Payment Url For Product Purchase
   * @request POST:/api/billing/purchase/product/by-payment-url
   * @secure
   * @response `200` `TPaymentUrlResponseSchema` Successful Response
   * @response `400` `void` PromocodeIsAlreadyUsedException
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace GetPaymentUrlForProductPurchase {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodyGetPaymentUrlForProductPurchase;
    export type RequestHeaders = {};
    export type ResponseBody = TPaymentUrlResponseSchema;
  }
  /**
   * No description
   * @tags Billing
   * @name PayForProductBySavedPaymentMethod
   * @summary Perform Product Purchase By Saved Payment Method
   * @request POST:/api/billing/purchase/product/by-saved-payment-method
   * @secure
   * @response `200` `TPurchaseBySavingPaymentMethodResponseSchema` Successful Response
   * @response `400` `void` PromocodeIsAlreadyUsedException
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace PayForProductBySavedPaymentMethod {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodyPayForProductBySavedPaymentMethod;
    export type RequestHeaders = {};
    export type ResponseBody = TPurchaseBySavingPaymentMethodResponseSchema;
  }
  /**
   * No description
   * @tags Billing
   * @name ApplyPromocode
   * @summary Apply Promocode
   * @request POST:/api/billing/apply-promocode
   * @secure
   * @response `200` `TSessionsProductSchema` Successful Response
   * @response `400` `void` PromocodeIsAlreadyUsedException
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace ApplyPromocode {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodyApplyPromocode;
    export type RequestHeaders = {};
    export type ResponseBody = TSessionsProductSchema;
  }
  /**
   * No description
   * @tags SSE API
   * @name GetSseStream
   * @summary Get Sse Stream
   * @request GET:/api/sse/stream
   * @secure
   * @response `200` `any` Successful Response
   */
  export namespace GetSseStream {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = any;
  }
  /**
   * No description
   * @tags Chats API
   * @name GetAllChatsApiChatsGet
   * @summary Get All Chats
   * @request GET:/api/chats/
   * @secure
   * @response `200` `TChatsResponseSchema` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace GetAllChatsApiChatsGet {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Page Num
       * @default 1
       */
      page_num?: number;
      /**
       * Page Size
       * @default 100
       */
      page_size?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TChatsResponseSchema;
  }
  /**
   * No description
   * @tags Chats API
   * @name GetMessagesFromChatApiChatsChatIdGet
   * @summary Get Messages From Chat
   * @request GET:/api/chats/{chat_id}
   * @secure
   * @response `200` `TChatMessagesResponseSchema` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace GetMessagesFromChatApiChatsChatIdGet {
    export type RequestParams = {
      /** Chat Id */
      chatId: string;
    };
    export type RequestQuery = {
      /**
       * Page Num
       * @default 1
       */
      page_num?: number;
      /**
       * Page Size
       * @default 20
       */
      page_size?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TChatMessagesResponseSchema;
  }
  /**
   * No description
   * @tags Chats API
   * @name MarkAllMessagesReadInChatApiChatsChatIdReadPost
   * @summary Mark All Messages Read In Chat
   * @request POST:/api/chats/{chat_id}/read
   * @secure
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace MarkAllMessagesReadInChatApiChatsChatIdReadPost {
    export type RequestParams = {
      /** Chat Id */
      chatId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Chats API
   * @name SendMessageApiChatsChatIdSendMessagePost
   * @summary Send Message
   * @request POST:/api/chats/{chat_id}/send-message
   * @secure
   * @response `200` `TMessageSchema` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace SendMessageApiChatsChatIdSendMessagePost {
    export type RequestParams = {
      /** Chat Id */
      chatId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = TBodySendMessageApiChatsChatIdSendMessagePost;
    export type RequestHeaders = {};
    export type ResponseBody = TMessageSchema;
  }
  /**
   * No description
   * @tags Inbox API
   * @name GetInboxItems
   * @summary Get Inbox Items
   * @request GET:/api/inbox/
   * @secure
   * @response `200` `TInboxItemsResponseSchema` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace GetInboxItems {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Page Num
       * @default 1
       */
      page_num?: number;
      /**
       * Page Size
       * @default 5
       */
      page_size?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TInboxItemsResponseSchema;
  }
  /**
   * No description
   * @tags Inbox API
   * @name MarkAllInboxItemsAsRead
   * @summary Mark All Inbox Items As Read
   * @request POST:/api/inbox/mark-all-as-read
   * @secure
   * @response `200` `TSuccessResponse` Successful Response
   */
  export namespace MarkAllInboxItemsAsRead {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Inbox API
   * @name GetTelegramNotificationQrLink
   * @summary Get Telegram Notification Qr Link
   * @request GET:/api/inbox/telegram-notification-qr
   * @secure
   * @response `200` `any` Successful Response
   */
  export namespace GetTelegramNotificationQrLink {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = any;
  }
  /**
   * No description
   * @tags Inbox API
   * @name GetTelegramNotificationsUrl
   * @summary Get Telegram Notifications Url
   * @request GET:/api/inbox/telegram-notification-url
   * @secure
   * @response `200` `TTelegramNotificationsResponseSchema` Successful Response
   */
  export namespace GetTelegramNotificationsUrl {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TTelegramNotificationsResponseSchema;
  }
  /**
   * No description
   * @tags Feedback API
   * @name SubmitSessionFeedback
   * @summary Submit Session Feedback
   * @request POST:/api/feedbacksubmit-session-feedback
   * @secure
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace SubmitSessionFeedback {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodySubmitSessionFeedback;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Landing API
   * @name GetBlogs
   * @summary Get Blogs
   * @request GET:/api/landing/blogs
   * @response `200` `TBlogsResponseSchema` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace GetBlogs {
    export type RequestParams = {};
    export type RequestQuery = {
      /**
       * Page Num
       * @default 1
       */
      page_num?: number;
      /**
       * Page Size
       * @default 30
       */
      page_size?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TBlogsResponseSchema;
  }
  /**
   * No description
   * @tags Landing API
   * @name GetBlog
   * @summary Get Blog
   * @request GET:/api/landing/blogs/{blog_id}
   * @response `200` `TBlogResponseSchema` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace GetBlog {
    export type RequestParams = {
      /** Blog Id */
      blogId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TBlogResponseSchema;
  }
  /**
   * No description
   * @tags Landing API
   * @name SubscribeOnNewsletter
   * @summary Subscribe On Newsletter
   * @request POST:/api/landing/subscribe-on-newsletter
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace SubscribeOnNewsletter {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodySubscribeOnNewsletter;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Landing API
   * @name SubmitB2BApplication
   * @summary Submit B2B Application
   * @request POST:/api/landing/submit_b2b_application
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace SubmitB2BApplication {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TB2BApplicationRequestSchema;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags CarrotQuest API
   * @name HandleWebhookApiCarrotquestWebhookPost
   * @summary Handle Webhook
   * @request POST:/api/carrotquest/webhook
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace HandleWebhookApiCarrotquestWebhookPost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodyHandleWebhookApiCarrotquestWebhookPost;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags CarrotQuest API
   * @name GetCarrotUserHash
   * @summary Get User Hash
   * @request GET:/api/carrotquest/user/hash
   * @secure
   * @response `200` `TUserHashResponseSchema` Successful Response
   */
  export namespace GetCarrotUserHash {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TUserHashResponseSchema;
  }
  /**
   * No description
   * @tags CarrotQuest API
   * @name SetCarrotClientUid
   * @summary Set Carrot Uid
   * @request POST:/api/carrotquest/user/set-client-carrot-uid
   * @secure
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace SetCarrotClientUid {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TBodySetCarrotClientUid;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
  /**
   * No description
   * @tags Video Session API
   * @name GetTestVideoSessionInfo
   * @summary Get Test Session Info
   * @request GET:/api/video-session/test-session/{session_id_any}/{account_type}
   * @response `200` `TVideoSessionInfoResponseSchema` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace GetTestVideoSessionInfo {
    export type RequestParams = {
      /** Session Id Any */
      sessionIdAny: string;
      /** Account Type */
      accountType: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TVideoSessionInfoResponseSchema;
  }
  /**
   * No description
   * @tags Video Session API
   * @name GetVideoSessionInfo
   * @summary Get Session Info
   * @request GET:/api/video-session/{session_id}
   * @secure
   * @response `200` `TVideoSessionInfoResponseSchema` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace GetVideoSessionInfo {
    export type RequestParams = {
      /** Session Id */
      sessionId: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = TVideoSessionInfoResponseSchema;
  }
  /**
   * No description
   * @tags Konsol API
   * @name HandleKonsolWebhookApiKonsolWebhookPost
   * @summary Handle Konsol Webhook
   * @request POST:/api/konsol/webhook
   * @response `200` `TSuccessResponse` Successful Response
   * @response `422` `THTTPValidationError` Validation Error
   */
  export namespace HandleKonsolWebhookApiKonsolWebhookPost {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = TKonsolWebhookSchema;
    export type RequestHeaders = {};
    export type ResponseBody = TSuccessResponse;
  }
}

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams extends Omit<AxiosRequestConfig, 'data' | 'params' | 'url' | 'responseType'> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<FullRequestParams, 'body' | 'method' | 'query' | 'path'>;

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, 'data' | 'cancelToken'> {
  securityWorker?: (
    securityData: SecurityDataType | null
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = 'application/json',
  FormData = 'multipart/form-data',
  UrlEncoded = 'application/x-www-form-urlencoded',
  Text = 'text/plain',
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>['securityWorker'];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
    this.instance = axios.create({ ...axiosConfig, baseURL: axiosConfig.baseURL || '' });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === 'object' && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] = property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>(
    { secure, path, type, query, format, body, ...params }: FullRequestParams
  ): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === 'boolean' ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (type === ContentType.FormData && body && body !== null && typeof body === 'object') {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (type === ContentType.Text && body && body !== null && typeof body !== 'string') {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type && type !== ContentType.FormData ? { 'Content-Type': type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title Sense-A API
 * @version 0.1.0
 */
export class Api<SecurityDataType extends unknown> {
  http: HttpClient<SecurityDataType>;

  constructor(http: HttpClient<SecurityDataType>) {
    this.http = http;
  }

  api = {
    /**
     * No description
     *
     * @tags Auth API
     * @name SendAuthenticationSmsCode
     * @summary Send Sms Code
     * @request POST:/api/auth/sms/send-code
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    sendAuthenticationSmsCode: (data: TBodySendAuthenticationSmsCode, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/auth/sms/send-code`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth API
     * @name AuthenticateBySmsCode
     * @summary Authenticate By Code
     * @request POST:/api/auth/sms/authenticate-by-code
     * @response `200` `TSuccessfulAuthenticationResponseSchema` Successful Response
     * @response `401` `void` BadAuthenticationCode
     * @response `422` `THTTPValidationError` Validation Error
     */
    authenticateBySmsCode: (data: TBodyAuthenticateBySmsCode, params: RequestParams = {}) =>
      this.http.request<TSuccessfulAuthenticationResponseSchema, void | THTTPValidationError>({
        path: `/api/auth/sms/authenticate-by-code`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth API
     * @name SendAuthenticationEmailCode
     * @summary Send Email Code
     * @request POST:/api/auth/email/send-code
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    sendAuthenticationEmailCode: (data: TBodySendAuthenticationEmailCode, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/auth/email/send-code`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Auth API
     * @name AuthenticateByEmailCode
     * @summary Authenticate By Email Code
     * @request POST:/api/auth/email/authenticate-by-code
     * @response `200` `TSuccessfulAuthenticationResponseSchema` Successful Response
     * @response `401` `void` BadAuthenticationCode
     * @response `422` `THTTPValidationError` Validation Error
     */
    authenticateByEmailCode: (data: TBodyAuthenticateByEmailCode, params: RequestParams = {}) =>
      this.http.request<TSuccessfulAuthenticationResponseSchema, void | THTTPValidationError>({
        path: `/api/auth/email/authenticate-by-code`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Topics API
     * @name GetAllTopics
     * @summary Get Topics
     * @request GET:/api/topics
     * @response `200` `TTopicsResponseSchema` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    getAllTopics: (
      query?: {
        /** Area Type */
        area_type?: TAreaType | null;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<TTopicsResponseSchema, THTTPValidationError>({
        path: `/api/topics`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Specialist API
     * @name GetSpecialistProfileForUpdate
     * @summary Get Specialist Profile Data For Update
     * @request GET:/api/specialist/profile
     * @secure
     * @response `200` `TSpecialistProfileUpdateResponseSchema` Successful Response
     */
    getSpecialistProfileForUpdate: (params: RequestParams = {}) =>
      this.http.request<TSpecialistProfileUpdateResponseSchema, any>({
        path: `/api/specialist/profile`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Specialist API
     * @name UpdateSpecialistProfile
     * @summary Update Specialist Profile Data
     * @request POST:/api/specialist/profile
     * @secure
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    updateSpecialistProfile: (data: TBodyUpdateSpecialistProfile, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/specialist/profile`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Specialist API
     * @name UpdateScheduleSettings
     * @summary Update Schedule Settings
     * @request POST:/api/specialist/schedule/update-settings
     * @secure
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    updateScheduleSettings: (data: TScheduleSettingsSchema, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/specialist/schedule/update-settings`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Specialist API
     * @name ExcludeScheduleSlots
     * @summary Exclude Schedule Slots
     * @request POST:/api/specialist/schedule/exclude-slots
     * @secure
     * @response `200` `TSuccessResponse` Successful Response
     * @response `400` `void` CantExcludeBookedSlotException
     * @response `422` `THTTPValidationError` Validation Error
     */
    excludeScheduleSlots: (data: TBodyExcludeScheduleSlots, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, void | THTTPValidationError>({
        path: `/api/specialist/schedule/exclude-slots`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Specialist API
     * @name AddSlot
     * @summary Add Slot
     * @request POST:/api/specialist/schedule/add-slot
     * @secure
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    addSlot: (
      query: {
        /**
         * Slot Date
         * @format date-time
         */
        slot_date: string;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/specialist/schedule/add-slot`,
        method: 'POST',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Specialist API
     * @name RestoreScheduleSlots
     * @summary Restore Schedule Slots
     * @request POST:/api/specialist/schedule/restore-slots
     * @secure
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    restoreScheduleSlots: (data: TBodyRestoreScheduleSlots, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/specialist/schedule/restore-slots`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Specialist API
     * @name ChangeSlotDate
     * @summary Change Slot Date
     * @request POST:/api/specialist/schedule/change-slot-date
     * @secure
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    changeSlotDate: (data: TBodyChangeSlotDate, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/specialist/schedule/change-slot-date`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Specialist API
     * @name MoveScheduleSlot
     * @summary Move Schedule Slot
     * @request POST:/api/specialist/schedule/move-session
     * @secure
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    moveScheduleSlot: (data: TBodyMoveScheduleSlot, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/specialist/schedule/move-session`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Specialist API
     * @name GetSpecialistMainCabinetPage
     * @summary Get Cabinet Main Page
     * @request GET:/api/specialist
     * @secure
     * @response `200` `TMainCabResponseSchema` Successful Response
     */
    getSpecialistMainCabinetPage: (params: RequestParams = {}) =>
      this.http.request<TMainCabResponseSchema, any>({
        path: `/api/specialist`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Specialist API
     * @name GetSpecialistShortInfo
     * @summary Get Specialist Short Info
     * @request GET:/api/specialist/short-info
     * @secure
     * @response `200` `TShortSpecialistInfoResponseSchema` Successful Response
     */
    getSpecialistShortInfo: (params: RequestParams = {}) =>
      this.http.request<TShortSpecialistInfoResponseSchema, any>({
        path: `/api/specialist/short-info`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Specialist API
     * @name GetSpecialistSettings
     * @summary Get Specialist Settings
     * @request GET:/api/specialist/settings
     * @secure
     * @response `200` `TSpecialistSettingsSchema` Successful Response
     */
    getSpecialistSettings: (params: RequestParams = {}) =>
      this.http.request<TSpecialistSettingsSchema, any>({
        path: `/api/specialist/settings`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * @description Move me to internals
     *
     * @tags Specialist API
     * @name UpdateSpecialistSettings
     * @summary Update Specialist Settings
     * @request POST:/api/specialist/settings
     * @secure
     * @response `200` `TSpecialistSettingsSchema` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    updateSpecialistSettings: (data: TSpecialistUpdateSettingsRequestSchema, params: RequestParams = {}) =>
      this.http.request<TSpecialistSettingsSchema, THTTPValidationError>({
        path: `/api/specialist/settings`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Specialist API
     * @name GetSpecialistTimezone
     * @summary Get Timezone
     * @request GET:/api/specialist/settings/timezone
     * @secure
     * @response `200` `TTimezoneResponseSchema` Successful Response
     */
    getSpecialistTimezone: (params: RequestParams = {}) =>
      this.http.request<TTimezoneResponseSchema, any>({
        path: `/api/specialist/settings/timezone`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Specialist API
     * @name UpdateSpecialistTimezone
     * @summary Update Timezone
     * @request POST:/api/specialist/settings/timezone
     * @secure
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    updateSpecialistTimezone: (data: TBodyUpdateSpecialistTimezone, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/specialist/settings/timezone`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Specialist API
     * @name GetFinancesData
     * @summary Get Finances Stats Payout Method
     * @request GET:/api/specialist/finances
     * @secure
     * @response `200` `TSpecialistFinancesResponseSchema` Successful Response
     */
    getFinancesData: (params: RequestParams = {}) =>
      this.http.request<TSpecialistFinancesResponseSchema, any>({
        path: `/api/specialist/finances`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Specialist API
     * @name GetFinancesOperations
     * @summary Get Finances Operations
     * @request GET:/api/specialist/finances/operations
     * @secure
     * @response `200` `TSpecialistFinancesOperationsResponseSchema` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    getFinancesOperations: (
      query?: {
        /**
         * Page Num
         * @default 1
         */
        page_num?: number;
        /**
         * Page Size
         * @default 10
         */
        page_size?: number;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<TSpecialistFinancesOperationsResponseSchema, THTTPValidationError>({
        path: `/api/specialist/finances/operations`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Specialist API
     * @name FinishSession
     * @summary Finish Session
     * @request POST:/api/specialist/session/finish-session
     * @secure
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    finishSession: (data: TBodyFinishSession, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/specialist/session/finish-session`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Client API
     * @name GetClientSettings
     * @summary Get Settings
     * @request GET:/api/client/settings
     * @secure
     * @response `200` `TClientSettingsResponseSchema` Successful Response
     */
    getClientSettings: (params: RequestParams = {}) =>
      this.http.request<TClientSettingsResponseSchema, any>({
        path: `/api/client/settings`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Client API
     * @name UpdateClientSettings
     * @summary Update Settings
     * @request POST:/api/client/settings
     * @secure
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    updateClientSettings: (data: TBodyUpdateClientSettings, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/client/settings`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Client API
     * @name UploadClientAvatar
     * @summary Update Avatar
     * @request POST:/api/client/settings/avatar
     * @secure
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    uploadClientAvatar: (data: TBodyUploadClientAvatar, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/client/settings/avatar`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.FormData,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Client API
     * @name DeleteClientAvatar
     * @summary Delete Avatar
     * @request POST:/api/client/settings/avatar/delete
     * @secure
     * @response `200` `TSuccessResponse` Successful Response
     */
    deleteClientAvatar: (params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, any>({
        path: `/api/client/settings/avatar/delete`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Client API
     * @name GetClientTimezone
     * @summary Get Timezone
     * @request GET:/api/client/settings/timezone
     * @secure
     * @response `200` `TTimezoneResponseSchema` Successful Response
     */
    getClientTimezone: (params: RequestParams = {}) =>
      this.http.request<TTimezoneResponseSchema, any>({
        path: `/api/client/settings/timezone`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Client API
     * @name UpdateClientTimezone
     * @summary Update Timezone
     * @request POST:/api/client/settings/timezone
     * @secure
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    updateClientTimezone: (data: TBodyUpdateClientTimezone, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/client/settings/timezone`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Client API
     * @name GetClientTransactions
     * @summary Get Client Transactions
     * @request GET:/api/client/finances
     * @secure
     * @response `200` `TTransactionsSchema` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    getClientTransactions: (
      query?: {
        /**
         * Page Num
         * @default 1
         */
        page_num?: number;
        /**
         * Page Size
         * @default 10
         */
        page_size?: number;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<TTransactionsSchema, THTTPValidationError>({
        path: `/api/client/finances`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Client API
     * @name GetPaymentMethod
     * @summary Get Payment Method
     * @request GET:/api/client/finances/payment-method
     * @secure
     * @response `200` `TPaymentMethodSchema` Successful Response
     * @response `404` `void` PaymentMethodNotFoundException
     */
    getPaymentMethod: (params: RequestParams = {}) =>
      this.http.request<TPaymentMethodSchema, void>({
        path: `/api/client/finances/payment-method`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Client API
     * @name DeletePaymentMethod
     * @summary Delete Payment Method
     * @request POST:/api/client/finances/delete-payment-method
     * @secure
     * @response `200` `TSuccessResponse` Successful Response
     */
    deletePaymentMethod: (params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, any>({
        path: `/api/client/finances/delete-payment-method`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Client API
     * @name GetClientPaymentMethodCreationLink
     * @summary Get Payment Method Creation Link
     * @request GET:/api/client/finances/get-payment-method-creation-link
     * @secure
     * @response `200` `TPaymentMethodCreationLinkResponse` Successful Response
     */
    getClientPaymentMethodCreationLink: (params: RequestParams = {}) =>
      this.http.request<TPaymentMethodCreationLinkResponse, any>({
        path: `/api/client/finances/get-payment-method-creation-link`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Client API
     * @name GetClientMainCabinetPage
     * @summary Get Cabinet Main Page
     * @request GET:/api/client/
     * @secure
     * @response `200` `TClientMainCabResponseSchema` Successful Response
     */
    getClientMainCabinetPage: (params: RequestParams = {}) =>
      this.http.request<TClientMainCabResponseSchema, any>({
        path: `/api/client/`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Client API
     * @name GetClientShortInfo
     * @summary Get Client Short Info
     * @request GET:/api/client/short-info
     * @secure
     * @response `200` `TShortClientInfoResponseSchema` Successful Response
     */
    getClientShortInfo: (params: RequestParams = {}) =>
      this.http.request<TShortClientInfoResponseSchema, any>({
        path: `/api/client/short-info`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Client API
     * @name SearchSpecialists
     * @summary Search Specialists
     * @request GET:/api/client/specialists/search
     * @response `200` `TSpecialistsSearchResponseSchema` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    searchSpecialists: (
      query?: {
        /**
         * Page Num
         * @default 1
         */
        page_num?: number;
        /**
         * Page Size
         * @default 10
         */
        page_size?: number;
        /** Area Type */
        area_type?: TAreaType | null;
        /**
         * Topic Ids
         * Comma separated topic ids
         */
        topic_ids?: string | null;
        /**
         * Gender
         * Comma separated genders, possible values: male, female
         */
        gender?: string | null;
        /**
         * Day Times
         * Comma separated day times, possible values: morning, daytime, evening
         */
        day_times?: string | null;
        /**
         * Week Days
         * Comma separated week days: 0,1,2,3,4
         */
        week_days?: string | null;
        /**
         * Min Price
         * Minimum price
         */
        min_price?: number | null;
        /**
         * Max Price
         * Maximum price
         */
        max_price?: number | null;
        /**
         * Age Ranges
         * Comma separated age ranges, e.g.: 25-35,45-100
         */
        age_ranges?: string | null;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<TSpecialistsSearchResponseSchema, THTTPValidationError>({
        path: `/api/client/specialists/search`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Client API
     * @name GetSpecialistProfile
     * @summary Get Specialist Profile
     * @request GET:/api/client/specialists/{specialist_id}/profile
     * @response `200` `TSpecialistProfileResponseSchema` Successful Response
     * @response `400` `void` SpecialistAccountNotFoundException
     * @response `422` `THTTPValidationError` Validation Error
     */
    getSpecialistProfile: (
      specialistId: string,
      query?: {
        /** Area Type */
        area_type?: TAreaType | null;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<TSpecialistProfileResponseSchema, void | THTTPValidationError>({
        path: `/api/client/specialists/${specialistId}/profile`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Client API
     * @name CancelSession
     * @summary Cancel Session
     * @request POST:/api/client/schedule/cancel-session
     * @secure
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    cancelSession: (data: TBodyCancelSession, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/client/schedule/cancel-session`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Client API
     * @name MoveSession
     * @summary Move Session
     * @request POST:/api/client/schedule/move-session
     * @secure
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    moveSession: (data: TBodyMoveSession, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/client/schedule/move-session`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Billing
     * @name HandleCallbackApiBillingAlfabankCallbackGet
     * @summary Handle Callback
     * @request GET:/api/billing/alfabank/callback
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    handleCallbackApiBillingAlfabankCallbackGet: (
      query: {
        /** Ordernumber */
        orderNumber: string;
        /** Mdorder */
        mdOrder: string;
        operation: TCallbackOperationType;
        status: TCallbackStatus;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/billing/alfabank/callback`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Billing
     * @name GetOrderState
     * @summary Get Order State
     * @request GET:/api/billing/order-state
     * @response `200` `TPurchaseStateResponseSchema` Successful Response
     * @response `202` `void` OrderInProgressException
     * @response `404` `void` OrderNotFoundException
     * @response `422` `THTTPValidationError` Validation Error
     */
    getOrderState: (
      query: {
        /** Order Id */
        order_id: string;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<TPurchaseStateResponseSchema, void | THTTPValidationError>({
        path: `/api/billing/order-state`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Billing
     * @name GetPaymentUrlForProductPurchase
     * @summary Create Payment Url For Product Purchase
     * @request POST:/api/billing/purchase/product/by-payment-url
     * @secure
     * @response `200` `TPaymentUrlResponseSchema` Successful Response
     * @response `400` `void` PromocodeIsAlreadyUsedException
     * @response `422` `THTTPValidationError` Validation Error
     */
    getPaymentUrlForProductPurchase: (data: TBodyGetPaymentUrlForProductPurchase, params: RequestParams = {}) =>
      this.http.request<TPaymentUrlResponseSchema, void | THTTPValidationError>({
        path: `/api/billing/purchase/product/by-payment-url`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Billing
     * @name PayForProductBySavedPaymentMethod
     * @summary Perform Product Purchase By Saved Payment Method
     * @request POST:/api/billing/purchase/product/by-saved-payment-method
     * @secure
     * @response `200` `TPurchaseBySavingPaymentMethodResponseSchema` Successful Response
     * @response `400` `void` PromocodeIsAlreadyUsedException
     * @response `422` `THTTPValidationError` Validation Error
     */
    payForProductBySavedPaymentMethod: (data: TBodyPayForProductBySavedPaymentMethod, params: RequestParams = {}) =>
      this.http.request<TPurchaseBySavingPaymentMethodResponseSchema, void | THTTPValidationError>({
        path: `/api/billing/purchase/product/by-saved-payment-method`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Billing
     * @name ApplyPromocode
     * @summary Apply Promocode
     * @request POST:/api/billing/apply-promocode
     * @secure
     * @response `200` `TSessionsProductSchema` Successful Response
     * @response `400` `void` PromocodeIsAlreadyUsedException
     * @response `422` `THTTPValidationError` Validation Error
     */
    applyPromocode: (data: TBodyApplyPromocode, params: RequestParams = {}) =>
      this.http.request<TSessionsProductSchema, void | THTTPValidationError>({
        path: `/api/billing/apply-promocode`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags SSE API
     * @name GetSseStream
     * @summary Get Sse Stream
     * @request GET:/api/sse/stream
     * @secure
     * @response `200` `any` Successful Response
     */
    getSseStream: (params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/api/sse/stream`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chats API
     * @name GetAllChatsApiChatsGet
     * @summary Get All Chats
     * @request GET:/api/chats/
     * @secure
     * @response `200` `TChatsResponseSchema` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    getAllChatsApiChatsGet: (
      query?: {
        /**
         * Page Num
         * @default 1
         */
        page_num?: number;
        /**
         * Page Size
         * @default 100
         */
        page_size?: number;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<TChatsResponseSchema, THTTPValidationError>({
        path: `/api/chats/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chats API
     * @name GetMessagesFromChatApiChatsChatIdGet
     * @summary Get Messages From Chat
     * @request GET:/api/chats/{chat_id}
     * @secure
     * @response `200` `TChatMessagesResponseSchema` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    getMessagesFromChatApiChatsChatIdGet: (
      chatId: string,
      query?: {
        /**
         * Page Num
         * @default 1
         */
        page_num?: number;
        /**
         * Page Size
         * @default 20
         */
        page_size?: number;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<TChatMessagesResponseSchema, THTTPValidationError>({
        path: `/api/chats/${chatId}`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chats API
     * @name MarkAllMessagesReadInChatApiChatsChatIdReadPost
     * @summary Mark All Messages Read In Chat
     * @request POST:/api/chats/{chat_id}/read
     * @secure
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    markAllMessagesReadInChatApiChatsChatIdReadPost: (chatId: string, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/chats/${chatId}/read`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Chats API
     * @name SendMessageApiChatsChatIdSendMessagePost
     * @summary Send Message
     * @request POST:/api/chats/{chat_id}/send-message
     * @secure
     * @response `200` `TMessageSchema` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    sendMessageApiChatsChatIdSendMessagePost: (
      chatId: string,
      data: TBodySendMessageApiChatsChatIdSendMessagePost,
      params: RequestParams = {}
    ) =>
      this.http.request<TMessageSchema, THTTPValidationError>({
        path: `/api/chats/${chatId}/send-message`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Inbox API
     * @name GetInboxItems
     * @summary Get Inbox Items
     * @request GET:/api/inbox/
     * @secure
     * @response `200` `TInboxItemsResponseSchema` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    getInboxItems: (
      query?: {
        /**
         * Page Num
         * @default 1
         */
        page_num?: number;
        /**
         * Page Size
         * @default 5
         */
        page_size?: number;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<TInboxItemsResponseSchema, THTTPValidationError>({
        path: `/api/inbox/`,
        method: 'GET',
        query: query,
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Inbox API
     * @name MarkAllInboxItemsAsRead
     * @summary Mark All Inbox Items As Read
     * @request POST:/api/inbox/mark-all-as-read
     * @secure
     * @response `200` `TSuccessResponse` Successful Response
     */
    markAllInboxItemsAsRead: (params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, any>({
        path: `/api/inbox/mark-all-as-read`,
        method: 'POST',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Inbox API
     * @name GetTelegramNotificationQrLink
     * @summary Get Telegram Notification Qr Link
     * @request GET:/api/inbox/telegram-notification-qr
     * @secure
     * @response `200` `any` Successful Response
     */
    getTelegramNotificationQrLink: (params: RequestParams = {}) =>
      this.http.request<any, any>({
        path: `/api/inbox/telegram-notification-qr`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Inbox API
     * @name GetTelegramNotificationsUrl
     * @summary Get Telegram Notifications Url
     * @request GET:/api/inbox/telegram-notification-url
     * @secure
     * @response `200` `TTelegramNotificationsResponseSchema` Successful Response
     */
    getTelegramNotificationsUrl: (params: RequestParams = {}) =>
      this.http.request<TTelegramNotificationsResponseSchema, any>({
        path: `/api/inbox/telegram-notification-url`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Feedback API
     * @name SubmitSessionFeedback
     * @summary Submit Session Feedback
     * @request POST:/api/feedbacksubmit-session-feedback
     * @secure
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    submitSessionFeedback: (data: TBodySubmitSessionFeedback, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/feedbacksubmit-session-feedback`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Landing API
     * @name GetBlogs
     * @summary Get Blogs
     * @request GET:/api/landing/blogs
     * @response `200` `TBlogsResponseSchema` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    getBlogs: (
      query?: {
        /**
         * Page Num
         * @default 1
         */
        page_num?: number;
        /**
         * Page Size
         * @default 30
         */
        page_size?: number;
      },
      params: RequestParams = {}
    ) =>
      this.http.request<TBlogsResponseSchema, THTTPValidationError>({
        path: `/api/landing/blogs`,
        method: 'GET',
        query: query,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Landing API
     * @name GetBlog
     * @summary Get Blog
     * @request GET:/api/landing/blogs/{blog_id}
     * @response `200` `TBlogResponseSchema` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    getBlog: (blogId: string, params: RequestParams = {}) =>
      this.http.request<TBlogResponseSchema, THTTPValidationError>({
        path: `/api/landing/blogs/${blogId}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Landing API
     * @name SubscribeOnNewsletter
     * @summary Subscribe On Newsletter
     * @request POST:/api/landing/subscribe-on-newsletter
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    subscribeOnNewsletter: (data: TBodySubscribeOnNewsletter, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/landing/subscribe-on-newsletter`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Landing API
     * @name SubmitB2BApplication
     * @summary Submit B2B Application
     * @request POST:/api/landing/submit_b2b_application
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    submitB2BApplication: (data: TB2BApplicationRequestSchema, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/landing/submit_b2b_application`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CarrotQuest API
     * @name HandleWebhookApiCarrotquestWebhookPost
     * @summary Handle Webhook
     * @request POST:/api/carrotquest/webhook
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    handleWebhookApiCarrotquestWebhookPost: (
      data: TBodyHandleWebhookApiCarrotquestWebhookPost,
      params: RequestParams = {}
    ) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/carrotquest/webhook`,
        method: 'POST',
        body: data,
        type: ContentType.UrlEncoded,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CarrotQuest API
     * @name GetCarrotUserHash
     * @summary Get User Hash
     * @request GET:/api/carrotquest/user/hash
     * @secure
     * @response `200` `TUserHashResponseSchema` Successful Response
     */
    getCarrotUserHash: (params: RequestParams = {}) =>
      this.http.request<TUserHashResponseSchema, any>({
        path: `/api/carrotquest/user/hash`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags CarrotQuest API
     * @name SetCarrotClientUid
     * @summary Set Carrot Uid
     * @request POST:/api/carrotquest/user/set-client-carrot-uid
     * @secure
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    setCarrotClientUid: (data: TBodySetCarrotClientUid, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/carrotquest/user/set-client-carrot-uid`,
        method: 'POST',
        body: data,
        secure: true,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Video Session API
     * @name GetTestVideoSessionInfo
     * @summary Get Test Session Info
     * @request GET:/api/video-session/test-session/{session_id_any}/{account_type}
     * @response `200` `TVideoSessionInfoResponseSchema` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    getTestVideoSessionInfo: (sessionIdAny: string, accountType: string, params: RequestParams = {}) =>
      this.http.request<TVideoSessionInfoResponseSchema, THTTPValidationError>({
        path: `/api/video-session/test-session/${sessionIdAny}/${accountType}`,
        method: 'GET',
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Video Session API
     * @name GetVideoSessionInfo
     * @summary Get Session Info
     * @request GET:/api/video-session/{session_id}
     * @secure
     * @response `200` `TVideoSessionInfoResponseSchema` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    getVideoSessionInfo: (sessionId: string, params: RequestParams = {}) =>
      this.http.request<TVideoSessionInfoResponseSchema, THTTPValidationError>({
        path: `/api/video-session/${sessionId}`,
        method: 'GET',
        secure: true,
        format: 'json',
        ...params,
      }),

    /**
     * No description
     *
     * @tags Konsol API
     * @name HandleKonsolWebhookApiKonsolWebhookPost
     * @summary Handle Konsol Webhook
     * @request POST:/api/konsol/webhook
     * @response `200` `TSuccessResponse` Successful Response
     * @response `422` `THTTPValidationError` Validation Error
     */
    handleKonsolWebhookApiKonsolWebhookPost: (data: TKonsolWebhookSchema, params: RequestParams = {}) =>
      this.http.request<TSuccessResponse, THTTPValidationError>({
        path: `/api/konsol/webhook`,
        method: 'POST',
        body: data,
        type: ContentType.Json,
        format: 'json',
        ...params,
      }),
  };
}
