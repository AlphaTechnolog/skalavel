export default (value: string, min: number, max: number): boolean => {
  console.log(value.length < max && value.length > min, value.length, max, min)
  return value.length < max && value.length > min
}
