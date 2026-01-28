import { describe, expect, it } from 'vitest'
import {
  canEnableExchange,
  isNonNegative,
  isValidDecimalInput,
  parseNumericAmount,
  validateCurrencyParams,
} from './validation'

describe('isValidDecimalInput', () => {
  it('should return true for empty string', () => {
    expect(isValidDecimalInput('')).toBe(true)
  })

  it('should return true for valid integers', () => {
    expect(isValidDecimalInput('0')).toBe(true)
    expect(isValidDecimalInput('123')).toBe(true)
    expect(isValidDecimalInput('999999')).toBe(true)
  })

  it('should return true for valid decimals', () => {
    expect(isValidDecimalInput('1.5')).toBe(true)
    expect(isValidDecimalInput('0.5')).toBe(true)
    expect(isValidDecimalInput('123.456')).toBe(true)
    expect(isValidDecimalInput('.5')).toBe(true)
  })

  it('should return false for invalid inputs', () => {
    expect(isValidDecimalInput('abc')).toBe(false)
    expect(isValidDecimalInput('12.34.56')).toBe(false)
    expect(isValidDecimalInput('12a')).toBe(false)
    expect(isValidDecimalInput('12-34')).toBe(false)
    expect(isValidDecimalInput('12,34')).toBe(false)
  })
})

describe('isNonNegative', () => {
  it('should return true for zero', () => {
    expect(isNonNegative('0')).toBe(true)
    expect(isNonNegative('0.0')).toBe(true)
  })

  it('should return true for positive numbers', () => {
    expect(isNonNegative('1')).toBe(true)
    expect(isNonNegative('100')).toBe(true)
    expect(isNonNegative('0.5')).toBe(true)
    expect(isNonNegative('123.456')).toBe(true)
  })

  it('should return false for negative numbers', () => {
    expect(isNonNegative('-1')).toBe(false)
    expect(isNonNegative('-0.5')).toBe(false)
    expect(isNonNegative('-100')).toBe(false)
  })

  it('should handle empty string as zero', () => {
    expect(isNonNegative('')).toBe(true)
  })
})

describe('parseNumericAmount', () => {
  it('should parse valid numbers', () => {
    expect(parseNumericAmount('0')).toBe(0)
    expect(parseNumericAmount('1')).toBe(1)
    expect(parseNumericAmount('123')).toBe(123)
    expect(parseNumericAmount('1.5')).toBe(1.5)
    expect(parseNumericAmount('0.5')).toBe(0.5)
    expect(parseNumericAmount('123.456')).toBe(123.456)
  })

  it('should return 0 for empty string', () => {
    expect(parseNumericAmount('')).toBe(0)
  })

  it('should return 0 for invalid strings', () => {
    expect(parseNumericAmount('abc')).toBe(0)
    expect(parseNumericAmount('invalid')).toBe(0)
  })

  it('should handle negative numbers', () => {
    expect(parseNumericAmount('-1')).toBe(-1)
    expect(parseNumericAmount('-0.5')).toBe(-0.5)
  })
})

describe('validateCurrencyParams', () => {
  it('should return valid for different currencies', () => {
    const result = validateCurrencyParams('USD', 'EUR')
    expect(result.isValid).toBe(true)
    expect(result.error).toBeUndefined()
  })

  it('should return invalid when from is empty', () => {
    const result = validateCurrencyParams('', 'EUR')
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Base currency is required')
  })

  it('should return invalid when from is whitespace', () => {
    const result = validateCurrencyParams('   ', 'EUR')
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Base currency is required')
  })

  it('should return invalid when to is empty', () => {
    const result = validateCurrencyParams('USD', '')
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Target currency is required')
  })

  it('should return invalid when to is whitespace', () => {
    const result = validateCurrencyParams('USD', '   ')
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Target currency is required')
  })

  it('should return invalid when currencies are the same', () => {
    const result = validateCurrencyParams('USD', 'USD')
    expect(result.isValid).toBe(false)
    expect(result.error).toBe('Base and target currencies must be different')
  })
})

describe('canEnableExchange', () => {
  it('should return true for valid exchange conditions', () => {
    expect(canEnableExchange('USD', 'EUR', 100)).toBe(true)
    expect(canEnableExchange('USD', 'EUR', 0.5)).toBe(true)
    expect(canEnableExchange('USD', 'EUR', 1)).toBe(true)
  })

  it('should return false when currencies are the same', () => {
    expect(canEnableExchange('USD', 'USD', 100)).toBe(false)
  })

  it('should return false when amount is zero', () => {
    expect(canEnableExchange('USD', 'EUR', 0)).toBe(false)
  })

  it('should return false when amount is negative', () => {
    expect(canEnableExchange('USD', 'EUR', -1)).toBe(false)
  })

  it('should return false when from is empty', () => {
    expect(canEnableExchange('', 'EUR', 100)).toBe(false)
  })

  it('should return false when from is whitespace', () => {
    expect(canEnableExchange('   ', 'EUR', 100)).toBe(false)
  })

  it('should return false when to is empty', () => {
    expect(canEnableExchange('USD', '', 100)).toBe(false)
  })

  it('should return false when to is whitespace', () => {
    expect(canEnableExchange('USD', '   ', 100)).toBe(false)
  })
})
