export default (value: string, min: number, max: number): boolean => {
  return value.length < max && value.length > min;
};
