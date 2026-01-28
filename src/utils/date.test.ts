import { describe, expect, it } from 'vitest'
import { formatDate } from './date'

describe('formatDate', () => {
    it('should format an ISO date correctly', () => {
        const dateString = '2024-01-15T10:30:00Z'
        const result = formatDate(dateString)

        expect(result).toContain('UTC')
        expect(result).toMatch(/\w{3}\s+\d{1,2},\s+\d{4}/)
    })

    it('should format a date with time correctly', () => {
        const dateString = '2024-12-25T15:45:00Z'
        const result = formatDate(dateString)

        expect(result).toContain('UTC')
        expect(result).toContain('2024')
    })

    it('should handle different months correctly', () => {
        const january = formatDate('2024-01-01T00:00:00Z')
        const june = formatDate('2024-06-15T12:00:00Z')
        const december = formatDate('2024-12-31T23:59:59Z')

        expect(january).toContain('Jan')
        expect(june).toContain('Jun')
        expect(december).toContain('Dec')
        expect(january).toContain('UTC')
        expect(june).toContain('UTC')
        expect(december).toContain('UTC')
    })

    it('should include time in the format', () => {
        const dateString = '2024-03-20T14:30:00Z'
        const result = formatDate(dateString)

        expect(result).toMatch(/\d{1,2}:\d{2}\s+(AM|PM)/)
        expect(result).toContain('UTC')
    })

    it('should format dates in different years', () => {
        const year2023 = formatDate('2023-05-10T10:00:00Z')
        const year2024 = formatDate('2024-05-10T10:00:00Z')
        const year2025 = formatDate('2025-05-10T10:00:00Z')

        expect(year2023).toContain('2023')
        expect(year2024).toContain('2024')
        expect(year2025).toContain('2025')
    })

    it('should handle dates with different valid input formats', () => {
        const isoFormat = formatDate('2024-07-04T00:00:00Z')
        const withMilliseconds = formatDate('2024-07-04T00:00:00.000Z')

        expect(isoFormat).toContain('UTC')
        expect(withMilliseconds).toContain('UTC')
        expect(isoFormat).toContain('2024')
        expect(withMilliseconds).toContain('2024')
    })
})

