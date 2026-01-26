import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface CurrencyInputProps {
    label: string
    value: string
    onChange: (value: string) => void
    error?: string
    disabled?: boolean
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
    ({ label, value, onChange, error, disabled = false }, ref) => {
        const inputId = `currency-input-${label.toLowerCase().replace(/\s+/g, '-')}`
        const errorId = `${inputId}-error`
        const labelId = `${inputId}-label`

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value
            if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
                onChange(inputValue)
            }
        }

        return (
            <div className="w-full">
                <Label htmlFor={inputId} id={labelId} className="mb-4 block font-semibold">
                    {label}
                </Label>
                <div className="relative">
                    <Input
                        ref={ref}
                        id={inputId}
                        type="text"
                        inputMode="decimal"
                        value={value}
                        onChange={handleChange}
                        disabled={disabled}
                        placeholder="1.00"
                        aria-labelledby={labelId}
                        aria-describedby={error ? errorId : undefined}
                        aria-invalid={error ? 'true' : 'false'}
                        className={cn(
                            error &&
                            'border-[var(--error-500)] bg-[var(--error-50)] focus-visible:ring-[var(--error-500)]'
                        )}
                    />
                    {error && (
                        <p 
                            id={errorId}
                            className="mt-1 text-sm text-[var(--error-600)] font-medium" 
                            role="alert"
                            aria-live="polite"
                        >
                            {error}
                        </p>
                    )}
                </div>
            </div>
        )
    }
)

CurrencyInput.displayName = 'CurrencyInput'
