import { TooltipTriggerProps } from '@react-types/tooltip';
import { ReactElement, useRef } from 'react';
import { Placement, mergeProps, usePress, useTooltipTrigger } from 'react-aria';
import { useTooltipTriggerState } from 'react-stately';
import { cn } from '@shared/utils';
import { Tooltip } from './Tooltip';

type Props = TooltipTriggerProps & {
  triggerElement: ReactElement | ((isOpened: boolean) => ReactElement);
  placement?: Placement;
};

const DELAY = 0;
export const TooltipTrigger: FCC<Props> = (props) => {
  const ref = useRef(null);
  const state = useTooltipTriggerState({
    ...props,
    delay: DELAY,
  });
  const { triggerProps, tooltipProps } = useTooltipTrigger(props, state, ref);
  const { triggerElement, children, className } = props;

  const trigger =
    typeof triggerElement === 'function'
      ? triggerElement(state.isOpen)
      : triggerElement;

  const { pressProps } = usePress({
    onPressStart: () => state.open(),
    isPressed: state.isOpen,
  });

  return (
    <div className={cn('relative flex', className)}>
      <div ref={ref} {...mergeProps(triggerProps, pressProps)}>
        {trigger}
      </div>
      <Tooltip
        {...tooltipProps}
        placement={props.placement}
        state={state}
        targetRef={ref}
      >
        {children}
      </Tooltip>
    </div>
  );
};
