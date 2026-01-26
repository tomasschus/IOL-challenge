import { useState } from 'react'
import { FiChevronDown } from 'react-icons/fi'
import { useCurrencies } from '../hooks/useCurrencies'

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
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  const { currencies, isLoading } = useCurrencies()

  const filteredCurrencies = currencies.filter(
    currency =>
      currency.code !== excludeCurrency &&
      (currency.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        currency.name.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const selectedCurrency = currencies.find(c => c.code === value)

  const handleSelect = (code: string) => {
    onChange(code)
    setIsOpen(false)
    setSearchTerm('')
  }

  return (
    <div className="w-full relative">
      <label className="block text-sm font-medium text-[--neutral-700] mb-2">
        {label}
      </label>
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full h-12 px-4 text-left bg-white border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-500)] focus:border-[var(--primary-500)] transition-all flex items-center justify-between text-[var(--neutral-800)]"
        >
          <span className="flex items-center gap-2">
            {selectedCurrency ? (
              <span className="text-[--neutral-800]">
                {selectedCurrency.name}
              </span>
            ) : (
              <span className="text-[--neutral-400]">Select currency</span>
            )}
          </span>
          <FiChevronDown
            className={`w-5 h-5 text-gray-400 transition-transform ${
              isOpen ? 'transform rotate-180' : ''
            }`}
          />
        </button>

        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute z-20 w-full mt-2 bg-[--neutral-50] border border-[--neutral-300] rounded-lg shadow-lg max-h-60 overflow-hidden">
              <div className="p-3 border-b border-[--neutral-200] bg-[--neutral-100]">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  placeholder="Search currency..."
                  className="w-full px-4 py-2 border border-[--neutral-300] rounded-lg focus:outline-none focus:ring-2 focus:ring-[--primary-500] bg-[--neutral-50] text-[--neutral-800]"
                  onClick={e => e.stopPropagation()}
                />
              </div>
              <div className="overflow-y-auto max-h-48">
                {isLoading ? (
                  <div className="p-4 text-center text-[--neutral-500]">
                    Loading...
                  </div>
                ) : filteredCurrencies.length === 0 ? (
                  <div className="p-4 text-center text-[--neutral-500]">
                    No currencies found
                  </div>
                ) : (
                  filteredCurrencies.map(currency => (
                    <button
                      key={currency.code}
                      type="button"
                      onClick={() => handleSelect(currency.code)}
                      className={`w-full px-4 py-3 text-left hover:bg-[--primary-50] transition-colors ${
                        value === currency.code
                          ? 'bg-[--primary-100] border-l-4 border-[--primary-500]'
                          : ''
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-[--neutral-900]">
                          {currency.code}
                        </span>
                        <span className="text-[--neutral-600]">
                          {currency.name}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
