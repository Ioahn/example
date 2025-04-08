import { useMemo } from 'react';

type YearLabelValue = {
  value: string;
  label: string;
};

export const useYearOptions = (startAge: number) => {
  return useMemo(() => {
    const currentYear = new Date().getFullYear();
    const endYear = currentYear - startAge;
    const years: YearLabelValue[] = [];

    for (let year = endYear; year >= 1950; year--) {
      years.push({
        value: year.toString(),
        label: year.toString(),
      });
    }
    return years;
  }, [startAge]);
};
