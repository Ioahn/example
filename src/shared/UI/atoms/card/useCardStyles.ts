import { cn } from '@shared/utils';

export const useCardStyles = ({
  size = 'base',
  variant = 'primary',
}: CardProps) => {
  const getSizeStyle = () => {
    const classNameList = {
      xl: 'rounded-[2rem]',
      md: 'rounded-[1.25rem] p-6',
      base: 'rounded-3xl p-6 max-md:p-4',
      sm: 'rounded-2xl p-4',
      xs: 'rounded-lg p-4',
      clear: '',
    };

    return classNameList[size] || classNameList.base;
  };

  const getVariantStyle = () => {
    const classNameList = {
      primary: 'bg-bg-primary',
      secondary: 'bg-bg-secondary',
    };

    return classNameList[variant] || '';
  };

  return cn('shadow-sm', getSizeStyle(), getVariantStyle());
};
