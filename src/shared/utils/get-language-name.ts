import { TLanguage } from '@shared/api';

export const getLanguageNames = (
  languages?: (TLanguage | string)[]
): string[] => {
  if (!languages) {
    return [];
  }

  const languageNames = languages.map((language) => {
    switch (language) {
      case TLanguage.EEn || 'en':
        return 'Английский';
      case TLanguage.ERu || 'ru':
        return 'Русский';
    }
    return '';
  });

  return languageNames;
};
