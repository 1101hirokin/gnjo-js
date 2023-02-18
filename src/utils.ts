export const isNumeric = (str: string): boolean => {
  return !Number.isNaN(str) && !Number.isNaN(Number.parseFloat(str))
}