import { cn } from '@shared/utils';
import { useCardStyles } from './useCardStyles';

export const Card: FCC<CardProps> = ({ children, className, ...rest }) => {
  const getStyle = useCardStyles(rest);

  return <div className={cn(getStyle, className)}>{children}</div>;
};
