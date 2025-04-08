type TSettings = Omit<
  import('@shared/api').TScheduleSettingsSchema,
  'working_week_days_hours'
>;

type TWorkingWeek = (
  | import('@shared/api').TScheduleOptionSchema
  | import('@shared/api').TScheduleOptionResponseSchema
) & { id: string };

type CommonFieldType = {
  type?: string;
  id?: string;
  name?: string;
  isRequired?: boolean;
  description?: string;
  label?: string;
  placeholder?: string;
  options?: {
    label: string;
    value: unknown;
    type?: unknown;
  }[];
  max?: number;
  props?: AnyObject;
  maxLength?: number;
  [key: string]: unknown;
};

type SubHeaderType = {
  id?: string;
  sub_header: string;
  fields: CommonFieldType[];
};

type FormEditProps = {
  id?: string;
  header?: string;
  fields: (CommonFieldType | SubHeaderType)[];
};

type FormEditType = FormEditProps[];
