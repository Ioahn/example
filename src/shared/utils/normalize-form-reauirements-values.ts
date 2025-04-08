// TODO: Файл на перенос в утилиты соответствующего слоя, в котором будут происходить преобразования
import { RESET_KEY } from '@shared/constants';

export type FormRequirementState = {
  gender: string[];
  time: string[];
  week_days: string[];
  budget: number[];
};

export const normalizeFormRequirementValues = ({
  gender,
  time,
  week_days,
  budget,
}: FormRequirementState) => {
  try {
    const normalizedGender = gender.includes(RESET_KEY)
      ? null
      : gender.join(',');

    const normalizedTime = time.includes(RESET_KEY) ? null : time.join(',');
    const normalizedWeekDays = week_days.includes(RESET_KEY)
      ? null
      : week_days
          .map((day) => +day)
          .sort()
          .map((day) => day.toString())
          .join(',');

    const [minPrice, maxPrice] = budget;

    return {
      gender: normalizedGender,
      time: normalizedTime,
      minPrice,
      maxPrice,
      weekDays: normalizedWeekDays,
    };
  } catch (err) {
    console.log(err);
    return {
      gender: null,
      time: null,
      minPrice: null,
      maxPrice: null,
      weekDays: null,
    };
  }
};
