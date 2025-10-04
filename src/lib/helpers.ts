export const isDefined = <T>(value: T | undefined | null): value is T => {
  return value !== undefined && value !== null;
};

export const createClassName = (...classes: (string | undefined | false)[]): string => {
  const definedClasses = classes.filter((className): className is string => isDefined(className) && className !== false && className !== '');

  console.log('Defined classes:', definedClasses);

  if (definedClasses.length === 0) {
    return '';
  }

  if (definedClasses.length === 1) {
    return definedClasses[0];
  }

  return definedClasses.join(' ');
};