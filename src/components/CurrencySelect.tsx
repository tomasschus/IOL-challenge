import { useState } from 'react'
import { useCurrencies } from '../hooks/useCurrencies'
import { Input } from './ui/input'
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
  const [searchTerm, setSearchTerm] = useState('')

  const { currencies, isLoading } = useCurrencies()

  const filteredCurrencies = currencies.filter(
    currency =>
      currency.code !== excludeCurrency &&
      (currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const selectedCurrency = currencies.find(c => c.code === value)

  return (
    <div className="w-full">
      <Label className="mb-4 block font-semibold">{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select currency">
            {selectedCurrency ? selectedCurrency.name : undefined}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          <div className="p-2 border-b border-[var(--neutral-200)] sticky top-0 bg-white z-[60]">
            <Input
              type="text"
              value={searchTerm}
              onChange={e => {
                e.stopPropagation()
                setSearchTerm(e.target.value)
              }}
              onKeyDown={e => {
                e.stopPropagation()
              }}
              placeholder="Search currency..."
              className="h-9"
            />
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {isLoading ? (
              <div className="p-4 text-center text-[var(--neutral-500)]">
                Loading...
              </div>
            ) : filteredCurrencies.length === 0 ? (
              <div className="p-4 text-center text-[var(--neutral-500)]">
                No currencies found
              </div>
            ) : (
              filteredCurrencies.map(currency => (
                <SelectItem key={currency.code} value={currency.code}>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold">{currency.code}</span>
                    <span className="text-[var(--neutral-600)]">
                      {currency.name}
                    </span>
                  </div>
                </SelectItem>
              ))
            )}
          </div>
        </SelectContent>
      </Select>
    </div>
  )
}
