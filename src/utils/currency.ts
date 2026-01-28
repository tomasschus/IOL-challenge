export const calculateConversion = (
  amount: number,
  rate: number,
  decimals: number = 6
): string => {
  if (!rate || rate <= 0) {
    return '0.00'
  }
  return (amount * rate).toFixed(decimals)
}

export const calculateInverseRate = (
  rate: number,
  decimals: number = 6
): string => {
  if (!rate || rate <= 0) {
    return '0.00'
  }
  return (1 / rate).toFixed(decimals)
}
