import {
  animated,
  config,
  useIsomorphicLayoutEffect,
  useSpring,
} from '@react-spring/web';
import { useEffect, useState } from 'react';
import { Overlay, usePreventScroll } from 'react-aria';
import { mergeRefs } from 'react-merge-refs';
import { useMeasure, usePrevious, useScratch } from 'react-use';
import { UseMeasureRef } from 'react-use/lib/useMeasure';
import { selectUIStates } from '@entities/models';
import { callFnByPredicates } from '@shared/utils';
import {
  ScrollDirection,
  useAppSelector,
  useScrollDirection,
} from '@shared/hooks';
import { usePortal } from '@shared/providers';
import { Container, OnFullyVisible } from '@shared/UI';

const useAutoHidden = <T extends HTMLElement>(
  menuIsVisible?: boolean
): [UseMeasureRef<T>, AnyObject] => {
  const dir = useScrollDirection();
  const [ref, { height }] = useMeasure<T>();
  const [currentVisibility, setVisibility] = useState(false);
  const prevVisibility = usePrevious(currentVisibility);
  const [isSwipe, setSwipe] = useState(false);

  const [props, api] = useSpring(() => ({
    config: config.stiff,
    to: {
      bottom: -height,
    },
  }));

  const [swipeRef] = useScratch({
    onScratchStart: () => setSwipe(true),
    onScratch: (state) => {
      if ((state.dy as number) < 0 && state.start) {
        api.start(() => ({
          to: {
            bottom: Math.sqrt(Math.abs(state.dy as number)) * 5,
          },
        }));
      }
    },
    onScratchEnd: (state) => {
      setSwipe(false);

      if ((state.dy as number) < 0) {
        setVisibility(false);
      }
    },
  });

  usePreventScroll({ isDisabled: !isSwipe });

  useEffect(() => {
    callFnByPredicates([
      [[false, false, true], () => setVisibility(true)],
      [[true, true, false], () => setVisibility(false)],
    ])([currentVisibility, prevVisibility, dir === ScrollDirection.UP]);
  }, [currentVisibility, prevVisibility, dir]);

  useIsomorphicLayoutEffect(() => {
    if (currentVisibility && menuIsVisible) {
      api.start(() => ({
        to: {
          bottom: 16,
        },
      }));
    } else {
      api.start(() => ({
        to: {
          bottom: -height,
        },
      }));
    }
  }, [api, height, currentVisibility, menuIsVisible, isSwipe]);

  return [mergeRefs([ref, swipeRef]), props];
};

export const MobileNavigationFooter: FCC = ({ children }) => {
  const [isVisible, setVisibility] = useState(false);
  const { menuIsVisible, chatIsVisible, notificationIsVisible } =
    useAppSelector(selectUIStates);
  const [ref, props] = useAutoHidden<HTMLDivElement>(
    isVisible || (!menuIsVisible && !(chatIsVisible || notificationIsVisible))
  );
  const portalRef = usePortal();

  return (
    <>
      <OnFullyVisible
        className='h-20'
        onVisible={() => setVisibility(true)}
        onHidden={() => setVisibility(false)}
      />
      <Overlay portalContainer={portalRef?.current as Element}>
        <animated.div className='fixed z-30 inset-x-0' ref={ref} style={props}>
          <Container>
            <div className='bg-bg-secondary/70 shadow-2xl backdrop-blur-md justify-center gap-4 rounded-2xl py-2 flex'>
              {children}
            </div>
          </Container>
        </animated.div>
      </Overlay>
    </>
  );
};
