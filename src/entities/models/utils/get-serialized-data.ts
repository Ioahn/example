type SerializedFields = {
  about_me: string;
  additional_education: unknown[] | string;
  avatar: string;
  birth_year: number;
  education: unknown[] | string;
  started_practice_year: string;
  first_name: string;
  gender: string;
  languages: unknown[] | string;
  last_name: string;
  specialization_title: string;
  topic_ids: unknown[] | string;
  working_areas: unknown[] | string;
};

export const getSerializedData = (data: AnyObject) => {
  const filledData = Object.entries(data).reduce((acc, [key, value]) => {
    if (['topic_ids', 'languages', 'working_areas'].includes(key)) {
      acc[key as 'topic_ids' | 'languages' | 'working_areas'] = JSON.stringify(
        value.map(({ value }: { value: unknown }) => value)
      );

      return acc;
    }

    (acc as IncompatibleType)[key] = value;

    return acc;
  }, {} as SerializedFields);

  filledData.education = JSON.stringify(filledData.education);

  if (filledData.additional_education) {
    filledData.additional_education = JSON.stringify(
      filledData.additional_education
    );
  }

  return filledData;
};
