import {
  append,
  compose,
  cond,
  drop,
  equals,
  includes,
  length,
  none,
  not,
  slice,
  without,
} from 'ramda';
import { useEffect, useState } from 'react';

export const useMakeQueue = (
  maxSize: number
): [string[], (id: string) => void] => {
  const [queue, setQueueState] = useState<string[]>([]);

  const addToQueue = (id: string) =>
    setQueueState(
      cond([
        [compose(not, equals(maxSize), length), append(id)],
        [includes(id), without([id])],
        [none(equals(id)), compose(append(id), drop(1))],
      ])
    );

  useEffect(() => {
    setQueueState(slice(0, maxSize, queue));
  }, [maxSize]);

  return [queue, addToQueue];
};
