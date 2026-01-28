export const isValidDecimalInput = (value: string): boolean => {
  return value === '' || /^\d*\.?\d*$/.test(value)
}

export const isNonNegative = (value: string): boolean => {
  const num = parseFloat(value || '0')
  return num >= 0
}

export const parseNumericAmount = (value: string): number => {
  return parseFloat(value || '0') || 0
}

export const validateCurrencyParams = (
  from: string,
  to: string
): { isValid: boolean; error?: string } => {
  if (!from || from.trim() === '') {
    return { isValid: false, error: 'Base currency is required' }
  }
  if (!to || to.trim() === '') {
    return { isValid: false, error: 'Target currency is required' }
  }
  if (from === to) {
    return {
      isValid: false,
      error: 'Base and target currencies must be different',
    }
  }
  return { isValid: true }
}

export const canEnableExchange = (
  from: string,
  to: string,
  amount: number
): boolean => {
  return from !== to && amount > 0 && from.trim() !== '' && to.trim() !== ''
}
