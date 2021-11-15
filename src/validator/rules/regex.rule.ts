export default (value: string, regex: RegExp): boolean => {
  return regex.test(value);
};
