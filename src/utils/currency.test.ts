import { describe, expect, it } from 'vitest'
import { calculateConversion, calculateInverseRate } from './currency'

describe('calculateConversion', () => {
  it('should calculate conversion correctly', () => {
    expect(calculateConversion(100, 0.85)).toBe('85.000000')
    expect(calculateConversion(1, 1.5)).toBe('1.500000')
    expect(calculateConversion(50, 2.5)).toBe('125.000000')
  })

  it('should handle decimal amounts', () => {
    expect(calculateConversion(0.5, 0.85)).toBe('0.425000')
    expect(calculateConversion(1.5, 1.2)).toBe('1.800000')
  })

  it('should return 0.00 for zero rate', () => {
    expect(calculateConversion(100, 0)).toBe('0.00')
  })

  it('should return 0.00 for negative rate', () => {
    expect(calculateConversion(100, -1)).toBe('0.00')
  })

  it('should return 0.00 for undefined rate', () => {
    expect(calculateConversion(100, undefined as unknown as number)).toBe(
      '0.00'
    )
  })

  it('should use custom decimal places', () => {
    expect(calculateConversion(100, 0.85, 2)).toBe('85.00')
    expect(calculateConversion(100, 0.85, 4)).toBe('85.0000')
    expect(calculateConversion(100, 0.85, 0)).toBe('85')
  })

  it('should handle zero amount', () => {
    expect(calculateConversion(0, 0.85)).toBe('0.000000')
  })
})

describe('calculateInverseRate', () => {
  it('should calculate inverse rate correctly', () => {
    expect(calculateInverseRate(0.85)).toBe('1.176471')
    expect(calculateInverseRate(2)).toBe('0.500000')
    expect(calculateInverseRate(1.5)).toBe('0.666667')
  })

  it('should return 0.00 for zero rate', () => {
    expect(calculateInverseRate(0)).toBe('0.00')
  })

  it('should return 0.00 for negative rate', () => {
    expect(calculateInverseRate(-1)).toBe('0.00')
  })

  it('should return 0.00 for undefined rate', () => {
    expect(calculateInverseRate(undefined as unknown as number)).toBe('0.00')
  })

  it('should use custom decimal places', () => {
    expect(calculateInverseRate(0.85, 2)).toBe('1.18')
    expect(calculateInverseRate(2, 4)).toBe('0.5000')
    expect(calculateInverseRate(1.5, 0)).toBe('1')
  })

  it('should handle rate of 1', () => {
    expect(calculateInverseRate(1)).toBe('1.000000')
  })
})
