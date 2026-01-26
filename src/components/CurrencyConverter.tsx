import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { FiLoader, FiRefreshCw } from 'react-icons/fi'
import { useCurrencies } from '../hooks/useCurrencies'
import { useCurrencyExchange } from '../hooks/useCurrencyExchange'
import { CurrencyInput } from './CurrencyInput'
import { CurrencySelect } from './CurrencySelect'

interface FormData {
  amount: string
  from: string
  to: string
}

export const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')

  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      amount: '1.00',
      from: 'USD',
      to: 'EUR',
    },
  })

  const { currencies } = useCurrencies()
  const fromCurrencyName =
    currencies.find(c => c.code === fromCurrency)?.name || fromCurrency
  const toCurrencyName =
    currencies.find(c => c.code === toCurrency)?.name || toCurrency

  const amount = watch('amount')
  const numericAmount = parseFloat(amount || '0') || 0

  const { data, isLoading, error } = useCurrencyExchange(
    fromCurrency,
    toCurrency,
    numericAmount,
    numericAmount > 0 && fromCurrency !== toCurrency
  )

  const calculateResult = () => {
    if (!data || !data.rates || !data.rates[toCurrency]) {
      return '0.00'
    }

    const rate = data.rates[toCurrency]
    const result = numericAmount * rate
    return result.toFixed(6)
  }

  const result = calculateResult()
  const inverseRate = data?.rates[toCurrency]
    ? (1 / data.rates[toCurrency]).toFixed(6)
    : '0.00'

  const handleSwap = () => {
    const tempFrom = fromCurrency
    const tempTo = toCurrency
    setFromCurrency(tempTo)
    setToCurrency(tempFrom)
    setValue('from', tempTo)
    setValue('to', tempFrom)
  }

  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return (
      date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        timeZone: 'UTC',
      }) + ' UTC'
    )
  }

  return (
    <div className="w-full bg-white font-sans">
      {/* Header superior */}
      <div className="w-full h-10 bg-[var(--primary-900)] flex items-center pl-6">
        <span className="text-white text-sm font-bold">Currency Converter</span>
      </div>

      {/* Hero / Banda azul */}
      <div className="w-full h-[200px] bg-[var(--primary-500)] flex items-center justify-center">
        <h1 className="text-[28px] font-semibold text-white">
          {numericAmount || 1} {fromCurrency} to {toCurrency} – Convert{' '}
          {fromCurrencyName} to {toCurrencyName}
        </h1>
      </div>

      <div
        className="bg-white rounded-xl shadow-sm p-6 relative z-10"
        style={{
          width: 'calc(100% - 96px)',
          maxWidth: '1200px',
          marginLeft: '48px',
          marginRight: '48px',
          marginTop: '0',
        }}
      >
        <form>
          {/* Fila superior: inputs */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {/* Amount */}
            <div>
              <Controller
                name="amount"
                control={control}
                rules={{
                  required: 'Amount is required',
                  validate: {
                    positive: (v: string) => {
                      const num = parseFloat(v || '0')
                      return num >= 0 || 'Amount cannot be negative'
                    },
                  },
                }}
                render={({ field, fieldState }) => (
                  <CurrencyInput
                    label="Amount"
                    value={field.value}
                    onChange={value => {
                      field.onChange(value)
                      setValue('amount', value)
                    }}
                    error={fieldState.error?.message || errors.amount?.message}
                  />
                )}
              />
            </div>

            {/* From */}
            <div>
              <CurrencySelect
                label="From"
                value={fromCurrency}
                onChange={value => {
                  setFromCurrency(value)
                  setValue('from', value)
                }}
                excludeCurrency={toCurrency}
              />
            </div>

            {/* Swap */}
            <div className="flex items-end justify-center pb-2">
              <button
                type="button"
                onClick={handleSwap}
                className="w-11 h-11 rounded-full bg-[var(--secondary-200)] text-[var(--primary-500)] hover:bg-[var(--secondary-300)] transition-all focus:outline-none focus:ring-2 focus:ring-[var(--primary-300)] flex items-center justify-center"
                aria-label="Swap currencies"
              >
                <FiRefreshCw className="w-5 h-5" />
              </button>
            </div>

            {/* To */}
            <div>
              <CurrencySelect
                label="To"
                value={toCurrency}
                onChange={value => {
                  setToCurrency(value)
                  setValue('to', value)
                }}
                excludeCurrency={fromCurrency}
              />
            </div>
          </div>

          {/* Contenido inferior: 2 columnas */}
          <div className="grid grid-cols-2 gap-6 mb-4">
            {/* Izquierda - Resultado */}
            <div>
              {isLoading ? (
                <div className="flex items-center gap-3 py-4">
                  <FiLoader className="w-6 h-6 animate-spin text-[var(--primary-500)]" />
                  <span className="text-base text-[var(--neutral-700)]">
                    Calculating...
                  </span>
                </div>
              ) : error ? (
                <div className="text-[var(--error-600)]">
                  Error loading exchange rate. Please try again.
                </div>
              ) : (
                <div>
                  <div className="text-base mb-1">
                    {numericAmount || 1} {fromCurrencyName} =
                  </div>
                  <div className="text-[28px] font-bold mb-2">
                    {result} {toCurrencyName}
                  </div>
                  <div className="text-sm text-[var(--neutral-500)]">
                    1 {toCurrency} = {inverseRate} {fromCurrency}
                  </div>
                </div>
              )}
            </div>

            {/* Derecha - Info box */}
            <div>
              <div
                className="bg-[var(--secondary-50)] rounded-lg p-4"
                style={{ width: '320px' }}
              >
                <p className="text-sm text-[var(--secondary-700)]">
                  We use the mid-market rate for our Converter. This is for
                  informational purposes only. You won't receive this rate when
                  sending money.
                </p>
              </div>
            </div>
          </div>

          {data && (
            <div className="text-right">
              <p className="text-xs text-[var(--neutral-500)]">
                {fromCurrencyName} to {toCurrencyName} conversion — Last updated{' '}
                {formatDate(data.date)}
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
