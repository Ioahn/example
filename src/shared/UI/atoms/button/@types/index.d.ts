type TButtonProps = {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'clear';
  size?: 'base' | 'md' | 'lg' | 'sm' | 'icon' | 'icon-sm';
  as?: 'button' | 'link';
  fullWidth?: boolean;
  onClick?: React.MouseEventHandler;
  buttonRef?: React.RefObject<HTMLButtonElement>;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  loaderState?: import('@shared/constants').LOADING_STATES;
};
