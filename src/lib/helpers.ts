export const isDefined = <T,>(value: T | undefined | null): value is T => {
  return value !== undefined && value !== null;
};

export const createClassName = (...classes: (string | undefined | false)[]): string => {
  return classes.filter(isDefined).join(' ');
};