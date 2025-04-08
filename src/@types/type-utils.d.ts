type Maybe<T = unknown> = T | null;
type MaybeFunctions<T> = T | ((...args: (() => void)[]) => T);
type AnyObject = Record<string, IncompatibleType>;
type AnyArray = any[];
type IncompatibleType = any;
type AnyFunction = (...args: any[]) => any;
