import { FiLoader } from 'react-icons/fi'

interface ConversionResultProps {
  isLoading: boolean
  error: unknown
  numericAmount: number
  fromCurrencyName: string
  toCurrencyName: string
  result: string
  fromCurrency: string
  toCurrency: string
  inverseRate: string
}

export const ConversionResult = ({
  isLoading,
  error,
  numericAmount,
  fromCurrencyName,
  toCurrencyName,
  result,
  fromCurrency,
  toCurrency,
  inverseRate,
}: ConversionResultProps) => {
  if (isLoading) {
    return (
      <div
        className="flex items-center gap-3 py-4"
        role="status"
        aria-live="polite"
        aria-label="Loading exchange rate"
      >
        <FiLoader
          className="w-6 h-6 animate-spin text-[var(--brand-500)]"
          aria-hidden="true"
        />
        <span className="text-base text-[var(--neutral-700)]">
          Calculating...
        </span>
      </div>
    )
  }

  if (error) {
    return (
      <div
        className="text-[var(--error-600)]"
        role="alert"
        aria-live="assertive"
      >
        Error loading exchange rate. Please try again.
      </div>
    )
  }

  return (
    <div role="status" aria-live="polite">
      <div className="text-2xl sm:text-[32px] font-bold leading-tight">
        {numericAmount || 1} {fromCurrencyName} =
      </div>
      <div className="text-2xl sm:text-[32px] font-bold mb-3 leading-tight">
        {result} {toCurrencyName}
      </div>
      <div className="text-sm text-[var(--neutral-500)] ">
        1 {toCurrency} = {inverseRate} {fromCurrency}
      </div>
    </div>
  )
}

