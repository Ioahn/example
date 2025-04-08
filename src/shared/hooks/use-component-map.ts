import { ElementType, useMemo } from 'react';

type Props = (
  map: Record<'default' | string, ElementType>,
  currentElement: string | null | undefined
) => ElementType;

export const useComponentMap: Props = (map, currentElement) => {
  return useMemo(
    () => (currentElement && map[currentElement]) || map.default || null,
    [currentElement, map]
  );
};
