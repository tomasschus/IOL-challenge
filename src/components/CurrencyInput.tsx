import { cn } from '@/lib/utils'
import { forwardRef } from 'react'
import { Input } from './ui/input'
import { Label } from './ui/label'

interface CurrencyInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  name?: string
  error?: string
  disabled?: boolean
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ label, value, onChange, onBlur, name, error, disabled = false }, ref) => {
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
        <Label
          htmlFor={inputId}
          id={labelId}
          className="mb-4 block font-semibold"
        >
          {label}
        </Label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--neutral-600)] pointer-events-none">
            $
          </span>
          <Input
            ref={ref}
            id={inputId}
            name={name}
            type="text"
            inputMode="decimal"
            value={value}
            onChange={handleChange}
            onBlur={onBlur}
            disabled={disabled}
            placeholder="1.00"
            aria-labelledby={labelId}
            aria-describedby={error ? errorId : undefined}
            aria-invalid={error ? 'true' : 'false'}
            className={cn(
              'pl-8',
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
