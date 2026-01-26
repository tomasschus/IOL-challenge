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
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const inputValue = e.target.value
            if (inputValue === '' || /^\d*\.?\d*$/.test(inputValue)) {
                onChange(inputValue)
            }
        }

        return (
            <div className="w-full">
                <Label htmlFor={label} className="mb-4 block font-semibold">
                    {label}
                </Label>
                <div className="relative">
                    <Input
                        ref={ref}
                        id={label}
                        type="text"
                        value={value}
                        onChange={handleChange}
                        disabled={disabled}
                        placeholder="1.00"
                        className={cn(
                            error &&
                            'border-[var(--error-500)] bg-[var(--error-50)] focus-visible:ring-[var(--error-500)]'
                        )}
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
