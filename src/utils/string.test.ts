import { describe, expect, it } from 'vitest'
import { generateId } from './string'

describe('generateId', () => {
  it('should generate id with prefix and label', () => {
    expect(generateId('currency-input', 'Amount')).toBe('currency-input-amount')
  })

  it('should convert label to lowercase', () => {
    expect(generateId('prefix', 'AMOUNT')).toBe('prefix-amount')
    expect(generateId('prefix', 'From Currency')).toBe('prefix-from-currency')
  })

  it('should replace spaces with hyphens', () => {
    expect(generateId('prefix', 'From Currency')).toBe('prefix-from-currency')
    expect(generateId('prefix', 'To Currency')).toBe('prefix-to-currency')
  })

  it('should handle multiple spaces', () => {
    expect(generateId('prefix', 'From   Currency')).toBe('prefix-from-currency')
  })

  it('should handle single word labels', () => {
    expect(generateId('prefix', 'Amount')).toBe('prefix-amount')
  })

  it('should handle empty label', () => {
    expect(generateId('prefix', '')).toBe('prefix-')
  })

  it('should handle labels with special characters', () => {
    expect(generateId('prefix', 'Amount (USD)')).toBe('prefix-amount-(usd)')
  })
})
