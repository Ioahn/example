import { AriaPositionProps } from '@react-aria/overlays';
import {
  animated,
  useIsomorphicLayoutEffect,
  useTransition,
} from '@react-spring/web';
import { TooltipTriggerState } from '@react-stately/tooltip';
import { AriaTooltipProps } from '@react-types/tooltip';
import { useRef } from 'react';
import {
  FocusScope,
  Overlay,
  Placement,
  PlacementAxis,
  mergeProps,
  useInteractOutside,
  useOverlayPosition,
  useTooltip,
} from 'react-aria';
import { useUnmount } from 'react-use';
import { setDirection } from '@shared/utils';
import { usePortal } from '@shared/providers';
import { PositioningArrow } from '@shared/UI';

type Props = AriaTooltipProps &
  Omit<AriaPositionProps, 'overlayRef'> & {
    state: TooltipTriggerState;
  };
export const Tooltip: FCC<Props> = ({
  state,
  targetRef,
  children,
  ...props
}) => {
  const portalRef = usePortal();
  const ref = useRef(null);
  const { tooltipProps } = useTooltip(props, state);
  const {
    overlayProps,
    arrowProps,
    placement = props.placement as PlacementAxis,
  } = useOverlayPosition({
    ...props,
    offset: props.offset || 8,
    targetRef,
    overlayRef: ref,
    isOpen: state.isOpen,
  });

  const [transitions, api] = useTransition(state.isOpen, () => ({
    ...setDirection(placement as Placement),
  }));

  useIsomorphicLayoutEffect(() => {
    api.start();
  }, [state.isOpen]);

  useUnmount(() => {
    api.stop();
  });

  useInteractOutside({
    ref,
    onInteractOutside: () => state.close(true),
  });

  return transitions(
    (style, item) =>
      item && (
        <Overlay portalContainer={portalRef?.current as Element}>
          <animated.div style={style}>
            <FocusScope autoFocus contain>
              <div
                {...mergeProps(props, tooltipProps, overlayProps)}
                ref={ref}
                className='absolute'
              >
                <PositioningArrow {...arrowProps} placement={placement} />
                {children}
              </div>
            </FocusScope>
          </animated.div>
        </Overlay>
      )
  );
};
