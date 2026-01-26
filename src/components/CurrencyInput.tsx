import { forwardRef } from 'react'

interface CurrencyInputProps {
  label: string
  value: string
  onChange: (value: string) => void
  error?: string
  disabled?: boolean
}

export const CurrencyInput = forwardRef<HTMLInputElement, CurrencyInputProps>(
  ({ label, value, onChange, error, disabled = false }, ref) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
        onChange(inputValue)
      }
    }

    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-[var(--neutral-700)] mb-2">
          {label}
        </label>
        <div className="relative">
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={handleChange}
            disabled={disabled}
            className={`w-full h-12 px-4 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] transition-all ${
              error
                ? 'border-[var(--error-500)] bg-[var(--error-50)]'
                : 'bg-white'
            } ${
              disabled
                ? 'bg-[var(--neutral-200)] cursor-not-allowed opacity-60'
                : ''
            } text-[var(--neutral-800)]`}
            placeholder="1.00"
          />
          {error && (
            <p className="mt-1 text-sm text-[var(--error-600)] font-medium">
              {error}
            </p>
          )}
        </div>
      </div>
    )
  }
)

CurrencyInput.displayName = 'CurrencyInput'
