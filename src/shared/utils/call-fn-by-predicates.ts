import {
  T,
  all,
  apply,
  compose,
  cond,
  equals,
  filter,
  head,
  identical,
  isNotNil,
  juxt,
  last,
  map,
  zip,
} from 'ramda';

type TPredicate = [(boolean | null)[], () => void];

const createPredicate = juxt([
  compose<
    IncompatibleType,
    IncompatibleType,
    IncompatibleType,
    IncompatibleType
  >(
    (fn) =>
      compose<
        IncompatibleType,
        IncompatibleType,
        IncompatibleType,
        IncompatibleType,
        IncompatibleType
      >(
        all(equals(true)),
        map(apply(identical)),
        filter(compose(isNotNil, head)),
        fn
      ),
    zip,
    head
  ),
  last,
]);

export const callFnByPredicates = (fnPredicates: TPredicate[]) =>
  cond([
    ...(map(createPredicate, fnPredicates) as IncompatibleType),
    [T, () => void 0],
  ]);
