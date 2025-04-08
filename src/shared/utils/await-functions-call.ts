export const awaitFunctionsCall = <
  T extends AnyFunction[],
  Results extends AnyArray = {
    [K in keyof T]: ReturnType<T[K]>;
  },
>(
  fns: T,
  resultFunction: (...args: Results) => void
) => {
  let count = 0;
  const results: AnyArray = [];

  const watchFn =
    (fn: T[number]) =>
    (...args: Parameters<typeof fn>) => {
      count += 1;

      results.push(fn(...args));

      if (count === fns.length) {
        resultFunction(...(results as unknown as Results));
      }
    };

  return fns.map(watchFn);
};
