import { TAreaType, TGender } from '@shared/api';

export type TFilters = {
  choseTopics: string[];
  gender: Maybe<TGender>;
  day_times: Maybe<string>;
  area_type: TAreaType;
  max_price: Maybe<number>;
  min_price: Maybe<number>;
  age_ranges: Maybe<string>;
  week_days: Maybe<string>;
};

export type TFilterInitialState = {
  chosenTopics: string[];
  gender: Maybe<TGender>;
  time: Maybe<string>;
  areaType: TAreaType;
  minPrice: Maybe<number>;
  maxPrice: Maybe<number>;
  ageRange: Maybe<string>;
  weekDays: Maybe<string>;
};
