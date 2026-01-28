import { useMemo } from 'react'
import { useCurrencies } from '../hooks/useCurrencies'
import { Label } from './ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface CurrencySelectProps {
  label: string
  value: string
  onChange: (value: string) => void
  excludeCurrency?: string
}

export const CurrencySelect = ({
  label,
  value,
  onChange,
  excludeCurrency,
}: CurrencySelectProps) => {
  const { currencies, isLoading } = useCurrencies()

  const filteredCurrencies = useMemo(
    () => currencies.filter(currency => currency.code !== excludeCurrency),
    [currencies, excludeCurrency]
  )

  const selectedCurrency = useMemo(
    () => currencies.find(c => c.code === value),
    [currencies, value]
  )

  const labelId = `currency-select-${label.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <div className="w-full">
      <Label
        htmlFor={labelId}
        className="mb-4 block font-semibold"
        id={`${labelId}-label`}
      >
        {label}
      </Label>
      <Select
        value={value}
        onValueChange={onChange}
        key={`${value}-${excludeCurrency}`}
      >
        <SelectTrigger
          id={labelId}
          aria-labelledby={`${labelId}-label`}
          aria-describedby={
            selectedCurrency ? `${labelId}-description` : undefined
          }
        >
          <SelectValue placeholder="Select currency">
            {selectedCurrency ? selectedCurrency.name : undefined}
          </SelectValue>
        </SelectTrigger>
        {selectedCurrency && (
          <span id={`${labelId}-description`} className="sr-only">
            Selected: {selectedCurrency.name} ({selectedCurrency.code})
          </span>
        )}
        <SelectContent>
          {isLoading ? (
            <div
              className="p-4 text-center text-[var(--neutral-500)]"
              role="status"
              aria-live="polite"
            >
              Loading...
            </div>
          ) : filteredCurrencies.length === 0 ? (
            <div
              className="p-4 text-center text-[var(--neutral-500)]"
              role="status"
              aria-live="polite"
            >
              No currencies found
            </div>
          ) : (
            filteredCurrencies.map(currency => (
              <SelectItem key={currency.code} value={currency.code}>
                <div className="flex items-center gap-2">
                  <span
                    className="font-semibold"
                    aria-label={`${currency.code} currency code`}
                  >
                    {currency.code}
                  </span>
                  <span
                    className="text-[var(--neutral-600)]"
                    aria-hidden="true"
                  >
                    {currency.name}
                  </span>
                </div>
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
